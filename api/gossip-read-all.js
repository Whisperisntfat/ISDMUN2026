import crypto from 'node:crypto';
import { json, redisTransaction } from '../lib/gossip.js';

const COUNCILS = [
  ['sc', 'Security Council'],
  ['pc', 'Political Council'],
  ['hrc1', 'HRC I'],
  ['hrc2', 'HRC II'],
  ['specpol', 'SPECPOL'],
  ['ecofin1', 'ECOFIN I'],
  ['ecofin2', 'ECOFIN II'],
  ['ecosoc', 'ECOSOC']
];

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
    const storedHash = process.env.GOSSIP_READALL_PASSWORD_HASH || '';
    if (!secretMatches(storedHash, password)) return json(res, 401, { error: 'Unauthorized.' });

    const commands = COUNCILS.map(([id]) => ['LRANGE', `isdmun:gossip:box:${id}`, 0, 499]);
    const results = await redisTransaction(commands);

    const boxes = COUNCILS.map(([id, label], index) => {
      const rows = Array.isArray(results[index]) ? results[index] : [];
      const messages = rows.flatMap(row => {
        try {
          const parsed = JSON.parse(row);
          return typeof parsed?.message === 'string' ? [parsed.message] : [];
        } catch {
          return [];
        }
      });
      return { id, label, messages };
    });

    const total = boxes.reduce((sum, box) => sum + box.messages.length, 0);
    return json(res, 200, { ok: true, total, boxes });
  } catch (error) {
    console.error('gossip-read-all:', error);
    return json(res, 500, { error: 'Could not read all gossip boxes.' });
  }
}
