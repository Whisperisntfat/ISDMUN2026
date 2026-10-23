import crypto from 'node:crypto';
import { grantTechSupportReader, json } from '../lib/gossip.js';

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
    const browserId = String(req.body?.browserId || '').trim();
    if (!secretMatches(process.env.GOSSIP_MKADMIN_PASSWORD_HASH || '', password)) {
      return json(res, 401, { error: 'Unauthorized.' });
    }
    if (!/^[a-f0-9-]{36}$/i.test(browserId)) {
      return json(res, 400, { error: 'Invalid Browser ID.' });
    }

    const result = await grantTechSupportReader(browserId);
    return json(res, 200, {
      ok: true,
      browserId: result.browserId,
      expiresIn: result.expiresIn,
      message: 'Temporary Tech Support admin access granted for 68 hours.'
    });
  } catch (error) {
    console.error('gossip-make-admin:', error);
    return json(res, 500, { error: 'Could not grant temporary Tech Support access.' });
  }
}
