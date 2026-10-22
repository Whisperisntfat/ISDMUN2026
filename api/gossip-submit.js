import crypto from 'node:crypto';
import { clearBrowserIdentity, enforceRateLimit, ensureBrowserId, getAuditMetadata, hasCouncilSession, isBrowserRevoked, json, normalizeCouncil, redisTransaction } from '../lib/gossip.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const council = normalizeCouncil(req.body?.council);
    const message = String(req.body?.message || '').trim();
    if (!council) return json(res, 400, { error: 'Invalid council.' });
    if (message.length < 3 || message.length > 1000) return json(res, 400, { error: 'Message must be between 3 and 1000 characters.' });
    if (await isBrowserRevoked(req)) {
      clearBrowserIdentity(res);
      return json(res, 401, { error: 'This browser session was signed out. Log into your council again.' });
    }
    if (!hasCouncilSession(req, council)) return json(res, 401, { error: 'Enter the password for this council before sending a message.' });

    const allowed = await enforceRateLimit(req, `submit:${council}`, 5, 600);
    if (!allowed) return json(res, 429, { error: 'Too many messages from this connection. Please try again later.' });

    const browserId = ensureBrowserId(req, res);
    const audit = getAuditMetadata(req, browserId);
    const item = {
      id: crypto.randomUUID(),
      message,
      createdAt: new Date().toISOString()
    };
    const logItem = {
      id: crypto.randomUUID(),
      messageId: item.id,
      council,
      message,
      createdAt: item.createdAt,
      ...audit
    };

    const key = `isdmun:gossip:box:${council}`;
    const logKey = 'isdmun:gossip:logs';
    await redisTransaction([
      ['LPUSH', key, JSON.stringify(item)],
      ['LTRIM', key, 0, 499],
      ['LPUSH', logKey, JSON.stringify(logItem)],
      ['LTRIM', logKey, 0, 4999]
    ]);
    return json(res, 200, { ok: true });
  } catch (error) {
    console.error('gossip-submit:', error);
    return json(res, 500, { error: 'The gossip box is temporarily unavailable.' });
  }
}
