# ISD MUN 2026 — Vercel-ready site

This is a standalone ISDMUN 2026 website for Vercel. It does not depend on ChatGPT or `chatgpt.site`. The public pages are static; the Gossip Boxes use secure Vercel serverless API routes and private Redis storage.

## Included

- Conference theme: **A World in Transition**
- 8 committees and 16 student officers, with schools
- 16 research papers with direct page links into the consolidated PDF
- Full Day 1 and Day 2 schedule
- Lunch timings for both days
- Day 2 group-photo timings
- Conference structure and Rules of Procedure
- Official topics for all council families
- SG and DSG contact details
- Official Instagram link
- Responsive mobile/desktop layout

## Deploy on Vercel

1. Unzip this project.
2. Push the files inside this folder to a GitHub repository.
3. In Vercel choose **Add New → Project** and import that repository.
4. Framework preset: **Other**.
5. Leave Build Command empty.
6. Leave Output Directory empty.
7. Deploy.

You can also deploy with the Vercel CLI from this folder using `vercel`.


## Gossip Box setup

The Gossip Box feature deliberately does **not** store messages or passwords in the browser. Submissions are written by server-side Vercel Functions to an Upstash Redis database. Each council reader password is checked only on the server against a salted scrypt hash stored in Vercel Environment Variables.

### 1. Create the private database

1. Create an Upstash Redis database at Upstash.
2. Copy the database's `UPSTASH_REDIS_REST_URL` and **Standard** `UPSTASH_REDIS_REST_TOKEN`.
3. Never paste the Standard token into `app.js`, HTML, GitHub, or any client-side file.

### 2. Choose eight council passwords

Use a different strong password for each council. The actual password is given only to that council's authorized head(s).

Generate each password hash locally:

```bash
node scripts/hash-password.mjs "your-secret-password"
```

Copy only the resulting `scrypt$...` hash to Vercel. Repeat for all eight councils.

### 3. Add Vercel Environment Variables

In **Vercel → Project → Settings → Environment Variables**, add:

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `GOSSIP_PASSWORD_HASH_SC`
- `GOSSIP_PASSWORD_HASH_PC`
- `GOSSIP_PASSWORD_HASH_HRC1`
- `GOSSIP_PASSWORD_HASH_HRC2`
- `GOSSIP_PASSWORD_HASH_SPECPOL`
- `GOSSIP_PASSWORD_HASH_ECOFIN1`
- `GOSSIP_PASSWORD_HASH_ECOFIN2`
- `GOSSIP_PASSWORD_HASH_ECOSOC`
- `RATE_LIMIT_SALT`

Generate the rate-limit salt with:

```bash
node scripts/generate-salt.mjs
```

Then redeploy the project.

### Security behavior

- Database token exists only in Vercel's server environment.
- Reader passwords are never sent to or stored in the frontend source.
- Only salted scrypt password hashes are stored in Vercel environment variables.
- Each council uses a separate Redis list and a separate password.
- Reader responses use `Cache-Control: no-store`.
- The API limits unlock attempts and anonymous submissions per connection. Raw IP addresses are not stored; only short-lived salted hashes are used for rate limiting.
- Each box keeps the newest 500 messages. Newest messages appear first.

For stronger operational security, use unique passwords of at least 12–16 characters and change a council password immediately if it is shared beyond the authorized readers.
