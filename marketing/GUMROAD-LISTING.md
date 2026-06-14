# Gumroad listing — copy & setup

Ready-to-paste copy for the AuraDesign Studio product page, plus pricing and
launch notes. Everything below the dividers is customer-facing.

---

## Product name

**AuraDesign Studio — Dark Agency & Portfolio Template (HTML + Tailwind + Node)**

## Subtitle / one-liner

A premium dark, interactive agency template that deploys as a static site *or*
a full Node app. Built to win premium clients.

## Cover order (upload in this order)

1. `covers/cover-1-hero.png` — main cover (brand + tagline + bullets)
2. `covers/cover-2-features.png` — feature grid
3. `covers/cover-6-effects.png` — interactive effects
4. `covers/cover-3-dashboard.png` — analytics dashboard
5. `covers/cover-4-deployment.png` — static vs full-stack
6. `covers/cover-5-included.png` — what's included
- `covers/thumbnail-80.png` — 80×80 square thumbnail

> Tip: add a short screen-recording (hover effects, dashboard, portfolio
> filter) hosted on YouTube/Vimeo and embed it — Gumroad supports video.

---

## Description (paste into Gumroad)

**Stop sending clients a link to a template everyone has seen.**

AuraDesign Studio is a dark, futuristic agency & portfolio template with
hand-built interactive effects you won't find in the usual $12 themes: a
mouse-reactive dot mesh, cursor glow, 3D-tilt cards, magnetic buttons, and a
real analytics dashboard with custom canvas charts — all in vanilla JS, zero
chart libraries.

And it ships **two ways out of the box**. Drop the `public/` folder on Netlify
for a 100% static site (no server), or run the included Node/Express backend
for a working contact form and a live inquiries dashboard. Same template,
your call — no rewrite.

### ✨ What makes it different

- **Interactive canvas effects** — reactive dot field, cursor glow, light-up
  3D-tilt cards, magnetic buttons. Hand-coded, 60fps, and they respect
  `prefers-reduced-motion`.
- **SPA-style navigation** — internal links swap only the content; the animated
  background never reloads. Falls back gracefully to full page loads.
- **Analytics dashboard** — visits line chart with hover tooltip, animated
  KPIs, project donut. Custom canvas — no Chart.js, no dependencies.
- **Working contact form** — server-side validation, honeypot, and per-IP rate
  limiting via the Node API, *or* point it at Formspree for static hosting.
- **Dual deployment** — static (Netlify/Vercel/GitHub Pages) or full-stack
  (Render/Railway/VPS). Documented both ways.
- **SEO + accessibility built in** — per-page meta, Open Graph, Twitter Cards,
  JSON-LD, sitemap, robots.txt, skip-links, ARIA, and a `<noscript>` fallback.
- **English / Spanish ready** — every runtime string lives in one i18n
  dictionary; flip a single `LOCALE` constant.
- **Original artwork** — all images are original, license-clear SVGs. Nothing
  hot-linked, nothing that can expire on you.

### 📦 What you get

- 9 responsive pages — Home, Portfolio, Services, Pricing, About + Contact,
  Dashboard, Case Study, 404, Privacy Policy
- Full Tailwind CSS source + config (compiled, no CDN)
- Node/Express backend with a JSON data store
- Customization & deployment guides
- Commercial license (use it on one client or personal project)

### 🛠️ Built with

HTML5 · Tailwind CSS · Vanilla JavaScript · Node.js / Express

### 🎯 Perfect for

Freelancers and studios who want a portfolio that looks custom-built — and
clients who'll pay for the real thing.

---

## 👋 Need it tailored to your brand? (loss-leader CTA — keep this)

This is the same template our studio uses as a starting point for client work.
**Want it customized, branded, and launched for you — or something built from
scratch?** Reply to your receipt or reach us at [your email] and let's talk.

---

## Pricing & launch (notes for you, do NOT paste)

- **List price: $19.** Launch with an intro discount code to **$12–14** for the
  first 2 weeks to seed reviews.
- The **free "light" version** is built (`light/` folder, Home + Portfolio,
  static only). Publish it as a separate $0+ Gumroad product and deploy its demo
  — it links back here and to your services. This is the traffic magnet for the
  agency play. See the free-edition listing section below.
- Offer/keep an **"extended" or "done-for-you" tier** as the upsell that routes
  buyers to custom work (the actual money in the loss-leader strategy).
- After ~10–20 sales, revisit building a React/Next variant before any "bundle".

## Pre-publish checklist

See [LAUNCH.md](../LAUNCH.md) for the full step-by-step. In short:

- [ ] Fill `brand.config.json` and run `node scripts/personalize.js` — this
      replaces the domain, social links, author, full-template URL and agency
      URL everywhere at once (no manual find-and-replace).
- [ ] Deploy the static demo to Netlify and put the live URL in the listing.
- [ ] Upload `AuraDesign-Studio-v1.2.zip` + the covers from `covers/`.
- [ ] Add the demo link + a video to the Gumroad page.

---

# FREE EDITION — separate Gumroad product ($0+)

The free "light" edition lives in the `light/` folder and is packaged as
`marketing/AuraDesign-Studio-Free.zip`. List it as its own **$0+ (pay what you
want)** product. Its whole job is to send traffic to the paid template and to
your agency.

## Product name

**AuraDesign Studio — Free Agency Template (Home + Portfolio)**

## Description (paste into the free product)

A free, static taste of AuraDesign Studio: the **Home and Portfolio pages with
the full interactive effects** — mouse-reactive dot mesh, cursor glow, 3D-tilt
cards, magnetic buttons. No backend, no build step. Drop it on Netlify and go.

Love it? The **full template** adds more pages (Services, Pricing, About, a
working contact form, an analytics dashboard, case-study pages), a Node/Express
backend, dual deployment, SEO, and docs — [grab it here](FULL_URL).

Need a site built *for* you? [Let's talk](HIRE_URL).

### What's in the free edition
- Home + Portfolio + 404, fully responsive
- All the interactive canvas effects
- Original SVG artwork
- 100% static — deploy in minutes

> Free to use and deploy. The full template ships under a commercial license.

## Setup before publishing the free edition

The free edition's URLs come from `brand.config.json` too. After running
`node scripts/personalize.js` and `node scripts/build-light.js` (see
[LAUNCH.md](../LAUNCH.md)), the `light/` files already point at your paid
product, your agency, and the free demo domain.

- [ ] Deploy `light/` to Netlify and link the live demo from this product.
- [ ] Upload `marketing/AuraDesign-Studio-Free.zip`.
