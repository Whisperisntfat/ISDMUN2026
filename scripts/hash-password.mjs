import crypto from 'node:crypto';
const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your council password"');
  process.exit(1);
}
if (password.length < 12) {
  console.error('Use a password of at least 12 characters.');
  process.exit(1);
}
const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.scryptSync(password, Buffer.from(salt, 'hex'), 64).toString('hex');
console.log(`scrypt$${salt}$${hash}`);
