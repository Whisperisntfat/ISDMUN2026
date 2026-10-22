import crypto from 'node:crypto';

export const COUNCILS = new Set(['sc', 'pc', 'hrc1', 'hrc2', 'specpol', 'ecofin1', 'ecofin2', 'ecosoc']);

const PASSWORD_ENV = {
  sc: 'GOSSIP_PASSWORD_HASH_SC',
  pc: 'GOSSIP_PASSWORD_HASH_PC',
  hrc1: 'GOSSIP_PASSWORD_HASH_HRC1',
  hrc2: 'GOSSIP_PASSWORD_HASH_HRC2',
  specpol: 'GOSSIP_PASSWORD_HASH_SPECPOL',
  ecofin1: 'GOSSIP_PASSWORD_HASH_ECOFIN1',
  ecofin2: 'GOSSIP_PASSWORD_HASH_ECOFIN2',
  ecosoc: 'GOSSIP_PASSWORD_HASH_ECOSOC'
};

export function json(res, status, payload) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  return res.status(status).json(payload);
}

export function normalizeCouncil(value) {
  const council = String(value || '').trim().toLowerCase();
  return COUNCILS.has(council) ? council : null;
}

export function createPasswordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(String(password), Buffer.from(salt, 'hex'), 64).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

export function passwordMatches(council, password) {
  const envName = PASSWORD_ENV[council];
  const expected = envName ? process.env[envName] : '';
  const parts = String(expected).split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt' || !/^[a-f0-9]{32}$/i.test(parts[1]) || !/^[a-f0-9]{128}$/i.test(parts[2])) return false;
  try {
    const actual = crypto.scryptSync(String(password), Buffer.from(parts[1], 'hex'), 64);
    const expectedBuffer = Buffer.from(parts[2], 'hex');
    return actual.length === expectedBuffer.length && crypto.timingSafeEqual(actual, expectedBuffer);
  } catch {
    return false;
  }
}

const RATE_LIMIT_SECRET = process.env.RATE_LIMIT_SALT || crypto.randomBytes(32).toString('hex');

export function getClientFingerprint(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  const real = String(req.headers['x-real-ip'] || '').trim();
  const ip = forwarded || real || 'unknown';
  return crypto.createHmac('sha256', RATE_LIMIT_SECRET).update(ip).digest('hex').slice(0, 32);
}

function redisConfig() {
  const url = String(process.env.UPSTASH_REDIS_REST_URL || '').replace(/\/$/, '');
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || '';
  if (!url || !token) throw new Error('Gossip storage is not configured.');
  return { url, token };
}

export async function redisCommand(command) {
  const { url, token } = redisConfig();
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) throw new Error('Database request failed.');
  return data.result;
}

export async function redisTransaction(commands) {
  const { url, token } = redisConfig();
  const response = await fetch(`${url}/multi-exec`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands)
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !Array.isArray(data) || data.some(x => x && x.error)) throw new Error('Database request failed.');
  return data.map(x => x?.result);
}

export async function enforceRateLimit(req, namespace, limit, windowSeconds) {
  const fingerprint = getClientFingerprint(req);
  const key = `isdmun:gossip:rate:${namespace}:${fingerprint}`;
  const [count] = await redisTransaction([
    ['INCR', key],
    ['EXPIRE', key, windowSeconds]
  ]);
  return Number(count) <= limit;
}
