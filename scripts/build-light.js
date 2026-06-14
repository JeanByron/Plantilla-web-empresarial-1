// Generates the FREE "light" edition (light/) from the full template (public/).
//   node scripts/build-light.js
//
// The light edition is a lead magnet: Home + Portfolio only (plus 404), fully
// static, with the interactive effects intact, a "Free version" banner, and
// dual CTAs — upgrade to the full template (Gumroad) and hire the agency.
// It is derived from public/ so it never needs separate maintenance: edit the
// full template, re-run this script.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'public');
const OUT = path.join(ROOT, 'light');

// --- Configurable CTA targets (placeholders, documented for the seller) ---
// Replace all three before publishing the free edition (see light/README.md).
const FULL_URL = 'https://your-gumroad.gumroad.com/l/auradesign-studio'; // paid full template on Gumroad
const HIRE_URL = 'https://your-agency-site.example.com';                  // your agency / services site
const DOMAIN = 'https://auradesign-light.example.com';                    // where the free demo is hosted

// Pages that ship in the light edition.
const PAGES = ['index.html', 'portfolio.html', '404.html'];
// Assets copied verbatim (only what the light pages actually use).
// Copied verbatim. main.js is transformed separately (see below) because its
// portfolio cards link to project.html, which the light edition omits.
const ASSET_FILES = [
    'favicon.svg',
    'css/styles.css',
    'css/tailwind.css',
    'js/site-config.js',
    'js/projects-data.js',
];
// Images used by Home + Portfolio (projects + og). Team/service images belong
// to About/Services, which the light edition omits.
const IMG_FILES = [
    'og-image.png',
    'project-1.svg', 'project-2.svg', 'project-3.svg', 'project-4.svg', 'project-5.svg',
];

// ---------- Reduced header (only Home + Portfolio + the two CTAs) ----------
const HEADER = `<!-- Navigation -->
<header class="bg-surface fixed top-0 w-full z-50 shadow-sm transition-all duration-200 ease-out">
<div class="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-base max-w-container-max mx-auto h-[80px]">
<a class="font-headline-md text-headline-md font-bold text-primary tracking-tight" href="index.html">AuraDesign</a>
<nav class="hidden md:flex gap-stack-md font-body-md text-body-md uppercase tracking-wider" id="main-nav">
<a class="text-on-surface-variant hover:text-secondary transition-colors duration-200 ease-out" data-nav="index.html" href="index.html">Home</a>
<a class="text-on-surface-variant hover:text-secondary transition-colors duration-200 ease-out" data-nav="portfolio.html" href="portfolio.html">Portfolio</a>
<a class="text-on-surface-variant hover:text-secondary transition-colors duration-200 ease-out" href="${HIRE_URL}">Hire us</a>
</nav>
<a class="hidden md:inline-flex bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded hover:bg-secondary transition-colors duration-200 ease-out uppercase" href="${FULL_URL}" target="_blank" rel="noopener">Get full template</a>
<button aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" class="md:hidden text-primary" id="mobile-menu-toggle">
<span aria-hidden="true" class="material-symbols-outlined">menu</span>
</button>
</div>
<!-- Mobile menu -->
<nav class="hidden-menu md:hidden absolute top-full left-0 w-full bg-surface border-t border-outline-variant flex flex-col px-margin-mobile py-stack-sm gap-stack-sm shadow-ambient-1" id="mobile-menu">
<a class="text-on-surface-variant font-body-md text-body-md uppercase tracking-wider hover:text-secondary py-2" data-nav="index.html" href="index.html">Home</a>
<a class="text-on-surface-variant font-body-md text-body-md uppercase tracking-wider hover:text-secondary py-2" data-nav="portfolio.html" href="portfolio.html">Portfolio</a>
<a class="text-on-surface-variant font-body-md text-body-md uppercase tracking-wider hover:text-secondary py-2" href="${HIRE_URL}">Hire us</a>
<a class="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded text-center uppercase" href="${FULL_URL}" target="_blank" rel="noopener">Get full template</a>
</nav>
</header>`;

// ---------- "Free version" banner (sits above the header, fixed) ----------
const BANNER = `<!-- Free edition banner -->
<div class="bg-secondary text-on-secondary text-center font-label-md text-label-md py-2 px-4 relative z-[60]">
Free edition · <a class="underline font-bold" href="${FULL_URL}" target="_blank" rel="noopener">Get the full template</a> (8 pages, dashboard, Node backend) or <a class="underline font-bold" href="${HIRE_URL}">hire us to build it for you</a>.
</div>`;

// ---------- Reduced footer (dual CTA, only existing links) ----------
const FOOTER = `<!-- Footer -->
<footer class="bg-surface-container-highest border-t border-outline-variant w-full py-stack-lg px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
<div class="col-span-1 md:col-span-1">
<div class="font-headline-md text-headline-md font-bold text-primary mb-stack-sm">AuraDesign</div>
<p class="font-body-sm text-body-sm text-on-surface-variant">
© <span data-copyright-year>2026</span> AuraDesign Studio. Free edition.
</p>
</div>
<div class="col-span-1 md:col-span-3 flex flex-wrap gap-stack-md justify-start md:justify-end items-center opacity-80 hover:opacity-100 transition-opacity">
<a class="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded uppercase hover:bg-secondary transition-colors duration-200 ease-out" href="${FULL_URL}" target="_blank" rel="noopener">Get full template</a>
<a class="bg-transparent border border-primary text-primary font-label-md text-label-md px-4 py-2 rounded uppercase hover:bg-surface-container transition-colors duration-200 ease-out" href="${HIRE_URL}">Hire us</a>
<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="portfolio.html">Portfolio</a>
<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="https://www.linkedin.com/company/your-company" target="_blank" rel="noopener">LinkedIn</a>
<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="https://dribbble.com/your-handle" target="_blank" rel="noopener">Dribbble</a>
</div>
</footer>`;

function rimraf(p) { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }
function copy(rel) {
    const from = path.join(SRC, rel);
    const to = path.join(OUT, rel);
    ensureDir(path.dirname(to));
    fs.copyFileSync(from, to);
}

// Replace the header block (between "<!-- Navigation -->" and "</header>").
function swapBlock(html, startMarker, endMarker, replacement) {
    const start = html.indexOf(startMarker);
    const end = html.indexOf(endMarker, start);
    if (start === -1 || end === -1) throw new Error(`block not found: ${startMarker}`);
    return html.slice(0, start) + replacement + html.slice(end + endMarker.length);
}

function transform(file, html) {
    // 1. Header → reduced header, with the banner inserted right before it.
    html = swapBlock(html, '<!-- Navigation -->', '</header>', BANNER + '\n' + HEADER);

    // 2. Footer → reduced footer.
    html = swapBlock(html, '<!-- Footer -->', '</footer>', FOOTER);

    // 3. Rewrite links to pages that don't exist in the light edition. Any CTA
    //    that pointed at the contact form now points at the agency CTA; links to
    //    services/about/dashboard/case-study go to the full-template purchase.
    html = html.replace(/href="about\.html#contacto"/g, `href="${HIRE_URL}"`);
    html = html.replace(/href="services\.html"/g, `href="${FULL_URL}" target="_blank" rel="noopener"`);
    html = html.replace(/href="about\.html"/g, `href="${FULL_URL}" target="_blank" rel="noopener"`);
    html = html.replace(/href="dashboard\.html"/g, `href="${FULL_URL}" target="_blank" rel="noopener"`);
    // Case-study cards: keep them clickable but send to the full template
    // (the project.html detail page isn't included in the free edition).
    html = html.replace(/href="project\.html\?id=\d+"/g, `href="${FULL_URL}" target="_blank" rel="noopener"`);
    // privacy.html isn't shipped; drop that footer link target gracefully.
    html = html.replace(/href="privacy\.html"/g, `href="${FULL_URL}" target="_blank" rel="noopener"`);

    // 4. SEO: point canonical/OG at the light domain, and append "(Free)" to titles.
    html = html.replace(/https:\/\/auradesign-studio\.example\.com/g, DOMAIN);
    html = html.replace(/<title>([^<]*)<\/title>/, (m, t) => `<title>${t.replace(/ - AuraDesign Studio| \| Web Design Agency/, '')} — AuraDesign Studio (Free)</title>`);

    // 5. The pt-[80px] on <main> must clear the banner too; add extra top space.
    html = html.replace('<main id="main" class="pt-[80px]"', '<main id="main" class="pt-[120px]"');

    return html;
}

// main.js for the light edition: the dynamically-rendered portfolio cards
// normally link to project.html (omitted here), so redirect them to the full
// template. initProjectDetail() never runs in the light edition (no
// project.html), but rewrite its CTA too so no dead reference to a missing page
// remains.
function transformMainJs(js) {
    js = js.replace(
        'href="project.html?id=${encodeURIComponent(p.id)}"',
        `href="${FULL_URL}" target="_blank" rel="noopener"`
    );
    js = js.replace('href="about.html#contacto"', `href="${HIRE_URL}"`);
    return js;
}

// ---------- Run ----------
rimraf(OUT);
ensureDir(OUT);

for (const rel of [...ASSET_FILES]) copy(rel);
// Transform and write main.js separately.
ensureDir(path.join(OUT, 'js'));
fs.writeFileSync(
    path.join(OUT, 'js', 'main.js'),
    transformMainJs(fs.readFileSync(path.join(SRC, 'js', 'main.js'), 'utf8')),
    'utf8'
);
ensureDir(path.join(OUT, 'img'));
for (const img of IMG_FILES) copy(path.join('img', img));

for (const page of PAGES) {
    const html = fs.readFileSync(path.join(SRC, page), 'utf8');
    fs.writeFileSync(path.join(OUT, page), transform(page, html), 'utf8');
}

// light-specific robots/sitemap
fs.writeFileSync(path.join(OUT, 'robots.txt'),
    `# Replace the placeholder domain with your own before publishing.\nUser-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`, 'utf8');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${DOMAIN}/</loc><priority>1.0</priority></url>\n  <url><loc>${DOMAIN}/portfolio.html</loc><priority>0.8</priority></url>\n</urlset>\n`, 'utf8');

// light-specific netlify.toml (static publish of the light/ folder itself)
fs.writeFileSync(path.join(OUT, 'netlify.toml'),
`# Netlify config for the FREE light edition. Publish this folder as-is.
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
`, 'utf8');

// light README for the seller
fs.writeFileSync(path.join(OUT, 'README.md'),
`# AuraDesign Studio — Free Edition

A free, static taste of the [AuraDesign Studio](${FULL_URL}) agency template:
the Home and Portfolio pages with the full interactive effects, no backend.

## This is a lead magnet — set your 3 links first

This folder is **generated** by \`scripts/build-light.js\` in the full template
repo. Before publishing, edit the three URLs at the top of that script and
re-run it (or just find-and-replace in these files):

- \`FULL_URL\` → your paid full template (Gumroad)
- \`HIRE_URL\` → your agency / services site
- \`DOMAIN\`   → where you host this free demo

## Deploy

Drag this folder onto Netlify, or connect the repo and set the publish
directory to \`light\`. It's fully static — no build, no server.

## License

Free to use and deploy. The full template is sold under a commercial license.
`, 'utf8');

console.log('Light edition generated in light/  (' + PAGES.length + ' pages + assets + README + netlify.toml)');
