// One-off generator: builds project.html, 404.html and privacy.html from the
// shared shell (head + header + footer + scripts) of index.html, swapping in
// each page's <head> meta, <title> and <main> body. Run from project root:
//   node scripts/build-pages.js
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');
const DOMAIN = 'https://auradesign-studio.example.com';
const base = fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8');

// Extract the header block (nav) and footer block from index.html so the new
// pages stay byte-identical to the rest of the site.
const header = base.match(/<!-- Navigation -->[\s\S]*?<\/header>/)[0];
const footer = base.match(/<!-- Footer -->[\s\S]*?<\/footer>/)[0];
// Scripts block (site-config + projects-data + main).
const scripts = base.match(/<script src="js\/site-config\.js">[\s\S]*?<script src="js\/main\.js"><\/script>/)[0];

function head(title, description, canonical, ogTitle, noindex) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta name="description" content="${description}"/>${noindex ? '\n<meta name="robots" content="noindex, follow"/>' : ''}
<!-- Replace the placeholder domain below with your own before publishing -->
<link rel="canonical" href="${DOMAIN}${canonical}"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${ogTitle}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:url" content="${DOMAIN}${canonical}"/>
<meta property="og:image" content="${DOMAIN}/img/og-image.png"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${ogTitle}"/>
<meta name="twitter:description" content="${description}"/>
<meta name="twitter:image" content="${DOMAIN}/img/og-image.png"/>
<title>${title}</title>
<link href="favicon.svg" rel="icon" type="image/svg+xml"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Work+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="css/tailwind.css" rel="stylesheet"/>
<link href="css/styles.css" rel="stylesheet"/>
<!-- Prevents the loading flash: main.js reveals the content once the styles are ready -->
<style>html:not(.app-ready) main,html:not(.app-ready) footer{visibility:hidden}</style>
<noscript><style>html main,html footer{visibility:visible!important}</style></noscript>
</head>
<body class="bg-background text-on-background antialiased font-body-md overflow-x-hidden selection:bg-secondary selection:text-on-secondary">
<a class="skip-link" href="#main">Skip to content</a>
${header}`;
}

function page(meta, mainHtml) {
    return `${head(meta.title, meta.description, meta.canonical, meta.ogTitle, meta.noindex)}
${mainHtml}
${footer}
${scripts}
</body>
</html>
`;
}

// --- project.html: filled at runtime by initProjectDetail() in main.js ---
const projectMain = `<main id="main" class="pt-[80px]">
<section class="px-margin-mobile md:px-margin-desktop py-section-y max-w-container-max mx-auto">
<div id="project-detail" aria-live="polite">
<p class="font-body-md text-body-md text-on-surface-variant">Loading case study…</p>
</div>
</section>
</main>`;
fs.writeFileSync(path.join(PUBLIC, 'project.html'), page({
    title: 'Case Study - AuraDesign Studio',
    description: 'An in-depth look at a selected AuraDesign Studio project: the challenge, our approach, and the results.',
    canonical: '/project.html',
    ogTitle: 'Case Study — AuraDesign Studio'
}, projectMain), 'utf8');

// --- 404.html ---
const notFoundMain = `<main id="main" class="pt-[80px]">
<section class="px-margin-mobile md:px-margin-desktop py-[160px] max-w-container-max mx-auto text-center">
<div class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-secondary mb-stack-sm">404</div>
<h1 class="font-headline-xl text-headline-xl text-primary mb-stack-md">Page not found</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-stack-lg">The page you are looking for doesn't exist or has been moved. Let's get you back on track.</p>
<a class="inline-flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded hover:bg-secondary transition-colors duration-200 ease-out uppercase" href="index.html">
Back to home <span aria-hidden="true" class="material-symbols-outlined">arrow_forward</span>
</a>
</section>
</main>`;
fs.writeFileSync(path.join(PUBLIC, '404.html'), page({
    title: 'Page Not Found - AuraDesign Studio',
    description: 'The page you are looking for could not be found.',
    canonical: '/404.html',
    ogTitle: 'Page Not Found — AuraDesign Studio',
    noindex: true
}, notFoundMain), 'utf8');

// --- privacy.html ---
const privacyMain = `<main id="main" class="pt-[80px]">
<section class="px-margin-mobile md:px-margin-desktop py-section-y max-w-3xl mx-auto">
<h1 class="font-display-lg-mobile md:font-headline-xl text-display-lg-mobile md:text-headline-xl text-primary mb-stack-md">Privacy Policy</h1>
<div class="inline-block px-3 py-1 mb-stack-lg bg-surface-container-low text-on-surface-variant font-label-md text-label-md rounded-full border border-outline-variant">Template placeholder — replace with your own policy before publishing</div>
<div class="space-y-stack-md font-body-md text-body-md text-on-surface-variant">
<p>This Privacy Policy describes how AuraDesign Studio ("we", "us") handles information when you use this website. This is a template document provided with the theme; review it with a qualified professional and adapt it to your jurisdiction and business before going live.</p>
<h2 class="font-headline-md text-headline-md text-primary pt-stack-sm">Information we collect</h2>
<p>When you submit the contact form, we collect the name, email address, inquiry type, and message you provide. We use this information solely to respond to your inquiry.</p>
<h2 class="font-headline-md text-headline-md text-primary pt-stack-sm">Cookies and analytics</h2>
<p>This template does not set tracking cookies by default. If you add analytics or marketing tools, disclose them here.</p>
<h2 class="font-headline-md text-headline-md text-primary pt-stack-sm">Third-party services</h2>
<p>If you configure a form service (such as Formspree) or host the backend on a third-party platform, your visitors' submissions are processed by those providers under their own terms.</p>
<h2 class="font-headline-md text-headline-md text-primary pt-stack-sm">Data retention</h2>
<p>Inquiries submitted through the bundled Node backend are stored on your server. Define how long you keep them and how a visitor can request deletion.</p>
<h2 class="font-headline-md text-headline-md text-primary pt-stack-sm">Contact</h2>
<p>For privacy questions, reach us through the <a class="text-secondary hover:text-secondary-fixed-dim" href="about.html#contact">contact form</a>.</p>
</div>
</section>
</main>`;
fs.writeFileSync(path.join(PUBLIC, 'privacy.html'), page({
    title: 'Privacy Policy - AuraDesign Studio',
    description: 'Privacy policy template for AuraDesign Studio. Adapt it to your business before publishing.',
    canonical: '/privacy.html',
    ogTitle: 'Privacy Policy — AuraDesign Studio'
}, privacyMain), 'utf8');

console.log('Generated: project.html, 404.html, privacy.html');
