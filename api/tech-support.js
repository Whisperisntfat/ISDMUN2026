import crypto from 'node:crypto';
import { ensureBrowserId, hasAdminSession, hasTechSupportReader, json, normalizeCouncil, redisCommand } from '../lib/gossip.js';

const SUPPORT_KEY = 'isdmun:tech:support';
const COUNCIL_LABELS = {
  sc: 'SC', pc: 'PC', hrc1: 'HRC I', hrc2: 'HRC II', specpol: 'SPECPOL',
  ecofin1: 'ECOFIN I', ecofin2: 'ECOFIN II', ecosoc: 'ECOSOC'
};

function parseRows(rows) {
  return (Array.isArray(rows) ? rows : []).flatMap(row => {
    try {
      const item = JSON.parse(row);
      if (!item?.id || typeof item.message !== 'string') return [];
      return [item];
    } catch {
      return [];
    }
  });
}

async function findStoredRow(id) {
  const rows = await redisCommand(['LRANGE', SUPPORT_KEY, 0, -1]);
  const list = Array.isArray(rows) ? rows : [];
  for (let i = 0; i < list.length; i += 1) {
    try {
      const item = JSON.parse(list[i]);
      if (item?.id === id) return { index: i, row: list[i], item };
    } catch {}
  }
  return null;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const admin = hasAdminSession(req);
      const techSupportReader = admin ? false : await hasTechSupportReader(req);
      if (!admin && !techSupportReader) return json(res, 401, { error: 'Unauthorized.' });
      const rows = await redisCommand(['LRANGE', SUPPORT_KEY, 0, -1]);
      return json(res, 200, {
        ok: true,
        messages: parseRows(rows),
        canManage: Boolean(admin || techSupportReader),
        techSupportReader
      });
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return json(res, 405, { error: 'Method not allowed.' });
    }

    const action = String(req.body?.action || 'submit');
    if (action === 'submit') {
      const council = normalizeCouncil(req.body?.council);
      const message = String(req.body?.message || '').trim();
      if (!council) return json(res, 400, { error: 'Choose a valid council.' });
      if (message.length < 3 || message.length > 1000) return json(res, 400, { error: 'Message must be between 3 and 1000 characters.' });
      const browserTag = ensureBrowserId(req, res);
      const item = {
        id: crypto.randomUUID(), council, councilLabel: COUNCIL_LABELS[council] || council,
        browserTag, message, status: 'open', createdAt: new Date().toISOString(), resolvedAt: null
      };
      await redisCommand(['LPUSH', SUPPORT_KEY, JSON.stringify(item)]);
      return json(res, 200, { ok: true, id: item.id });
    }

    const admin = hasAdminSession(req);
    const techSupportReader = admin ? false : await hasTechSupportReader(req);
    if (!admin && !techSupportReader) return json(res, 401, { error: 'Unauthorized.' });
    const id = String(req.body?.id || '').trim();
    if (!id) return json(res, 400, { error: 'Missing support request.' });
    const stored = await findStoredRow(id);
    if (!stored) return json(res, 404, { error: 'Support request not found.' });

    if (action === 'resolve') {
      if (stored.item.status === 'resolved') return json(res, 200, { ok: true, message: stored.item });
      const updated = { ...stored.item, status: 'resolved', resolvedAt: new Date().toISOString() };
      await redisCommand(['LSET', SUPPORT_KEY, stored.index, JSON.stringify(updated)]);
      return json(res, 200, { ok: true, message: updated });
    }

    if (action === 'delete') {
      if (stored.item.status === 'resolved') return json(res, 409, { error: 'Resolved requests cannot be deleted.' });
      await redisCommand(['LREM', SUPPORT_KEY, 1, stored.row]);
      return json(res, 200, { ok: true });
    }

    return json(res, 400, { error: 'Invalid action.' });
  } catch (error) {
    console.error('tech-support:', error);
    return json(res, 500, { error: 'Technical support is temporarily unavailable.' });
  }
}
