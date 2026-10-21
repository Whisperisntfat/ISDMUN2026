# ISD MUN 2026 — Vercel-ready website

This is a fully static website. It does **not** depend on ChatGPT Sites or any backend.

## Deploy on Vercel

### Option 1 — GitHub (recommended)
1. Create a new GitHub repository.
2. Upload everything in this folder to the repository root.
3. In Vercel, click **Add New → Project**.
4. Import the GitHub repository.
5. Framework Preset: **Other**.
6. Build Command: leave blank.
7. Output Directory: leave blank.
8. Click **Deploy**.

### Option 2 — Vercel CLI
Install Node.js, then run:

```bash
npm i -g vercel
cd ISD-MUN-2026-Vercel
vercel
```

For production:

```bash
vercel --prod
```

## Edit content
- Committee/chair/research data: `app.js`
- Layout/content: `index.html`
- Design: `styles.css`
- Logo and research PDF: `assets/`

## Custom domain
After deployment, open the Vercel project → **Settings → Domains** and add your domain.
