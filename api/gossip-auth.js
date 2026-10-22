import {
  clearBrowserIdentity,
  ensureBrowserId,
  getCouncilSession,
  isBrowserRevoked,
  issueBrowserId,
  json,
  normalizeCouncil,
  memberPasswordMatches,
  setCouncilSession
} from '../lib/gossip.js';

const INCORRECT_PASSWORD = 'Incorrect password';
const OTHER_COUNCIL = 'You cannot access other councils';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const council = normalizeCouncil(req.query?.council);
      if (!council) return json(res, 400, { error: INCORRECT_PASSWORD });
      if (await isBrowserRevoked(req)) {
        clearBrowserIdentity(res);
        return json(res, 200, { authenticated: false, signedOut: true });
      }
      const currentCouncil = getCouncilSession(req);
      if (currentCouncil && currentCouncil !== council) {
        return json(res, 403, { authenticated: false, blocked: true, error: OTHER_COUNCIL });
      }
      return json(res, 200, { authenticated: currentCouncil === council });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { error: INCORRECT_PASSWORD });
    }

    const council = normalizeCouncil(req.body?.council);
    const password = String(req.body?.password || '');
    if (!council || !password) return json(res, 401, { error: INCORRECT_PASSWORD });

    const existingCouncil = getCouncilSession(req);
    if (existingCouncil && existingCouncil !== council) {
      return json(res, 403, { error: OTHER_COUNCIL });
    }
    if (!memberPasswordMatches(council, password)) return json(res, 401, { error: INCORRECT_PASSWORD });

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
    return json(res, 401, { error: INCORRECT_PASSWORD });
  }
}
