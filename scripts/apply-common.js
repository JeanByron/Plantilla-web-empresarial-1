// One-off transform: applies the common product changes uniformly across the
// five existing HTML pages (script tags, skip-link, noscript, decorative-icon
// aria-hidden, footer link fixes, dynamic copyright, per-page SEO meta).
// Run from the project root: node scripts/apply-common.js
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');
const DOMAIN = 'https://auradesign-studio.example.com';

// Per-page SEO metadata (unique description + canonical path).
const META = {
    'index.html': {
        canonical: '/',
        description: 'AuraDesign Studio is a strategic web design agency template with a dark futuristic theme, interactive canvas effects, an analytics dashboard, and dual static / full-stack deployment.',
        ogTitle: 'AuraDesign Studio — Web Design Agency Template'
    },
    'portfolio.html': {
        canonical: '/portfolio.html',
        description: 'Explore a curated portfolio of web design, branding, and development case studies, with category filters and individual project pages.',
        ogTitle: 'Portfolio — AuraDesign Studio'
    },
    'services.html': {
        canonical: '/services.html',
        description: 'End-to-end digital services: digital architecture, UI/UX engineering, backend systems and APIs, and strategic growth alignment.',
        ogTitle: 'Services — AuraDesign Studio'
    },
    'about.html': {
        canonical: '/about.html',
        description: 'Meet the studio behind the work and start a project through our working contact form, backed by a Node API or a static form service.',
        ogTitle: 'About & Contact — AuraDesign Studio'
    },
    'dashboard.html': {
        canonical: '/dashboard.html',
        description: 'A live-style analytics dashboard with custom canvas charts: visits trend, project mix, KPIs, and recent inquiries.',
        ogTitle: 'Dashboard — AuraDesign Studio'
    }
};

function buildHead(meta) {
    return `<meta name="description" content="${meta.description}"/>
<!-- Replace the placeholder domain below with your own before publishing -->
<link rel="canonical" href="${DOMAIN}${meta.canonical}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${meta.ogTitle}"/>
<meta property="og:description" content="${meta.description}"/>
<meta property="og:url" content="${DOMAIN}${meta.canonical}"/>
<meta property="og:image" content="${DOMAIN}/img/og-image.png"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${meta.ogTitle}"/>
<meta name="twitter:description" content="${meta.description}"/>
<meta name="twitter:image" content="${DOMAIN}/img/og-image.png"/>`;
}

const ORG_JSONLD = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AuraDesign Studio",
  "url": "${DOMAIN}/",
  "description": "Strategic web design agency: digital architecture, UI/UX, backend systems, and brand identity.",
  "logo": "${DOMAIN}/img/og-image.png"
}
</script>`;

let report = [];

for (const [file, meta] of Object.entries(META)) {
    const fp = path.join(PUBLIC, file);
    let html = fs.readFileSync(fp, 'utf8');
    const before = html;
    const changes = [];

    // 1. SEO meta: insert after the viewport meta (once).
    if (!html.includes('name="description"')) {
        html = html.replace(
            /(<meta content="width=device-width, initial-scale=1.0" name="viewport"\/>)/,
            `$1\n${buildHead(meta)}`
        );
        changes.push('seo-meta');
    }

    // 2. JSON-LD Organization on the homepage only.
    if (file === 'index.html' && !html.includes('application/ld+json')) {
        html = html.replace('</head>', `${ORG_JSONLD}\n</head>`);
        changes.push('jsonld');
    }

    // 3. Skip-link as the first body element + id="main" on <main>.
    if (!html.includes('class="skip-link"')) {
        html = html.replace(
            /(<body[^>]*>)/,
            `$1\n<a class="skip-link" href="#main">Skip to content</a>`
        );
        changes.push('skip-link');
    }
    html = html.replace(/<main(\s)/, '<main id="main"$1').replace(/<main>/, '<main id="main">');

    // 4. noscript fallback so content stays visible if JS fails (the anti-FOUC
    //    rule hides main/footer until app-ready).
    if (!html.includes('<noscript>')) {
        html = html.replace(
            '</head>',
            `<noscript><style>html main,html footer{visibility:visible!important}</style></noscript>\n</head>`
        );
        changes.push('noscript');
    }

    // 5. Decorative icons: add aria-hidden to material-symbols spans that don't
    //    already have it.
    const iconBefore = (html.match(/material-symbols-outlined/g) || []).length;
    html = html.replace(
        /<span class="material-symbols-outlined([^"]*)"(?![^>]*aria-hidden)/g,
        '<span aria-hidden="true" class="material-symbols-outlined$1"'
    );
    if (iconBefore) changes.push('aria-hidden-icons');

    // 6. Mobile menu toggle: aria-expanded + aria-controls.
    if (html.includes('id="mobile-menu-toggle"') && !html.includes('aria-expanded')) {
        html = html.replace(
            /(<button aria-label="Open menu" class="md:hidden text-primary" id="mobile-menu-toggle">)/,
            '<button aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" class="md:hidden text-primary" id="mobile-menu-toggle">'
        );
        changes.push('aria-expanded');
    }

    // 7. Footer link fixes: Privacy policy + social links (only the dead href="#").
    html = html.replace(
        /<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Privacy policy<\/a>/,
        '<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="privacy.html">Privacy policy</a>'
    );
    html = html.replace(
        /<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">LinkedIn<\/a>/,
        '<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="https://www.linkedin.com/company/your-company" target="_blank" rel="noopener">LinkedIn</a>'
    );
    html = html.replace(
        /<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="#">Dribbble<\/a>/,
        '<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-secondary transition-colors duration-200" href="https://dribbble.com/your-handle" target="_blank" rel="noopener">Dribbble</a>'
    );
    if (before.includes('href="#">Privacy policy')) changes.push('footer-links');

    // 8. Dynamic copyright year: wrap the year in a data-copyright-year span.
    if (html.includes('© 2026 AuraDesign Studio')) {
        html = html.replace(
            '© 2026 AuraDesign Studio. All rights reserved.',
            '© <span data-copyright-year>2026</span> AuraDesign Studio. All rights reserved.'
        );
        changes.push('copyright');
    }

    // 9. Config + data scripts before main.js.
    if (!html.includes('js/site-config.js')) {
        html = html.replace(
            '<script src="js/main.js"></script>',
            '<script src="js/site-config.js"></script>\n<script src="js/projects-data.js"></script>\n<script src="js/main.js"></script>'
        );
        changes.push('scripts');
    }

    if (html !== before) {
        fs.writeFileSync(fp, html, 'utf8');
        report.push(`${file}: ${changes.join(', ')}`);
    } else {
        report.push(`${file}: no changes`);
    }
}

console.log(report.join('\n'));
