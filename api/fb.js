import crypto from 'node:crypto';
import { json, redisCommand } from '../lib/gossip.js';

const FEEDBACK_LIST_KEY = 'isdmun:feedback:submissions';

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

    const rows = await redisCommand(['LRANGE', FEEDBACK_LIST_KEY, 0, -1]);
    const feedback = (Array.isArray(rows) ? rows : []).flatMap(row => {
      try {
        const item = JSON.parse(row);
        return [{
          id: String(item?.id || ''),
          createdAt: String(item?.createdAt || ''),
          browserTag: String(item?.browserTag || ''),
          name: item?.name ? String(item.name) : '',
          likedSite: String(item?.likedSite || '').toLowerCase(),
          positive: String(item?.positive || ''),
          shortcomings: item?.shortcomings ? String(item.shortcomings) : ''
        }];
      } catch {
        return [];
      }
    });

    return json(res, 200, { ok: true, feedback, total: feedback.length });
  } catch (error) {
    console.error('feedback-download:', error);
    return json(res, 500, { error: 'Could not prepare feedback download.' });
  }
}
