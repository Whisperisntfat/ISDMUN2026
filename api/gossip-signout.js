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
    const browserTag = String(req.body?.browserTag || '').trim();
    if (!secretMatches(process.env.GOSSIP_SIGNOUT_PASSWORD_HASH || '', password)) return json(res, 401, { error: 'Unauthorized.' });
    if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(browserTag)) {
      return json(res, 400, { error: 'Enter a valid Browser Tag.' });
    }

    await redisCommand([
      'SET',
      `isdmun:gossip:revoked:${browserTag}`,
      new Date().toISOString(),
      'EX',
      2678400
    ]);

    return json(res, 200, { ok: true, browserTag, signedOut: true });
  } catch (error) {
    console.error('gossip-signout:', error);
    return json(res, 500, { error: 'Could not sign out that Browser Tag.' });
  }
}
