import { clearBrowserIdentity, hasCouncilSession, isBrowserRevoked, json, normalizeCouncil, readerPasswordMatches, redisCommand, redisTransaction } from '../lib/gossip.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return json(res, 405, { error: 'Method not allowed.' });
  }

  try {
    const council = normalizeCouncil(req.body?.council);
    const readerPassword = String(req.body?.password || '');
    if (!council) return json(res, 401, { error: 'Incorrect password' });
    if (await isBrowserRevoked(req)) {
      clearBrowserIdentity(res);
      return json(res, 401, { error: 'Incorrect password' });
    }
    if (!hasCouncilSession(req, council)) return json(res, 401, { error: 'Incorrect password' });
    if (!readerPassword) return json(res, 401, { error: 'Incorrect password' });
    if (!readerPasswordMatches(council, readerPassword)) return json(res, 403, { error: 'Incorrect password' });

    const key = `isdmun:gossip:box:${council}`;
    const cleanupMarker = 'isdmun:gossip:cleanup:sc-hello-v1';
    const rows = await redisCommand(['LRANGE', key, 0, 499]);
    const rowList = Array.isArray(rows) ? rows : [];

    let workingRows = rowList;
    if (council === 'sc') {
      const cleanupDone = await redisCommand(['GET', cleanupMarker]);
      if (!cleanupDone) {
        let removed = false;
        const preservedRows = [];
        for (const row of rowList) {
          try {
            const parsed = JSON.parse(row);
            const isHello = typeof parsed?.message === 'string' && parsed.message.trim().toLowerCase() === 'hello';
            if (!removed && isHello) {
              removed = true;
              continue;
            }
          } catch {}
          preservedRows.push(row);
        }

        const commands = [];
        if (removed) {
          commands.push(['DEL', key]);
          if (preservedRows.length) commands.push(['RPUSH', key, ...preservedRows]);
        }
        commands.push(['SET', cleanupMarker, 'done']);
        await redisTransaction(commands);
        workingRows = preservedRows;
      }
    }

    const messages = workingRows.flatMap(row => {
      try {
        const parsed = JSON.parse(row);
        if (!parsed || typeof parsed.message !== 'string') return [];
        return [{ id: parsed.id, message: parsed.message }];
      } catch { return []; }
    });

    return json(res, 200, { messages });
  } catch (error) {
    console.error('gossip-read:', error);
    return json(res, 401, { error: 'Incorrect password' });
  }
}
