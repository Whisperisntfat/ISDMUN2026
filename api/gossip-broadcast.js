import { clearBrowserIdentity, getBrowserId, redisCommand } from '../lib/gossip.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  try {
    const browserId = getBrowserId(req);
    let raw = null;
    let revoked = false;

    if (browserId) {
      const values = await redisCommand([
        'MGET',
        'isdmun:gossip:broadcast',
        `isdmun:gossip:revoked:${browserId}`
      ]);
      raw = Array.isArray(values) ? values[0] : null;
      revoked = Boolean(Array.isArray(values) ? values[1] : null);
    } else {
      raw = await redisCommand(['GET', 'isdmun:gossip:broadcast']);
    }

    if (revoked) {
      clearBrowserIdentity(res);
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      return res.status(200).json({ ok: true, broadcast: null, signedOut: true });
    }

    let broadcast = null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const age = Date.now() - Date.parse(parsed.createdAt || '');
        if (parsed?.id && parsed?.message && Number.isFinite(age) && age >= 0 && age <= 360000) {
          broadcast = { id: String(parsed.id), message: String(parsed.message), createdAt: String(parsed.createdAt) };
        }
      } catch {}
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).json({ ok: true, broadcast, signedOut: false });
  } catch (error) {
    console.error('gossip-broadcast:', error);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: false, broadcast: null, signedOut: false });
  }
}
