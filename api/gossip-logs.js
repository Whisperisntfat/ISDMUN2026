import crypto from 'node:crypto';
import { json, redisCommand } from '../lib/gossip.js';

const COUNCIL_LABELS = {
  sc: 'Security Council',
  pc: 'Political Council',
  hrc1: 'HRC I',
  hrc2: 'HRC II',
  specpol: 'SPECPOL',
  ecofin1: 'ECOFIN I',
  ecofin2: 'ECOFIN II',
  ecosoc: 'ECOSOC'
};

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
    const storedHash = process.env.GOSSIP_LOGS_PASSWORD_HASH || '';
    if (!secretMatches(storedHash, password)) return json(res, 401, { error: 'Unauthorized.' });

    const rows = await redisCommand(['LRANGE', 'isdmun:gossip:logs', 0, 4999]);
    const logs = (Array.isArray(rows) ? rows : []).flatMap(row => {
      try {
        const parsed = JSON.parse(row);
        if (!parsed || typeof parsed !== 'object') return [];
        return [{
          id: String(parsed.id || ''),
          messageId: String(parsed.messageId || ''),
          council: String(parsed.council || ''),
          councilLabel: COUNCIL_LABELS[String(parsed.council || '')] || String(parsed.council || ''),
          message: String(parsed.message || ''),
          createdAt: String(parsed.createdAt || ''),
          browserTag: String(parsed.browserTag || ''),
          networkTag: String(parsed.networkTag || ''),
          userAgent: String(parsed.userAgent || ''),
          language: String(parsed.language || ''),
          clientBrands: String(parsed.clientBrands || ''),
          platform: String(parsed.platform || ''),
          mobile: String(parsed.mobile || ''),
          doNotTrack: String(parsed.doNotTrack || ''),
          requestId: String(parsed.requestId || '')
        }];
      } catch {
        return [];
      }
    });

    return json(res, 200, { ok: true, total: logs.length, logs });
  } catch (error) {
    console.error('gossip-logs:', error);
    return json(res, 500, { error: 'Could not load gossip logs.' });
  }
}
