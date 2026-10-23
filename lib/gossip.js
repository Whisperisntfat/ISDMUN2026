import crypto from 'node:crypto';

export const COUNCILS = new Set(['sc', 'pc', 'hrc1', 'hrc2', 'specpol', 'ecofin1', 'ecofin2', 'ecosoc']);

const MEMBER_PASSWORD_ENV = {
  sc: 'GOSSIP_PASSWORD_HASH_SC',
  pc: 'GOSSIP_PASSWORD_HASH_PC',
  hrc1: 'GOSSIP_PASSWORD_HASH_HRC1',
  hrc2: 'GOSSIP_PASSWORD_HASH_HRC2',
  specpol: 'GOSSIP_PASSWORD_HASH_SPECPOL',
  ecofin1: 'GOSSIP_PASSWORD_HASH_ECOFIN1',
  ecofin2: 'GOSSIP_PASSWORD_HASH_ECOFIN2',
  ecosoc: 'GOSSIP_PASSWORD_HASH_ECOSOC'
};


const READER_PASSWORD_ENV = {
  sc: 'GOSSIP_READER_PASSWORD_HASH_SC',
  pc: 'GOSSIP_READER_PASSWORD_HASH_PC',
  hrc1: 'GOSSIP_READER_PASSWORD_HASH_HRC1',
  hrc2: 'GOSSIP_READER_PASSWORD_HASH_HRC2',
  specpol: 'GOSSIP_READER_PASSWORD_HASH_SPECPOL',
  ecofin1: 'GOSSIP_READER_PASSWORD_HASH_ECOFIN1',
  ecofin2: 'GOSSIP_READER_PASSWORD_HASH_ECOFIN2',
  ecosoc: 'GOSSIP_READER_PASSWORD_HASH_ECOSOC'
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

function passwordMatchesEnv(envName, password) {
  const expected = envName ? process.env[envName] : '';
  const parts = String(expected || '').trim().split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt' || !/^[a-f0-9]{32}$/i.test(parts[1]) || !/^[a-f0-9]{128}$/i.test(parts[2])) return false;
  try {
    const actual = crypto.scryptSync(String(password), Buffer.from(parts[1], 'hex'), 64);
    const expectedBuffer = Buffer.from(parts[2], 'hex');
    return actual.length === expectedBuffer.length && crypto.timingSafeEqual(actual, expectedBuffer);
  } catch {
    return false;
  }
}


function passwordHashConfigured(envName) {
  const encoded = String(envName ? process.env[envName] : '').trim();
  const parts = encoded.split('$');
  return parts.length === 3 && parts[0] === 'scrypt' && /^[a-f0-9]{32}$/i.test(parts[1]) && /^[a-f0-9]{128}$/i.test(parts[2]);
}

export function memberPasswordConfigured(council) {
  return passwordHashConfigured(MEMBER_PASSWORD_ENV[council]);
}

export function readerPasswordConfigured(council) {
  return passwordHashConfigured(READER_PASSWORD_ENV[council]);
}

export function memberPasswordMatches(council, password) {
  return passwordMatchesEnv(MEMBER_PASSWORD_ENV[council], password);
}

export function readerPasswordMatches(council, password) {
  return passwordMatchesEnv(READER_PASSWORD_ENV[council], password);
}

export function getClientFingerprint(req) {
  const ip = getClientIp(req);
  return crypto.createHmac('sha256', sessionSecret()).update(ip).digest('hex').slice(0, 32);
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


const TECH_SUPPORT_READER_PREFIX = 'isdmun:tech:reader:';
const TECH_SUPPORT_READER_TTL_SECONDS = 60 * 60 * 68;

export function techSupportReaderKey(browserId) {
  const safeBrowserId = String(browserId || '').trim();
  return `${TECH_SUPPORT_READER_PREFIX}${safeBrowserId}`;
}

export async function grantTechSupportReader(browserId) {
  const safeBrowserId = String(browserId || '').trim();
  if (!/^[a-f0-9-]{36}$/i.test(safeBrowserId)) throw new Error('Invalid Browser ID.');
  await redisCommand(['SET', techSupportReaderKey(safeBrowserId), '1', 'EX', TECH_SUPPORT_READER_TTL_SECONDS]);
  return { browserId: safeBrowserId, expiresIn: TECH_SUPPORT_READER_TTL_SECONDS };
}

export async function hasTechSupportReader(req) {
  const browserId = getBrowserId(req);
  if (!browserId) return false;
  return Boolean(await redisCommand(['GET', techSupportReaderKey(browserId)]));
}


const BROWSER_ID_COOKIE = 'isdmun_browser_id';
const BROWSER_ID_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
export const GLOBAL_RESET_KEY = 'isdmun:gossip:reset_at';

function appendSetCookie(res, cookieValue) {
  const existing = res.getHeader('Set-Cookie');
  if (!existing) return res.setHeader('Set-Cookie', cookieValue);
  if (Array.isArray(existing)) return res.setHeader('Set-Cookie', [...existing, cookieValue]);
  return res.setHeader('Set-Cookie', [existing, cookieValue]);
}

export function getBrowserId(req) {
  const value = parseCookies(req)[BROWSER_ID_COOKIE] || '';
  return /^[a-f0-9-]{36}$/i.test(value) ? value : null;
}

export function issueBrowserId(res) {
  const browserId = crypto.randomUUID();
  appendSetCookie(
    res,
    `${BROWSER_ID_COOKIE}=${encodeURIComponent(browserId)}; Max-Age=${BROWSER_ID_MAX_AGE_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`
  );
  return browserId;
}

export function ensureBrowserId(req, res) {
  const existing = getBrowserId(req);
  return existing || issueBrowserId(res);
}

export function clearCouncilSession(res) {
  appendSetCookie(res, `isdmun_gossip_session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`);
  for (const council of COUNCILS) {
    appendSetCookie(res, `isdmun_gossip_${council}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`);
  }
}

export function clearBrowserIdentity(res) {
  appendSetCookie(res, `${BROWSER_ID_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`);
  appendSetCookie(res, `isdmun_gossip_session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`);
  appendSetCookie(res, `isdmun_gossip_admin=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`);
  for (const council of COUNCILS) {
    appendSetCookie(res, `isdmun_gossip_${council}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`);
  }
}

export async function isBrowserRevoked(req) {
  const browserId = getBrowserId(req);
  if (!browserId) return false;
  const values = await redisCommand([
    'MGET',
    `isdmun:gossip:revoked:${browserId}`,
    GLOBAL_RESET_KEY
  ]);
  const revoked = Boolean(Array.isArray(values) ? values[0] : null);
  const resetAt = Array.isArray(values) ? values[1] : null;
  return revoked || sessionPredatesReset(req, resetAt);
}

function readHeader(req, name) {
  const headers = req?.headers;
  if (!headers) return '';
  if (typeof headers.get === 'function') {
    const value = headers.get(name);
    if (value != null) return String(value);
  }
  const lower = String(name).toLowerCase();
  const direct = headers[lower] ?? headers[name];
  if (Array.isArray(direct)) return direct.join(',');
  return direct == null ? '' : String(direct);
}

function safeHeader(req, name, max = 300) {
  return readHeader(req, name).slice(0, max);
}

function firstForwardedIp(value) {
  return String(value || '')
    .split(',')
    .map(x => x.trim())
    .find(Boolean) || '';
}

function cleanIp(value) {
  let ip = firstForwardedIp(value);
  if (!ip) return '';
  if (/^\d{1,3}(?:\.\d{1,3}){3}:\d+$/.test(ip)) ip = ip.replace(/:\d+$/, '');
  if (ip.startsWith('[') && ip.includes(']')) ip = ip.slice(1, ip.indexOf(']'));
  if (ip.startsWith('::ffff:')) ip = ip.slice(7);
  return ip;
}

export function getClientIp(req) {
  const candidates = [
    readHeader(req, 'x-forwarded-for'),
    readHeader(req, 'x-vercel-forwarded-for'),
    readHeader(req, 'x-real-ip'),
    readHeader(req, 'cf-connecting-ip'),
    readHeader(req, 'true-client-ip'),
    readHeader(req, 'fastly-client-ip'),
    readHeader(req, 'x-gcp-connecting-ip'),
    readHeader(req, 'x-azure-clientip'),
    readHeader(req, 'incap-client-ip'),
    readHeader(req, 'cloudfront-viewer-address'),
    req?.socket?.remoteAddress,
    req?.connection?.remoteAddress
  ];
  for (const candidate of candidates) {
    const ip = cleanIp(candidate);
    if (ip) return ip;
  }
  return 'unknown';
}

export function getAuditMetadata(req, browserId) {
  return {
    browserTag: browserId || getBrowserId(req) || 'unknown',
    networkTag: getClientFingerprint(req),
    userAgent: safeHeader(req, 'user-agent', 500),
    language: safeHeader(req, 'accept-language', 160),
    clientBrands: safeHeader(req, 'sec-ch-ua', 300),
    platform: safeHeader(req, 'sec-ch-ua-platform', 120),
    mobile: safeHeader(req, 'sec-ch-ua-mobile', 40),
    doNotTrack: safeHeader(req, 'dnt', 20),
    requestId: safeHeader(req, 'x-vercel-id', 160)
  };
}

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const SESSION_COOKIE = 'isdmun_gossip_session';

function sessionSecret() {
  const secret = String(process.env.GOSSIP_SESSION_SECRET || '').trim();
  if (!secret) throw new Error('Gossip session secret is not configured.');
  return secret;
}

function legacyCouncilCookieName(council) {
  return `isdmun_gossip_${council}`;
}

function parseCookies(req) {
  const header = String(req.headers.cookie || '');
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

function sessionMac(council, expiresAt, browserId) {
  return crypto.createHmac('sha256', sessionSecret()).update(`${council}|${expiresAt}|${browserId}`).digest('hex');
}

export function setCouncilSession(res, council, browserId) {
  const safeBrowserId = String(browserId || '');
  if (!/^[a-f0-9-]{36}$/i.test(safeBrowserId)) throw new Error('Browser identity is required for council session.');
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const token = `v3.${council}.${expiresAt}.${sessionMac(council, expiresAt, safeBrowserId)}`;
  appendSetCookie(res, `${SESSION_COOKIE}=${encodeURIComponent(token)}; Max-Age=${SESSION_MAX_AGE_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`);
  // Remove legacy per-council cookies from older deployments.
  for (const id of COUNCILS) {
    appendSetCookie(res, `${legacyCouncilCookieName(id)}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`);
  }
}

const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const ADMIN_COOKIE = 'isdmun_gossip_admin';

function adminSessionMac(expiresAt, browserId) {
  return crypto.createHmac('sha256', sessionSecret()).update(`admin|${expiresAt}|${browserId}`).digest('hex');
}

export function setAdminSession(res, browserId) {
  const safeBrowserId = String(browserId || '');
  if (!/^[a-f0-9-]{36}$/i.test(safeBrowserId)) throw new Error('Browser identity is required for admin session.');
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE_SECONDS;
  const token = `v1.${expiresAt}.${adminSessionMac(expiresAt, safeBrowserId)}`;
  appendSetCookie(res, `${ADMIN_COOKIE}=${encodeURIComponent(token)}; Max-Age=${ADMIN_SESSION_MAX_AGE_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Lax`);
}

export function hasAdminSession(req) {
  const browserId = getBrowserId(req);
  if (!browserId) return false;
  const token = parseCookies(req)[ADMIN_COOKIE] || '';
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'v1') return false;
  const expiresAt = Number(parts[1]);
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false;
  const actual = String(parts[2] || '');
  if (!/^[a-f0-9]{64}$/i.test(actual)) return false;
  const expected = adminSessionMac(expiresAt, browserId);
  try {
    const a = Buffer.from(actual, 'hex');
    const b = Buffer.from(expected, 'hex');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function getCouncilSession(req) {
  const browserId = getBrowserId(req);
  if (!browserId) return null;
  const token = parseCookies(req)[SESSION_COOKIE] || '';
  const parts = token.split('.');
  if (parts.length !== 4 || parts[0] !== 'v3') return null;
  const council = normalizeCouncil(parts[1]);
  if (!council) return null;
  const expiresAt = Number(parts[2]);
  if (!Number.isFinite(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return null;
  const actual = String(parts[3] || '');
  if (!/^[a-f0-9]{64}$/i.test(actual)) return null;
  const expected = sessionMac(council, expiresAt, browserId);
  try {
    const a = Buffer.from(actual, 'hex');
    const b = Buffer.from(expected, 'hex');
    return a.length === b.length && crypto.timingSafeEqual(a, b) ? council : null;
  } catch {
    return null;
  }
}

export function sessionPredatesReset(req, resetAtValue) {
  const resetAt = Number(resetAtValue);
  if (!Number.isFinite(resetAt) || resetAt <= 0) return false;

  const browserId = getBrowserId(req);
  if (!browserId) return false;
  const token = parseCookies(req)[SESSION_COOKIE] || '';
  const parts = token.split('.');
  if (parts.length !== 4 || parts[0] !== 'v3') return false;
  if (!getCouncilSession(req)) return false;

  const expiresAt = Number(parts[2]);
  if (!Number.isFinite(expiresAt)) return false;
  const issuedAt = expiresAt - SESSION_MAX_AGE_SECONDS;
  return issuedAt <= resetAt;
}

export function hasCouncilSession(req, council) {
  return getCouncilSession(req) === council;
}
