# Customization guide

Everything you need to make AuraDesign Studio your own. After any change to
Tailwind classes or `tailwind.config.js`, rebuild the CSS:

```bash
npm run build:css
```

## Colors & typography

The design system lives in [tailwind.config.js](../tailwind.config.js) under
`theme.extend`:

- **Colors** — edit the `colors` map (e.g. `secondary` is the cyan accent
  `#58c4ff`). The canvas effects use a few hard-coded cyan values in
  [public/js/main.js](../public/js/main.js) and [public/css/styles.css](../public/css/styles.css);
  search for `#58c4ff` if you want those to match a new accent.
- **Fonts** — change `fontFamily` and update the Google Fonts `<link>` tags in
  each page's `<head>` to match.
- **Spacing / sizes** — `spacing` and `fontSize` tokens.

Rebuild the CSS after editing.

## Logo & name

The wordmark is plain text. Search for `AuraDesign` across `public/*.html` and
replace it. The logo lives in the header (`<a href="index.html">`) and footer.

## Text content

Page copy is plain HTML — edit the `.html` files directly. Page titles and SEO
descriptions are in each file's `<head>` (`<title>`, `meta name="description"`,
Open Graph, Twitter, canonical).

## Projects (portfolio)

There are **two** sources depending on deployment mode — keep them in sync:

- **Static mode:** [public/js/projects-data.js](../public/js/projects-data.js)
- **Full-stack mode:** [server/data/projects.json](../server/data/projects.json)

Each project has `id`, `title`, `label`, `categories` (`web`/`dev`/`branding`),
`description`, `image`, `imageAlt`, and `wide`. The case-study page reads
`project.html?id=<id>`.

## Language of runtime strings

JavaScript-generated text (form messages, dashboard labels, case-study
sections) is in the `I18N` object at the top of
[public/js/main.js](../public/js/main.js). Set `LOCALE` to `'en'` or `'es'`, or
add another locale by copying the `en` block.

## Contact form (static mode)

To make the form work without the Node backend:

1. Create a form on [Formspree](https://formspree.io) (or similar) and copy its
   endpoint, e.g. `https://formspree.io/f/abcdwxyz`.
2. Open [public/js/site-config.js](../public/js/site-config.js) and set
   `formEndpoint` to that URL.

The form sends JSON with an `Accept: application/json` header, which Formspree
accepts. The hidden `website` honeypot field is included automatically.

## Contact details (About page)

The "Direct contact" block on [public/about.html](../public/about.html) ships
with demo email, phone, and address values, and the embedded map points at the
demo address. Replace them with your own — either edit `about.html` directly, or
set `contactEmail`, `contactPhone`, and `contactAddress` in
[brand.config.json](../brand.config.json) and run `node scripts/personalize.js`.
Run `node scripts/personalize.js --check` to confirm no demo placeholders remain.

## Images

Replace the SVGs in [public/img/](../public/img/) with your own (keep the same
filenames, or update the references in the HTML and project data). For the
social-share image, replace `public/img/og-image.png` (1200×630 recommended).

## Before publishing: update the domain

The template uses `https://auradesign-studio.example.com` as a placeholder in
canonical tags, Open Graph URLs, `robots.txt`, and `sitemap.xml`. Replace it
everywhere with your real domain (search the project for `example.com`).
