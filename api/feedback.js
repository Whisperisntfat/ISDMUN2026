import crypto from 'node:crypto';
import { ensureBrowserId, json, redisCommand } from '../lib/gossip.js';

const FEEDBACK_LIST_KEY = 'isdmun:feedback:submissions';
const FEEDBACK_SUBMITTED_PREFIX = 'isdmun:feedback:submitted:';

function submittedKey(browserId) {
  return `${FEEDBACK_SUBMITTED_PREFIX}${browserId}`;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const browserId = ensureBrowserId(req, res);
      const submittedAt = await redisCommand(['GET', submittedKey(browserId)]);
      return json(res, 200, { ok: true, submitted: Boolean(submittedAt), submittedAt: submittedAt || null });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { error: 'Method not allowed.' });
    }

    const likedSite = String(req.body?.likedSite || '').trim().toLowerCase();
    const positive = String(req.body?.positive || '').trim();
    const shortcomings = String(req.body?.shortcomings || '').trim();
    const name = String(req.body?.name || '').trim();

    if (!['yes', 'no'].includes(likedSite)) {
      return json(res, 400, { error: 'Please select whether you liked the site.' });
    }
    if (positive.length < 3 || positive.length > 1500) {
      return json(res, 400, { error: 'Positive feedback must be between 3 and 1500 characters.' });
    }
    if (shortcomings.length > 1500) return json(res, 400, { error: 'Shortcomings must be 1500 characters or fewer.' });
    if (name.length > 100) return json(res, 400, { error: 'Name must be 100 characters or fewer.' });

    const browserId = ensureBrowserId(req, res);
    const createdAt = new Date().toISOString();

    const claimed = await redisCommand(['SET', submittedKey(browserId), createdAt, 'NX']);
    if (!claimed) {
      return json(res, 409, { error: 'This browser has already submitted feedback.', submitted: true });
    }

    const item = {
      id: crypto.randomUUID(),
      browserTag: browserId,
      name: name || null,
      likedSite,
      positive,
      shortcomings: shortcomings || null,
      createdAt
    };

    try {
      await redisCommand(['LPUSH', FEEDBACK_LIST_KEY, JSON.stringify(item)]);
    } catch (error) {
      await redisCommand(['DEL', submittedKey(browserId)]).catch(() => {});
      throw error;
    }

    return json(res, 200, { ok: true, submitted: true, id: item.id });
  } catch (error) {
    console.error('feedback:', error);
    return json(res, 500, { error: 'Feedback is temporarily unavailable.' });
  }
}
