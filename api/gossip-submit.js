import crypto from 'node:crypto';
import { enforceRateLimit, json, normalizeCouncil, redisTransaction } from '../lib/gossip.js';

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

    const allowed = await enforceRateLimit(req, `submit:${council}`, 5, 600);
    if (!allowed) return json(res, 429, { error: 'Too many messages from this connection. Please try again later.' });

    const item = {
      id: crypto.randomUUID(),
      message,
      createdAt: new Date().toISOString()
    };
    const key = `isdmun:gossip:box:${council}`;
    await redisTransaction([
      ['LPUSH', key, JSON.stringify(item)],
      ['LTRIM', key, 0, 499]
    ]);
    return json(res, 200, { ok: true });
  } catch (error) {
    console.error('gossip-submit:', error);
    return json(res, 500, { error: 'The gossip box is temporarily unavailable.' });
  }
}
