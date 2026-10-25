import { json, messagePasswordConfigured, messagePasswordMatches, redisCommand } from '../lib/gossip.js';

const ANNOUNCEMENT_KEY = 'isdmun:gossip:announcement';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  try {
    if (!messagePasswordConfigured()) {
      return json(res, 503, { error: 'Announcement password is not configured.' });
    }

    const password = String(req.body?.password || '');
    const message = String(req.body?.message || '').trim();

    if (!messagePasswordMatches(password)) {
      return json(res, 403, { error: 'Incorrect password.' });
    }
    if (!message || message.length > 1000) {
      return json(res, 400, { error: 'Announcement must be between 1 and 1000 characters.' });
    }

    const announcement = {
      message,
      updatedAt: new Date().toISOString()
    };

    await redisCommand(['SET', ANNOUNCEMENT_KEY, JSON.stringify(announcement)]);
    return json(res, 200, { ok: true, ...announcement });
  } catch (error) {
    console.error('gossip-message:', error);
    return json(res, 500, { error: 'Could not publish the announcement.' });
  }
}
