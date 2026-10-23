import {
  clearBrowserIdentity,
  ensureBrowserId,
  getAuditMetadata,
  getCouncilSession,
  hasAdminSession,
  isBrowserRevoked,
  issueBrowserId,
  json,
  normalizeCouncil,
  memberPasswordMatches,
  redisTransaction,
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
      if (hasAdminSession(req)) {
        return json(res, 200, { authenticated: true, admin: true, council });
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
    if (!council) return json(res, 401, { error: INCORRECT_PASSWORD });
    if (hasAdminSession(req)) {
      return json(res, 200, { ok: true, authenticated: true, admin: true, council });
    }
    if (!password) return json(res, 401, { error: INCORRECT_PASSWORD });

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

    const audit = getAuditMetadata(req, browserId);
    const loginLog = {
      event: 'login',
      council,
      createdAt: new Date().toISOString(),
      ...audit
    };
    await redisTransaction([
      ['LPUSH', 'isdmun:gossip:logs', JSON.stringify(loginLog)],
      ['LTRIM', 'isdmun:gossip:logs', 0, 4999]
    ]);

    return json(res, 200, { ok: true, authenticated: true, council });
  } catch (error) {
    console.error('gossip-auth:', error);
    return json(res, 401, { error: INCORRECT_PASSWORD });
  }
}
