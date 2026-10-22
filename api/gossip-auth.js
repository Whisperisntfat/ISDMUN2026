import {
  clearBrowserIdentity,
  enforceRateLimit,
  ensureBrowserId,
  hasCouncilSession,
  isBrowserRevoked,
  issueBrowserId,
  json,
  normalizeCouncil,
  memberPasswordMatches,
  setCouncilSession
} from '../lib/gossip.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const council = normalizeCouncil(req.query?.council);
      if (!council) return json(res, 400, { error: 'Invalid council.' });
      if (await isBrowserRevoked(req)) {
        clearBrowserIdentity(res);
        return json(res, 200, { authenticated: false, signedOut: true });
      }
      return json(res, 200, { authenticated: hasCouncilSession(req, council) });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { error: 'Method not allowed.' });
    }

    const council = normalizeCouncil(req.body?.council);
    const password = String(req.body?.password || '');
    if (!council) return json(res, 400, { error: 'Invalid council.' });
    if (!password) return json(res, 400, { error: 'Password is required.' });

    const allowed = await enforceRateLimit(req, `access:${council}`, 10, 900);
    if (!allowed) return json(res, 429, { error: 'Too many access attempts. Please try again later.' });
    if (!memberPasswordMatches(council, password)) return json(res, 401, { error: 'Incorrect council password.' });

    const revoked = await isBrowserRevoked(req);
    let browserId;
    if (revoked) {
      clearBrowserIdentity(res);
      browserId = issueBrowserId(res);
    } else {
      browserId = ensureBrowserId(req, res);
    }
    setCouncilSession(res, council, browserId);
    return json(res, 200, { ok: true, authenticated: true, council });
  } catch (error) {
    console.error('gossip-auth:', error);
    return json(res, 500, { error: 'Council access is temporarily unavailable.' });
  }
}
