# Changelog

All notable changes to AuraDesign Studio are documented here.
This project adheres to [Semantic Versioning](https://semver.org/).

## [1.1.0] — 2026-06-12

A major productization pass turning the site into a sellable, deployable template.

### Added
- **Local Tailwind build** (`tailwind.config.js`, `src/input.css`, `npm run build:css`) — the Tailwind Play CDN was removed; CSS is now compiled and minified to `public/css/tailwind.css`.
- **Dual deployment** — the front end works fully static (no Node) via `public/js/projects-data.js` and `public/js/site-config.js`, or full-stack with the bundled Express server.
- **Internationalization** — all runtime strings live in an `I18N` dictionary in `main.js` with English and Spanish locales, selectable via `LOCALE`.
- **New pages** — individual case-study page (`project.html`), styled `404.html`, and a `privacy.html` policy template.
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
