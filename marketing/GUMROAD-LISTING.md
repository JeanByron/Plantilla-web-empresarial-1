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

- 8 responsive pages — Home, Portfolio, Services, About + Contact, Dashboard,
  Case Study, 404, Privacy Policy
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
- Consider a **free "light" version** later (Home + Portfolio, static only) as a
  separate $0+ Gumroad product that links here and to your services — this is
  the traffic magnet for the agency play.
- Offer/keep an **"extended" or "done-for-you" tier** as the upsell that routes
  buyers to custom work (the actual money in the loss-leader strategy).
- After ~10–20 sales, revisit building a React/Next variant before any "bundle".

## Pre-publish checklist

- [ ] Replace `auradesign-studio.example.com` everywhere (canonical, OG,
      sitemap, robots) with your real demo URL.
- [ ] Deploy the static demo to Netlify and put the live URL in the listing.
- [ ] Set your Formspree `formEndpoint` in `public/js/site-config.js` on the demo.
- [ ] Fill `author` in `package.json` and the contact email in the CTA above.
- [ ] Upload the fresh `AuraDesign-Studio-v1.1.zip` (not the v1.0).
- [ ] Add the demo link + a video to the Gumroad page.
