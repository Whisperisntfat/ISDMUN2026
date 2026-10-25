import { clearBrowserIdentity, getBrowserId, hasAdminSession, redisCommand } from '../lib/gossip.js';

const ANNOUNCEMENT_KEY = 'isdmun:gossip:announcement';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  try {
    const browserId = getBrowserId(req);
    let revoked = false;
    let announcementRaw = null;

    if (browserId) {
      const values = await redisCommand(['MGET', `isdmun:gossip:revoked:${browserId}`, ANNOUNCEMENT_KEY]);
      revoked = Boolean(Array.isArray(values) ? values[0] : null);
      announcementRaw = Array.isArray(values) ? values[1] : null;
    } else {
      announcementRaw = await redisCommand(['GET', ANNOUNCEMENT_KEY]);
    }

    let announcement = null;
    if (announcementRaw) {
      try { announcement = JSON.parse(String(announcementRaw)); } catch { announcement = { message: String(announcementRaw) }; }
    }

    if (revoked) {
      clearBrowserIdentity(res);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return res.status(200).json({ ok: true, signedOut: true, admin: false });
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).json({
      ok: true,
      signedOut: false,
      admin: hasAdminSession(req),
      announcement
    });
  } catch (error) {
    console.error('gossip-broadcast/session-state:', error);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: false, signedOut: false, admin: false, announcement: null });
  }
}
