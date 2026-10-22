import crypto from 'node:crypto';
import { json, redisCommand } from '../lib/gossip.js';

function secretMatches(encoded, password) {
  const parts = String(encoded || '').trim().split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt' || !/^[a-f0-9]{32}$/i.test(parts[1]) || !/^[a-f0-9]{128}$/i.test(parts[2])) return false;
  try {
    const actual = crypto.scryptSync(String(password), Buffer.from(parts[1], 'hex'), 64);
    const expected = Buffer.from(parts[2], 'hex');
    return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  try {

    const password = String(req.body?.password || '');
    const message = String(req.body?.message || '').trim();
    if (!secretMatches(process.env.GOSSIP_MESSAGE_PASSWORD_HASH || '', password)) return json(res, 401, { error: 'Unauthorized.' });
    if (!message || message.length > 500) return json(res, 400, { error: 'Broadcast message must be between 1 and 500 characters.' });

    const item = { id: crypto.randomUUID(), message, createdAt: new Date().toISOString() };
    await redisCommand(['SET', 'isdmun:gossip:broadcast', JSON.stringify(item), 'EX', 120]);
    return json(res, 200, { ok: true, id: item.id });
  } catch (error) {
    console.error('gossip-message:', error);
    return json(res, 500, { error: 'Could not send the broadcast.' });
  }
}
