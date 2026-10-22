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

    const command = String(req.body?.command || '');
    if (!command.startsWith('delall:')) return json(res, 401, { error: 'Unauthorized.' });

    const password = command.slice('delall:'.length);
    const storedHash = process.env.GOSSIP_ADMIN_PASSWORD_HASH || '';
    if (!secretMatches(storedHash, password)) return json(res, 401, { error: 'Unauthorized.' });

    const keys = [
      'isdmun:gossip:box:sc',
      'isdmun:gossip:box:pc',
      'isdmun:gossip:box:hrc1',
      'isdmun:gossip:box:hrc2',
      'isdmun:gossip:box:specpol',
      'isdmun:gossip:box:ecofin1',
      'isdmun:gossip:box:ecofin2',
      'isdmun:gossip:box:ecosoc'
    ];

    const deletedKeys = Number(await redisCommand(['DEL', ...keys])) || 0;
    return json(res, 200, { ok: true, deletedBoxes: deletedKeys });
  } catch (error) {
    console.error('gossip-clear-all:', error);
    return json(res, 500, { error: 'Could not clear the gossip boxes.' });
  }
}
