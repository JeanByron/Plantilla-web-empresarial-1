// Generates public/pricing.html from the shared shell (header + footer +
// scripts) of index.html, so it stays byte-identical to the rest of the site.
//   node scripts/build-pricing.js
const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');
const DOMAIN = 'https://auradesign-studio.example.com';
const base = fs.readFileSync(path.join(PUBLIC, 'index.html'), 'utf8');

const header = base.match(/<!-- Navigation -->[\s\S]*?<\/header>/)[0];
const footer = base.match(/<!-- Footer -->[\s\S]*?<\/footer>/)[0];
const scripts = base.match(/<script src="js\/site-config\.js">[\s\S]*?<script src="js\/main\.js"><\/script>/)[0];

const description = 'Transparent, productized pricing for web design and development: Launch, Growth, and Scale packages, plus custom engagements.';
const ogTitle = 'Pricing — AuraDesign Studio';

const head = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta name="description" content="${description}"/>
<!-- Replace the placeholder domain below with your own before publishing -->
<link rel="canonical" href="${DOMAIN}/pricing.html"/>
<meta property="og:type" content="website"/>
<meta property="og:title" content="${ogTitle}"/>
<meta property="og:description" content="${description}"/>
<meta property="og:url" content="${DOMAIN}/pricing.html"/>
<meta property="og:image" content="${DOMAIN}/img/og-image.png"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${ogTitle}"/>
<meta name="twitter:description" content="${description}"/>
<meta name="twitter:image" content="${DOMAIN}/img/og-image.png"/>
<title>Pricing - AuraDesign Studio</title>
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

const tier = (name, price, blurb, features, featured) => `
<div class="relative flex flex-col bg-surface-container-lowest border ${featured ? 'border-secondary shadow-ambient-1 shadow-ambient-2' : 'border-outline-variant'} rounded-lg p-stack-md glow-card">
${featured ? '<span class="absolute -top-3 left-stack-md bg-secondary text-on-secondary font-label-md text-label-md px-3 py-1 rounded-full uppercase tracking-wider">Most popular</span>' : ''}
<h2 class="font-headline-md text-headline-md text-primary mb-base">${name}</h2>
<div class="mb-base"><span class="font-display-lg-mobile text-display-lg-mobile text-primary">${price}</span></div>
<p class="font-body-md text-body-md text-on-surface-variant mb-stack-md">${blurb}</p>
<ul class="space-y-3 mb-stack-lg grow">
${features.map(f => `<li class="flex items-start gap-3"><span aria-hidden="true" class="material-symbols-outlined text-secondary">check</span><span class="font-body-md text-body-md text-on-surface">${f}</span></li>`).join('\n')}
</ul>
<a class="${featured ? 'bg-primary text-on-primary hover:bg-secondary' : 'bg-transparent border border-primary text-primary hover:bg-surface-container'} font-label-md text-label-md px-6 py-3 rounded transition-colors duration-200 ease-out uppercase text-center" href="about.html#contact">Get started</a>
</div>`;

const compareRow = (label, a, b, c) => `
<tr class="border-b border-outline-variant/40">
<td class="py-3 pr-4 font-body-md text-body-md text-on-surface">${label}</td>
<td class="py-3 px-4 text-center">${a}</td>
<td class="py-3 px-4 text-center">${b}</td>
<td class="py-3 px-4 text-center">${c}</td>
</tr>`;

const yes = '<span aria-hidden="true" class="material-symbols-outlined text-secondary">check</span><span class="sr-only">Included</span>';
const no = '<span aria-hidden="true" class="material-symbols-outlined text-outline">remove</span><span class="sr-only">Not included</span>';

const main = `<main id="main" class="pt-[80px]">
<!-- Pricing hero -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-[128px] text-center">
<span class="inline-block bg-surface-container-low text-on-surface-variant font-label-md text-label-md px-3 py-1 rounded-full uppercase tracking-wider mb-stack-sm">Pricing</span>
<h1 class="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-stack-md max-w-3xl mx-auto">Clear packages. No surprises.</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Fixed-scope productized packages to get you moving fast, or a custom engagement when you need something bigger.</p>
</section>
<!-- Tiers -->
<section class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-[96px]">
<div class="grid md:grid-cols-3 gap-gutter items-stretch">
${tier('Launch', '$2,400', 'A focused landing or one-pager to get your idea live and converting.', ['Up to 3 sections', 'Responsive build', 'Basic SEO setup', 'Contact form', '1 round of revisions', '2-week delivery'], false)}
${tier('Growth', '$6,800', 'A full multi-page site with the interactive polish that sets you apart.', ['Up to 8 pages', 'Interactive effects', 'CMS-ready data', 'Analytics dashboard', '3 rounds of revisions', '30 days support'], true)}
${tier('Scale', 'Custom', 'Bespoke platforms, integrations, and ongoing partnership.', ['Unlimited pages', 'Custom backend & APIs', 'Dedicated team', 'Performance SLAs', 'Priority support', 'Monthly retainer'], false)}
</div>
<p class="text-center font-body-sm text-body-sm text-on-surface-variant mt-stack-lg">All prices are starting points. Final quotes are fixed after a short discovery call.</p>
</section>
<!-- Comparison table -->
<section class="px-margin-mobile md:px-margin-desktop py-[128px] bg-surface-container-lowest border-y border-outline-variant">
<div class="max-w-container-max mx-auto">
<h2 class="font-headline-xl text-headline-xl text-primary mb-stack-lg text-center">Compare packages</h2>
<div class="overflow-x-auto">
<table class="w-full min-w-[640px] text-left">
<thead>
<tr class="border-b border-outline-variant">
<th class="py-3 pr-4 font-label-md text-label-md text-on-surface-variant uppercase">Feature</th>
<th class="py-3 px-4 font-label-md text-label-md text-primary uppercase text-center">Launch</th>
<th class="py-3 px-4 font-label-md text-label-md text-secondary uppercase text-center">Growth</th>
<th class="py-3 px-4 font-label-md text-label-md text-primary uppercase text-center">Scale</th>
</tr>
</thead>
<tbody>
${compareRow('Pages', 'Up to 3', 'Up to 8', 'Unlimited')}
${compareRow('Interactive effects', no, yes, yes)}
${compareRow('Analytics dashboard', no, yes, yes)}
${compareRow('Custom backend &amp; APIs', no, no, yes)}
${compareRow('Revision rounds', '1', '3', 'Unlimited')}
${compareRow('Support window', '—', '30 days', 'Ongoing')}
${compareRow('Dedicated team', no, no, yes)}
</tbody>
</table>
</div>
</div>
</section>
<!-- Pricing FAQ -->
<section class="px-margin-mobile md:px-margin-desktop pb-[128px]">
<div class="max-w-3xl mx-auto">
<h2 class="font-headline-xl text-headline-xl text-primary mb-stack-lg text-center">Pricing questions</h2>
<div class="space-y-base" data-faq>
<div class="faq-item bg-surface-container-lowest border border-outline-variant rounded">
<button class="faq-q w-full flex items-center justify-between gap-4 p-stack-sm text-left font-headline-md text-headline-md text-primary"><span>Are these prices final?</span><span class="faq-icon material-symbols-outlined text-secondary" aria-hidden="true">expand_more</span></button>
<div class="faq-a"><p class="px-stack-sm pb-stack-sm font-body-md text-body-md text-on-surface-variant">They're starting points. After a short discovery call we send a fixed, itemized quote so there are no surprises.</p></div>
</div>
<div class="faq-item bg-surface-container-lowest border border-outline-variant rounded">
<button class="faq-q w-full flex items-center justify-between gap-4 p-stack-sm text-left font-headline-md text-headline-md text-primary"><span>What's your payment schedule?</span><span class="faq-icon material-symbols-outlined text-secondary" aria-hidden="true">expand_more</span></button>
<div class="faq-a"><p class="px-stack-sm pb-stack-sm font-body-md text-body-md text-on-surface-variant">Typically 50% to start and 50% on delivery. Larger engagements are split across milestones.</p></div>
</div>
<div class="faq-item bg-surface-container-lowest border border-outline-variant rounded">
<button class="faq-q w-full flex items-center justify-between gap-4 p-stack-sm text-left font-headline-md text-headline-md text-primary"><span>Do you offer retainers?</span><span class="faq-icon material-symbols-outlined text-secondary" aria-hidden="true">expand_more</span></button>
<div class="faq-a"><p class="px-stack-sm pb-stack-sm font-body-md text-body-md text-on-surface-variant">Yes. The Scale package includes a monthly retainer, and any project can roll into ongoing support after launch.</p></div>
</div>
</div>
</div>
</section>
<!-- CTA -->
<section class="px-margin-mobile md:px-margin-desktop py-[128px] bg-surface-container-lowest border-t border-outline-variant">
<div class="max-w-container-max mx-auto text-center">
<h2 class="font-headline-xl text-headline-xl text-primary mb-stack-md">Not sure which fits?</h2>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-stack-lg">Tell us what you're building and we'll recommend the right package — or design a custom one.</p>
<a class="bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded hover:bg-secondary transition-colors duration-200 ease-out uppercase inline-flex" href="about.html#contact">Talk to us</a>
</div>
</section>
</main>`;

const page = `${head}
${main}
${footer}
${scripts}
</body>
</html>
`;

fs.writeFileSync(path.join(PUBLIC, 'pricing.html'), page, 'utf8');
console.log('Generated public/pricing.html');
