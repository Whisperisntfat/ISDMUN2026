import crypto from 'node:crypto';
import { json, redisCommand } from '../lib/gossip.js';

const COUNCIL_LABELS = {
  sc: 'Security Council', pc: 'Political Council', hrc1: 'HRC I', hrc2: 'HRC II',
  specpol: 'SPECPOL', ecofin1: 'ECOFIN I', ecofin2: 'ECOFIN II', ecosoc: 'ECOSOC'
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
    const browserTag = String(req.body?.browserTag || '').trim();
    if (!secretMatches(process.env.GOSSIP_WHO_PASSWORD_HASH || '', password)) return json(res, 401, { error: 'Unauthorized.' });
    if (!browserTag || browserTag.length > 80) return json(res, 400, { error: 'Enter a valid Browser Tag.' });

    const rows = await redisCommand(['LRANGE', 'isdmun:gossip:logs', 0, 4999]);
    const matches = (Array.isArray(rows) ? rows : []).flatMap(row => {
      try {
        const item = JSON.parse(row);
        return item && item.event === 'login' && String(item.browserTag || '') === browserTag ? [item] : [];
      } catch { return []; }
    });

    if (!matches.length) return json(res, 404, { error: 'No logs found for that Browser Tag.' });

    const sorted = [...matches].sort((a, b) => String(a.createdAt || '').localeCompare(String(b.createdAt || '')));
    const councils = [...new Set(sorted.map(x => COUNCIL_LABELS[String(x.council || '')] || String(x.council || '')).filter(Boolean))];
    const ipAddresses = [...new Set(sorted.map(x => String(x.ipAddress || '')).filter(Boolean))];
    const networkTags = [...new Set(sorted.map(x => String(x.networkTag || '')).filter(Boolean))];
    const languages = [...new Set(sorted.map(x => String(x.language || '')).filter(Boolean))];
    const platforms = [...new Set(sorted.map(x => String(x.platform || '')).filter(Boolean))];
    const userAgents = [...new Set(sorted.map(x => String(x.userAgent || '')).filter(Boolean))];
    const clientBrands = [...new Set(sorted.map(x => String(x.clientBrands || '')).filter(Boolean))];
    const mobileHints = [...new Set(sorted.map(x => String(x.mobile || '')).filter(Boolean))];
    const doNotTrack = [...new Set(sorted.map(x => String(x.doNotTrack || '')).filter(Boolean))];

    return json(res, 200, {
      ok: true,
      profile: {
        browserTag,
        loginCount: matches.length,
        firstSeen: sorted[0]?.createdAt || '',
        lastSeen: sorted[sorted.length - 1]?.createdAt || '',
        councils,
        ipAddresses,
        networkTags,
        languages,
        platforms,
        userAgents,
        clientBrands,
        mobileHints,
        doNotTrack
      }
    });
  } catch (error) {
    console.error('gossip-who:', error);
    return json(res, 500, { error: 'Could not inspect that Browser Tag.' });
  }
}
