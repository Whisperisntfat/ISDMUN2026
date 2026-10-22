import crypto from 'node:crypto';
import { clearBrowserIdentity, GLOBAL_RESET_KEY, json, redisCommand, redisTransaction } from '../lib/gossip.js';

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

async function clearRevocationKeys() {
  let cursor = '0';
  let deleted = 0;
  do {
    const result = await redisCommand(['SCAN', cursor, 'MATCH', 'isdmun:gossip:revoked:*', 'COUNT', 200]);
    cursor = Array.isArray(result) ? String(result[0] ?? '0') : '0';
    const keys = Array.isArray(result?.[1]) ? result[1] : [];
    if (keys.length) {
      deleted += Number(await redisCommand(['DEL', ...keys])) || 0;
    }
  } while (cursor !== '0');
  return deleted;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const password = String(req.body?.password || '');
    if (!secretMatches(process.env.GOSSIP_RMALL_PASSWORD_HASH || '', password)) {
      return json(res, 401, { error: 'Unauthorized.' });
    }

    const resetAt = Math.floor(Date.now() / 1000);
    const revokedKeysDeleted = await clearRevocationKeys();
    await redisTransaction([
      ['SET', GLOBAL_RESET_KEY, String(resetAt)],
      ['DEL', 'isdmun:gossip:logs'],
      ['DEL', 'isdmun:gossip:broadcast']
    ]);

    clearBrowserIdentity(res);
    return json(res, 200, {
      ok: true,
      resetAt,
      logsCleared: true,
      revokedKeysDeleted,
      messagesPreserved: true
    });
  } catch (error) {
    console.error('gossip-reset-all:', error);
    return json(res, 500, { error: 'Could not reset browser sessions.' });
  }
}
