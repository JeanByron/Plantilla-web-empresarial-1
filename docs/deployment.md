# Deployment guide

AuraDesign Studio ships in two modes. Build the CSS first in either case:

```bash
npm install
npm run build:css
```

## Static deployment (recommended for most buyers)

The `public/` folder is a self-contained static site — no server needed.

1. Configure the contact form: set `formEndpoint` in
   [public/js/site-config.js](../public/js/site-config.js) (see the
   [customization guide](customization.md#contact-form-static-mode)).
2. Deploy `public/`:
   - **Netlify** — drag-and-drop the `public/` folder, or connect the repo and
     set the publish directory to `public`.
   - **Vercel** — import the project and set the output/root to `public`.
   - **GitHub Pages** — push `public/` to your Pages branch.

The portfolio loads from `projects-data.js`, so it works with no backend.

## Full-stack deployment (Node/Express)

Run the bundled server for a real contact form and inquiries dashboard.

Requirements: Node.js 18+.

```bash
npm start
```

Environment variables (see [.env.example](../.env.example)):

- `PORT` — the port to listen on (default `3000`).
- `ADMIN_KEY` — protects `GET /api/inquiries` (see below).

Hosts: Render, Railway, Fly.io, or any VPS. Set the start command to
`npm start` and the build command to `npm install && npm run build:css`.

### ⚠️ Ephemeral filesystem warning

Inquiries are stored in `server/data/inquiries.json` on disk. On platforms with
an **ephemeral filesystem** (Render, Railway, Heroku, most serverless), that
file is **wiped on every deploy/restart**, so submissions will be lost. For a
production deployment that must retain submissions, either:

- swap the JSON storage in `server.js` for a real database, or
- forward submissions to an email/CRM service, or
- use the static mode with a form service instead.

### Securing the dashboard

`GET /api/inquiries` exposes visitor contact data, so it is protected:

- If `ADMIN_KEY` is set, requests must send header `x-admin-key: <value>`
  (or `?key=<value>`).
- If `ADMIN_KEY` is **not** set, the endpoint is reachable only from localhost.

**Always set `ADMIN_KEY` in production.** Without it, the dashboard's inquiries
table falls back to demo data for remote visitors (it never exposes real data),
but you also won't see your real inquiries remotely until a key is configured.

The contact endpoint (`POST /api/contact`) includes a honeypot, per-IP rate
limiting (5/min), and field length limits out of the box.
