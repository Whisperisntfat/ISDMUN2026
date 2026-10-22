# Gossip Box — one-time setup

The code is already built. Before the Gossip Boxes can save/read messages on Vercel, configure the private server variables below.

## A. Create private storage

1. Create an Upstash Redis database.
2. Copy its **REST URL** and **Standard REST Token**.
3. In Vercel open: **Project → Settings → Environment Variables**.
4. Add:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

Do not place either value in `app.js`, `index.html`, GitHub source, or any public file.

## B. Create one password for each council

Choose a different password of at least 12 characters for each box.

Generate a secure salted hash locally:

```bash
node scripts/hash-password.mjs "MyStrongCouncilPassword!"
```

The command prints something beginning with `scrypt$`. Put that output into the matching Vercel variable:

| Council | Vercel variable |
|---|---|
| Security Council | `GOSSIP_PASSWORD_HASH_SC` |
| Political Council | `GOSSIP_PASSWORD_HASH_PC` |
| HRC I | `GOSSIP_PASSWORD_HASH_HRC1` |
| HRC II | `GOSSIP_PASSWORD_HASH_HRC2` |
| SPECPOL | `GOSSIP_PASSWORD_HASH_SPECPOL` |
| ECOFIN I | `GOSSIP_PASSWORD_HASH_ECOFIN1` |
| ECOFIN II | `GOSSIP_PASSWORD_HASH_ECOFIN2` |
| ECOSOC | `GOSSIP_PASSWORD_HASH_ECOSOC` |

Give the **original password** (not the `scrypt$...` value) only to the authorized council head(s).

## C. Add a rate-limit secret

Run:

```bash
node scripts/generate-salt.mjs
```

Put the result into Vercel as:

`RATE_LIMIT_SALT`

## D. Redeploy

After saving the environment variables, redeploy the latest Vercel deployment.

## What is protected

- Messages are not stored in localStorage or browser JavaScript.
- The Redis write token stays in Vercel's server environment.
- Each council has a different server-side password hash.
- A reader must provide the correct password for that exact council.
- Reader responses are marked `no-store`.
- Raw IP addresses are not saved by this application; a short-lived salted/HMAC-derived value is used only for rate limiting.
- Messages are HTML-escaped before display.
- Each box retains the newest 500 messages.

Changing a council password is simple: generate a new hash, replace only that council's Vercel environment variable, and redeploy.
