# Deployment guide

The site is ready to publish as-is — **the CSS is already compiled, so you do
not need Node or any build step** for a normal (static) deploy. Most people
should use the static path below.

## Static deployment (recommended — no Node, no terminal)

The `public/` folder is a complete, self-contained website.

**1. Set up the contact form (required for the form to work).**
A static site has no server of its own, so the form sends submissions to a free
form service:

- Create a free form at [Formspree](https://formspree.io), copy its endpoint
  (e.g. `https://formspree.io/f/abcdwxyz`), and paste it into the `formEndpoint`
  line of [public/js/site-config.js](../public/js/site-config.js).

If you skip this, the form will tell visitors it isn't set up yet — so don't
skip it before going live.

**2. Publish the `public/` folder.**

- **Netlify (easiest):** go to [app.netlify.com/drop](https://app.netlify.com/drop)
  and **drag the `public/` folder** onto the page. You get a live URL instantly.
  No account or build required. (You can add a custom domain later in settings.)
- **Netlify via Git:** connect your repo. Thanks to the included `netlify.toml`,
  no build runs (the CSS is already compiled) — it just publishes `public/`.
- **Vercel:** import the project and set the output/root directory to `public`.
- **GitHub Pages:** push the contents of `public/` to your Pages branch.

The portfolio loads from `projects-data.js`, the dashboard shows demo data, and
case-study pages work — all with no backend.

> **Preview before you publish:** double-clicking `index.html` (a `file://`
> address) will *not* show the site correctly — internal navigation reloads the
> page and the form can't run. The simplest accurate preview is Netlify Drop
> above (it gives you a real URL). Technical users can run any local web server.

---

## Full-stack deployment (optional — Node/Express)

Only needed if you want the bundled backend: a real contact-form API plus an
inquiries dashboard. Requires Node.js 18+.

```bash
npm install
npm start
```

Environment variables (see [.env.example](../.env.example)):

- `PORT` — the port to listen on (default `3000`).
- `ADMIN_KEY` — protects `GET /api/inquiries` (see below).

Pass them inline (`PORT=3100 ADMIN_KEY=secret npm start`), via a `.env` file with
`npm run start:env` (Node 20+), or through your host's environment settings.

Hosts: Render, Railway, Fly.io, or any VPS. Set the start command to `npm start`.
A build command isn't required (the CSS is already compiled); only run
`npm run build:css` if you changed `tailwind.config.js`.

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
