# Changelog

All notable changes to AuraDesign Studio are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## [1.3.0] — 2026-06-13

A self-sufficiency pass: the template can now be fully personalized and
published by a non-technical buyer, with no terminal and no build step.

### Added
- **No-build accent colour** — change the brand highlight by editing a single
  `--accent` variable in `public/css/styles.css`; the whole site recolours with
  no recompile (canvas charts included).
- **Demo-content markers** — every placeholder block (client logos, stats,
  testimonials, team, history, contact details, map, social links) is now
  flagged with `<!-- DEMO CONTENT -->` comments so they're easy to find.
- **Before-you-publish checklist** and a no-terminal "Start here" guide in the
  README.

### Changed
- Rewrote README and the customization/deployment guides for a non-technical
  audience: the static, no-Node path is the default; Node is clearly optional.
- The contact form now shows a clear "not set up yet" message instead of a
  misleading "could not connect to the server" error when no form endpoint is
  configured on a static deploy.
- `netlify.toml` no longer runs an npm build (the CSS ships compiled), so
  connecting a Git repo deploys without Node.
- `site-config.js` flags the Formspree endpoint as required for static mode.

### Fixed
- Removed documentation references to seller-only tooling that isn't part of the
  download.
- Portfolio error message no longer mentions a "server" in static mode.

## [1.2.0] — 2026-06-13

A content and polish pass: a new Pricing page, richer home sections, and a
sweep of accessibility, SEO, and personalization refinements.

### Added
- **Pricing page** (`pricing.html`) — three productized tiers, a feature
  comparison table, and a pricing FAQ; linked from the main navigation.
- **Richer home sections** — client logo marquee, animated stat band, process
  timeline, testimonials, and an FAQ accordion.
- **Personalizable contact details** — the About page email, phone, and address
  are clearly marked demo values, easy to find and replace in `about.html`.
- **Per-case-study metadata** — `project.html` updates its canonical and
  Open Graph/Twitter tags to the active project on navigation.
- **New type scale tokens** — `display-md`, `headline-sm`, `label-lg`, and
  `stack-2xl` added to the design system.

### Changed
- Contact anchor renamed from `#contacto` to `#contact` across the site.
- "Compare packages" now uses a dark section background, consistent with the
  rest of the site.
- Header logo position tuned so its expanded state no longer crowds the nav.

### Fixed
- **Accessibility** — contact-form result now announced via `aria-live`;
  heading hierarchy corrected (no `h1→h3` skips); visible focus ring added for
  all keyboard controls; client-marquee text contrast raised to meet WCAG AA;
  `prefers-reduced-motion` now also disables the glow-card and FAQ animations;
  the inert "View gallery" button is now a real link.
- **SEO** — `404.html` marked `noindex`; fixed a duplicated brand name in the
  free edition's home `<title>`.
- Localized the initial "Loading…" placeholders so they follow `LOCALE`.

## [1.1.0] — 2026-06-12

A major productization pass turning the site into a sellable, deployable template.

### Added
- **Local Tailwind build** (`tailwind.config.js`, `src/input.css`, `npm run build:css`) — the Tailwind Play CDN was removed; CSS is now compiled and minified to `public/css/tailwind.css`.
- **Dual deployment** — the front end works fully static (no Node) via `public/js/projects-data.js` and `public/js/site-config.js`, or full-stack with the bundled Express server.
- **Internationalization** — all runtime strings live in an `I18N` dictionary in `main.js` with English and Spanish locales, selectable via `LOCALE`.
- **New pages** — a `pricing.html` packages page, individual case-study page (`project.html`), styled `404.html`, and a `privacy.html` policy template.
- **SEO** — per-page meta description, canonical, Open Graph and Twitter Card tags, `Organization` JSON-LD on the homepage, plus `robots.txt` and `sitemap.xml`.
- **Accessibility** — skip-link, `aria-expanded`/`aria-controls` on the mobile menu, `aria-hidden` on decorative icons, and a `<noscript>` fallback so content stays visible without JS.
- **Original artwork** — all imagery replaced with original, license-clear SVGs in `public/img/`.
- **Server hardening** — `GET /api/inquiries` is now protected (admin key or loopback only), the contact form has a honeypot, per-IP rate limiting, field length limits, and atomic writes.
- **Documentation** — `LICENSE`, `docs/customization.md`, `docs/deployment.md`, and `.env.example`.

### Changed
- All user-facing content and code comments translated to English (Spanish kept as a secondary runtime locale).
- Portfolio cards are now real, keyboard-accessible links to `project.html`.
- Footer links (Privacy, LinkedIn, Dribbble) point to real targets instead of `#`.
- Dashboard shows positive demo data when no live backend is available, with a "Demo data" badge.
- Copyright year is now dynamic.

### Fixed
- Removed all externally hot-linked images (which could expire and had unclear redistribution rights).
- Portfolio "View case study" cards previously led nowhere.

## [1.0.0] — 2026-06-12
- Initial release: dark futuristic agency site with interactive canvas effects, SPA navigation, analytics dashboard, and an Express backend (Tailwind via CDN).
