import { enforceRateLimit, json, normalizeCouncil, passwordMatches, redisCommand } from '../lib/gossip.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const council = normalizeCouncil(req.body?.council);
    const password = String(req.body?.password || '');
    if (!council) return json(res, 400, { error: 'Invalid council.' });
    if (!password) return json(res, 400, { error: 'Password is required.' });

    const allowed = await enforceRateLimit(req, `read:${council}`, 10, 900);
    if (!allowed) return json(res, 429, { error: 'Too many unlock attempts. Please try again later.' });
    if (!passwordMatches(council, password)) return json(res, 401, { error: 'Incorrect council password.' });

    const rows = await redisCommand(['LRANGE', `isdmun:gossip:box:${council}`, 0, 499]);
    const messages = (Array.isArray(rows) ? rows : []).flatMap(row => {
      try {
        const parsed = JSON.parse(row);
        if (!parsed || typeof parsed.message !== 'string') return [];
        return [{ id: parsed.id, message: parsed.message, createdAt: parsed.createdAt }];
      } catch { return []; }
    });
    return json(res, 200, { messages });
  } catch (error) {
    console.error('gossip-read:', error);
    return json(res, 500, { error: 'The gossip box is temporarily unavailable.' });
  }
}
