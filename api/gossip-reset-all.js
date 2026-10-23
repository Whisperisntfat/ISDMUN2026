import crypto from 'node:crypto';
import { clearCouncilSession, issueBrowserId, json, setAdminSession } from '../lib/gossip.js';

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
    if (!secretMatches(process.env.GOSSIP_RMALL_PASSWORD_HASH || '', password)) {
      return json(res, 401, { error: 'Unauthorized.' });
    }

    clearCouncilSession(res);
    const browserId = issueBrowserId(res);
    setAdminSession(res, browserId);

    return json(res, 200, {
      ok: true,
      admin: true,
      message: 'Admin access enabled for this browser.'
    });
  } catch (error) {
    console.error('gossip-reset-all/admin-login:', error);
    return json(res, 500, { error: 'Could not enable admin access.' });
  }
}
