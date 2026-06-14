# AuraDesign Studio

A premium, dark-themed agency & portfolio website template with hand-built
interactive effects, SPA-style navigation, a working contact form, and a
live-style analytics dashboard.

**You do not need to be a developer to use this.** The site is ready to publish
as-is: the CSS is already compiled, so you can edit a few text files and drag a
folder online — no terminal, no Node, no build step. (If you *are* technical,
an optional Node/Express backend is included too — see [Advanced](#advanced-optional-nodeexpress-backend).)

---

## ⭐ Start here (no terminal needed)

Four steps take you from this download to a live site:

### 1. Make it yours (edit text files)

Open the project in a free text editor — **[VS Code](https://code.visualstudio.com)**
is recommended because it can search-and-replace across every file at once.

The fastest way to rebrand is **Find in Files** (in VS Code: `Ctrl+Shift+H`, or
`Cmd+Shift+H` on Mac), then "Replace All" for each of these:

| Find | Replace with |
|------|--------------|
| `AuraDesign` | Your brand name |
| `auradesign-studio.example.com` | Your domain (e.g. `mysite.com`) |
| `your-company` | Your LinkedIn company handle |
| `your-handle` | Your Dribbble (or other) handle |

Then edit the page text directly in the `.html` files inside `public/`. Demo
content you should change is marked with `<!-- DEMO CONTENT ... -->` comments —
search for `DEMO` in your editor to find every spot (client logos, stats,
testimonials, team, contact details, the map, FAQ). See the
[Customization guide](docs/customization.md) for details.

### 2. Set up the contact form

A static site can't run a server, so the form posts to a free form service:

1. Create a free form at **[Formspree](https://formspree.io)** and copy its
   endpoint (looks like `https://formspree.io/f/abcdwxyz`).
2. Open [public/js/site-config.js](public/js/site-config.js) and paste it
   between the quotes on the `formEndpoint` line.

If you skip this, the form will tell visitors it isn't set up yet.

### 3. Replace the images (optional)

Swap the artwork in [public/img/](public/img/) for your own (keep the same
filenames, or update the references). The social-share preview is
`public/img/og-image.png` (1200×630 recommended).

### 4. Publish it

Go to **[app.netlify.com/drop](https://app.netlify.com/drop)** and drag the
`public/` folder onto the page. That's it — you get a live URL in seconds, for
free. (You can connect a custom domain later in Netlify's settings.)

> **Tip — preview before publishing:** opening `index.html` by double-clicking
> (a `file://` address) does *not* show the site correctly (navigation reloads,
> the form won't work). Use Netlify Drop above to see the real thing, or any
> simple local web server.

---

## ✅ Before-you-publish checklist

- [ ] Replaced `AuraDesign` with your brand name (Find in Files)
- [ ] Replaced `auradesign-studio.example.com` with your domain
- [ ] Replaced the `DEMO CONTENT` blocks (logos, stats, testimonials, team, FAQ)
- [ ] Updated contact details on the About page (email, phone, address, map)
- [ ] Replaced `your-company` / `your-handle` social links (or removed them)
- [ ] Set your Formspree endpoint in `js/site-config.js`
- [ ] Replaced the privacy policy text in `privacy.html` with your own
- [ ] Swapped images in `public/img/` (and `og-image.png`)

---

## Features

- **Interactive canvas effects** — a mouse-reactive dot mesh, cursor glow,
  light-up 3D-tilt cards, and magnetic buttons, all in vanilla JS (no libraries).
- **SPA navigation** — internal links swap only the `<main>`, keeping the
  animated background alive, with a graceful fallback to full page loads.
- **Analytics dashboard** — custom canvas charts (visits line with tooltip,
  project donut, animated KPIs) with zero charting dependencies.
- **Working contact form** — posts to a static form service (Formspree, etc.)
  *or* the bundled Express API, with validation, honeypot, and rate limiting.
- **Dual deployment** — static (Netlify/Vercel/GitHub Pages) or full-stack (Node).
- **Easy rebranding** — change your accent colour by editing one line in
  `public/css/styles.css` (no build step). See the customization guide.
- **English/Spanish ready** — JavaScript messages live in one `I18N` dictionary.
- **SEO included** — per-page meta, Open Graph, Twitter Cards, JSON-LD,
  `robots.txt`, and `sitemap.xml`.
- **Accessible** — skip-link, ARIA on interactive controls, reduced-motion
  support, visible focus styles, and a `<noscript>` fallback.
- **Original artwork** — all images are original, license-clear SVGs.
- **9 pages** — Home, Portfolio, Services, Pricing, About + Contact, Dashboard,
  Case Study, 404, and Privacy Policy.

## Documentation

- [Customization guide](docs/customization.md) — step-by-step, no-terminal edits
  for colours, text, images, contact details, and the demo content.
- [Deployment guide](docs/deployment.md) — publishing the static site (and the
  optional Node backend).

## Project structure

```
├── public/                  # The website — this is what you publish
│   ├── index.html  portfolio.html  services.html  pricing.html  about.html
│   ├── dashboard.html  project.html  404.html  privacy.html
│   ├── robots.txt  sitemap.xml  favicon.svg
│   ├── img/                 # Original SVG artwork + OG image
│   ├── css/
│   │   ├── tailwind.css     # Already compiled — no build needed to publish
│   │   └── styles.css       # Effects, shared styles, and the brand accent colour
│   └── js/
│       ├── site-config.js   # Set your Formspree endpoint here
│       ├── projects-data.js # Portfolio content (edit your projects here)
│       └── main.js          # SPA router, effects, portfolio, form, dashboard, i18n
├── docs/                    # customization.md, deployment.md
├── LICENSE  CHANGELOG.md  README.md
│
│   # The files below are only for the optional Node backend / recompiling CSS.
│   # You can ignore them for a normal static deploy.
├── server/                  # Express API (optional)
├── src/input.css            # Tailwind source (only if you recompile)
├── tailwind.config.js       # Design tokens (only if you recompile)
├── package.json  .env.example  netlify.toml
```

---

## Advanced (optional): Node/Express backend

Everything above works with **no Node and no build step**. This section is only
if you want to run the bundled backend (a real contact-form API + inquiries
dashboard) or recompile Tailwind after changing colours/fonts in
`tailwind.config.js`.

Requires Node.js 18+ (20+ for `npm run start:env`).

```bash
npm install
npm start          # serves the site at http://localhost:3000
npm run dev        # auto-restarts on change
```

Protect the dashboard with an admin key via environment variables:

```bash
PORT=3100 ADMIN_KEY=your-secret npm start
```

Prefer a `.env` file? Copy `.env.example` to `.env` and run `npm run start:env`
(Node 20+). Plain `npm start` does not read `.env`.

Recompile the CSS after editing Tailwind classes or `tailwind.config.js`:

```bash
npm run build:css      # or: npm run watch:css  (rebuilds as you edit)
```

### API (full-stack mode)

| Method | Route                         | Description                                       |
|--------|-------------------------------|---------------------------------------------------|
| GET    | `/api/projects`               | List portfolio projects                           |
| GET    | `/api/projects?category=web`  | Filter by category (`web`, `branding`, `dev`)     |
| POST   | `/api/contact`                | Submit the contact form (validated, rate-limited) |
| GET    | `/api/inquiries`              | List inquiries (admin key or localhost only)      |

## License

Commercial template license — see [LICENSE](LICENSE). One license per end product.
