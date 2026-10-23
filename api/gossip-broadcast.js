import { clearBrowserIdentity, getBrowserId, hasAdminSession, redisCommand, techSupportReaderKey } from '../lib/gossip.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  try {
    const browserId = getBrowserId(req);
    let revoked = false;
    let techSupportReader = false;

    if (browserId) {
      const state = await redisCommand([
        'MGET',
        `isdmun:gossip:revoked:${browserId}`,
        techSupportReaderKey(browserId)
      ]);
      revoked = Boolean(Array.isArray(state) ? state[0] : null);
      techSupportReader = Boolean(Array.isArray(state) ? state[1] : null);
    }

    if (revoked) {
      clearBrowserIdentity(res);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return res.status(200).json({ ok: true, signedOut: true, admin: false, techSupportReader: false });
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    const admin = hasAdminSession(req);
    return res.status(200).json({
      ok: true,
      signedOut: false,
      admin,
      techSupportReader: admin ? false : techSupportReader
    });
  } catch (error) {
    console.error('gossip-broadcast/session-state:', error);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: false, signedOut: false, admin: false, techSupportReader: false });
  }
}
