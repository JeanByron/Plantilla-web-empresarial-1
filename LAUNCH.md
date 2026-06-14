# Launch guide

Everything needed to take AuraDesign Studio from finished code to two live
demos and two Gumroad products. Follow it top to bottom. Times are rough.

> This file is for you (the seller). It's excluded from the buyer's ZIP.

## 0. One-time: personalize (5 min)

Instead of hunting for placeholders by hand, fill them once and run a script.

1. Open [brand.config.json](brand.config.json) and set your real values:
   - `fullSiteDomain` — where the **paid** demo will live (e.g. a Netlify URL)
   - `lightSiteDomain` — where the **free** demo will live
   - `fullTemplateUrl` — your paid Gumroad product URL
   - `agencyUrl` — your agency / services site (the "Hire us" CTAs)
   - `contactEmail`, `social.linkedin`, `social.dribbble`
   - `author.name` / `author.email`
   - `formspreeEndpoint` — optional, for the static contact form
2. Run:
   ```bash
   npm install
   node scripts/personalize.js
   node scripts/build-light.js   # regenerate the light edition with your URLs
   npm run build:css
   ```
3. Confirm nothing was missed:
   ```bash
   node scripts/personalize.js --check
   ```
   (Tip: you can re-run `personalize.js` any time you change a value.)

## 1. Deploy the PAID demo (10 min)

The buyer needs to see it live before they buy.

1. Build once: `npm run build:css`.
2. On [Netlify](https://app.netlify.com): "Add new site" → drag the `public/`
   folder in (or connect the repo with build `npm install && npm run build:css`
   and publish dir `public`).
3. Note the URL. If it differs from `fullSiteDomain`, update `brand.config.json`
   and re-run `node scripts/personalize.js` so canonical/OG/sitemap match.
4. (Optional) Set the Formspree endpoint so the demo's contact form works.

## 2. Deploy the FREE demo (10 min)

This is your traffic magnet.

1. On Netlify: "Add new site" → drag the `light/` folder in.
2. Confirm its CTAs point to your paid product and agency (they do if step 0
   was run). The "Free edition" banner should be visible on every page.

## 3. Publish the PAID product on Gumroad (20 min)

1. Create a new product. Use the copy in
   [marketing/GUMROAD-LISTING.md](marketing/GUMROAD-LISTING.md) (name, subtitle,
   description).
2. Upload `marketing/AuraDesign-Studio-v1.2.zip` as the file.
3. Upload the covers from `marketing/covers/` in the order listed, plus
   `thumbnail-80.png`.
4. Add the **paid demo URL** from step 1.
5. Price: **$19**, with an intro discount code to **$12–14** for 2 weeks.
6. (Recommended) Record a 30–60s screen capture (hover effects, dashboard,
   portfolio filter), upload to YouTube/Vimeo, and embed it.

## 4. Publish the FREE product on Gumroad (10 min)

1. Create a second product, **$0+ (pay what you want)**. Use the "FREE EDITION"
   section of `marketing/GUMROAD-LISTING.md`.
2. Upload `marketing/AuraDesign-Studio-Free.zip`.
3. Add the **free demo URL** from step 2.
4. In the description, link to the paid product and your agency.

## 5. Seed traffic (ongoing)

- Submit the **free demo** to template directories (Tailwind Awesome,
  BuiltAtLightspeed, free-template roundups).
- Every place the free edition appears, a visitor is one click from the paid
  template and from hiring you. That's the whole strategy.

## After ~10–20 sales

Only then consider building the **React/Next variant** and a bundle. Until there
is real demand, that's hours better spent on traffic and client work.

---

## Quick reference

| What | Where |
|---|---|
| Edit your details | `brand.config.json` → `node scripts/personalize.js` |
| Regenerate the free edition | `node scripts/build-light.js` |
| Rebuild CSS | `npm run build:css` |
| Regenerate covers + 80×80 thumbnail | `node scripts/render-covers.js` |
| Paid product ZIP | `marketing/AuraDesign-Studio-v1.2.zip` |
| Free product ZIP | `marketing/AuraDesign-Studio-Free.zip` |
| Covers | `marketing/covers/` |
| Sales copy | `marketing/GUMROAD-LISTING.md` |
| Customization | `docs/customization.md` |
| Deployment detail | `docs/deployment.md` |
