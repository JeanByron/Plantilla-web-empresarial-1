# Customization guide

Everything here is done with a **plain text editor — no terminal, no Node, no
build step.** The CSS ships already compiled, so your edits show up as soon as
you save and reload.

> **Use an editor with "Find in Files".** [VS Code](https://code.visualstudio.com)
> (free) lets you search and replace across every file at once
> (`Ctrl+Shift+H`, or `Cmd+Shift+H` on Mac). This site is **9 separate HTML
> pages** and the header/footer are copied into each one, so a project-wide
> replace is the safe way to change things that repeat (your brand name, social
> links, domain).

## What needs no tools vs. what needs Node

| Change | How |
|--------|-----|
| Brand name, page text, projects, contact details, social links, domain, images | Edit files in a text editor (this guide) |
| Accent (highlight) colour | Edit one line in `public/css/styles.css` (below) |
| Full Tailwind palette, fonts, spacing tokens | Requires Node to recompile — see [Advanced](#advanced-rebuilding-the-css) |

Most people never need the last row.

## Brand name & logo

The wordmark is plain text (no image). In your editor, **Find in Files** for
`AuraDesign` and Replace All with your brand name. This covers the header logo,
the footer, page titles, SEO/Open Graph tags, and the structured-data block in
`index.html` — all 9 pages at once.

## Accent colour (no build step)

Your highlight colour (links, buttons, focus rings, glows) is controlled by one
variable. Open [public/css/styles.css](../public/css/styles.css) and edit the
top of the file:

```css
:root {
    --accent: #58c4ff;        /* change this to your brand colour */
    --accent-strong: #2f6bff; /* a slightly deeper shade for gradients */
    --accent-rgb: 88 196 255; /* same as --accent, as R G B (for glow effects) */
}
```

Change `--accent` to your colour. For the glow/shadow effects to match, also set
`--accent-rgb` to the same colour written as three numbers (search "hex to rgb"
online for the conversion). Save and reload — the whole site recolours, no tools
needed.

## Page text

Page copy is plain HTML — open the `.html` files in `public/` and edit the text
directly. Each page's `<title>`, meta description, and Open Graph / Twitter tags
are at the top of the file in the `<head>`.

## Demo content to replace before publishing

The template ships with realistic **placeholder content** so it looks complete.
Every block you should change is marked with an `<!-- DEMO CONTENT ... -->`
comment — search your editor for `DEMO` to jump to each one. The main ones:

**`index.html` (home):**
- **Client logos** — the "Trusted by" row (Nexus, Lumina, …) are invented names.
  Each appears twice (the second set is for the looping animation); change both,
  or delete the section.
- **Stats** — "120+ Projects shipped", etc. **Important:** the number that shows
  comes from the `data-stat="120"` attribute (it counts up). Editing the visible
  `0` does nothing — change `data-stat` and the label.
- **Testimonials** — the quotes, names, and roles are made up. Replace with real
  ones or delete the section. (Don't publish fake reviews.)
- **FAQ** — sample agency questions; edit to match your business.

**`about.html`:**
- **Team** — "Elena Rostova", "Marcus Vance", their roles and photos
  (`img/team-1.svg`, `team-2.svg`) are placeholders.
- **Company history** — the "2014 Founded … Now" timeline is invented.
- **Contact details** — see the next section.

**Footer (all pages):** the LinkedIn (`your-company`) and Dribbble (`your-handle`)
links are placeholders — Replace All across files, or delete the `<a>` tags.

**`privacy.html`:** a placeholder privacy policy. Replace it with your own
(have it reviewed by a professional); it is not legal advice.

## Contact details (About page)

Open [public/about.html](../public/about.html) and find the "Direct contact"
block (search for `Direct contact`). Replace the demo values:

- **Email** — `hello@auradesign.agency`
- **Phone** — `+44 (0) 20 7123 4567`
- **Address** — `100 Structural Way / London, LDN 10010 / United Kingdom`

The embedded map points at the demo address too. Find the map `<iframe>` (search
for `output=embed`) and change the `q=...` part of its URL to your own city or
address, e.g. `q=Your+City`. Note the address there is URL-encoded, so a plain
text search for your written address won't find it — search for `output=embed`.

## Projects (portfolio)

Edit [public/js/projects-data.js](../public/js/projects-data.js). Each project
has `id`, `title`, `label`, `categories` (`web`/`dev`/`branding`),
`description`, `image`, `imageAlt`, and `wide`. The case-study page reads
`project.html?id=<id>`. (If you also run the Node backend, keep
[server/data/projects.json](../server/data/projects.json) in sync.)

## Contact form

A static site can't process the form itself, so it sends submissions to a free
form service:

1. Create a free form at [Formspree](https://formspree.io) and copy its endpoint
   (e.g. `https://formspree.io/f/abcdwxyz`).
2. Open [public/js/site-config.js](../public/js/site-config.js) and paste it
   between the quotes on the `formEndpoint` line.

Until you do this, the form politely tells visitors it isn't set up yet.

## Images

Replace the SVGs in [public/img/](../public/img/) with your own (keep the same
filenames, or update the references in the HTML and project data). For the
social-share image, replace `public/img/og-image.png` (1200×630 recommended).

## Domain (before publishing)

The template uses `https://auradesign-studio.example.com` as a placeholder in
canonical tags, Open Graph/Twitter URLs, the structured-data block, `robots.txt`,
and `sitemap.xml` — about 47 spots across 11 files. **Find in Files** for
`auradesign-studio.example.com` and Replace All with your real domain (this also
catches `robots.txt` and `sitemap.xml`, which VS Code searches by default).
The social-share image is referenced by full URL, so if you skip this the link
preview image won't load when your site is shared.

## Language of the JavaScript messages

Text generated by JavaScript (form messages, dashboard labels, case-study
sections) lives in the `I18N` object near the top of
[public/js/main.js](../public/js/main.js). Set `LOCALE` to `'en'` or `'es'`.

Note: this only switches the **JavaScript-generated** strings. The text on the
pages themselves is in the `.html` files — to translate the site, edit that text
directly in each page.

---

## Advanced: rebuilding the CSS

You only need this if you change the **full Tailwind palette, fonts, or spacing
tokens** in `tailwind.config.js`. (For just the accent colour, use the no-build
method above.) This step requires Node.js 18+:

```bash
npm install
npm run build:css
```

To change the font without Node, you can override it with plain CSS in
`public/css/styles.css` (e.g. `body { font-family: 'Your Font', sans-serif; }`)
and update the Google Fonts `<link>` in each page's `<head>`.
