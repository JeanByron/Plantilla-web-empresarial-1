// Applies brand.config.json across the project so you don't have to find-and-
// replace placeholders by hand before publishing.
//   node scripts/personalize.js          (apply)
//   node scripts/personalize.js --check   (report remaining placeholders only)
//
// Safe to re-run. It replaces placeholder strings with your real values; once
// applied, the old placeholders are gone, so re-running with the same config is
// a no-op. Edit brand.config.json and re-run to change any value.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'brand.config.json'), 'utf8'));
const CHECK = process.argv.includes('--check');

const strip = u => String(u).replace(/\/+$/, '');

// Placeholder → replacement. Order matters: more specific first.
const REPLACEMENTS = [
    // Domains (strip trailing slash to avoid doubling).
    { find: 'https://auradesign-studio.example.com', repl: strip(cfg.fullSiteDomain), scope: 'public' },
    { find: 'https://auradesign-light.example.com', repl: strip(cfg.lightSiteDomain), scope: 'light' },
    // CTA URLs (used in the light edition and listing).
    { find: 'https://your-gumroad.gumroad.com/l/auradesign-studio', repl: cfg.fullTemplateUrl, scope: 'all' },
    { find: 'https://your-agency-site.example.com', repl: cfg.agencyUrl, scope: 'all' },
    { find: 'https://auradesign-studio.example.com/#contact', repl: cfg.agencyUrl, scope: 'all' },
    // Social links.
    { find: 'https://www.linkedin.com/company/your-company', repl: cfg.social.linkedin, scope: 'all' },
    { find: 'https://dribbble.com/your-handle', repl: cfg.social.dribbble, scope: 'all' },
    // Contact email in docs/listing.
    { find: '[your email]', repl: cfg.contactEmail, scope: 'all' },
    // Demo contact details shown on the About page (and the map link address).
    { find: 'hello@auradesign.agency', repl: cfg.contactEmail, scope: 'public' },
    { find: '+44 (0) 20 7123 4567', repl: cfg.contactPhone, scope: 'public' },
    { find: '100 Structural Way<br/>London, LDN 10010<br/>United Kingdom', repl: cfg.contactAddress, scope: 'public' },
    { find: '100+Structural+Way,+London,+United+Kingdom', repl: encodeURIComponent(cfg.contactAddress).replace(/%20/g, '+'), scope: 'public' },
];

// Files to scan, grouped by scope.
function listFiles(dir, exts) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...listFiles(full, exts));
        else if (exts.some(e => entry.name.endsWith(e))) out.push(full);
    }
    return out;
}

const PUBLIC_FILES = listFiles(path.join(ROOT, 'public'), ['.html', '.xml', '.txt', '.js']);
const LIGHT_FILES = listFiles(path.join(ROOT, 'light'), ['.html', '.xml', '.txt', '.js', '.md', '.toml']);
const ROOT_FILES = [path.join(ROOT, 'marketing', 'GUMROAD-LISTING.md')];

function inScope(file, scope) {
    if (scope === 'all') return true;
    if (scope === 'public') return file.includes(path.join(ROOT, 'public'));
    if (scope === 'light') return file.includes(path.join(ROOT, 'light'));
    return false;
}

const targetFiles = [...new Set([...PUBLIC_FILES, ...LIGHT_FILES, ...ROOT_FILES])];
let totalReplaced = 0;
const remaining = [];

for (const file of targetFiles) {
    let text = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const r of REPLACEMENTS) {
        if (!inScope(file, r.scope)) continue;
        if (text.includes(r.find)) {
            const count = text.split(r.find).length - 1;
            if (!CHECK) { text = text.split(r.find).join(r.repl); changed = true; }
            totalReplaced += count;
        }
    }
    if (changed) fs.writeFileSync(file, text, 'utf8');
}

// package.json author + the Formspree endpoint in site-config.js.
if (!CHECK) {
    const pkgPath = path.join(ROOT, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    pkg.author = `${cfg.author.name} <${cfg.author.email}>`;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

    if (cfg.formspreeEndpoint) {
        const scPath = path.join(ROOT, 'public', 'js', 'site-config.js');
        let sc = fs.readFileSync(scPath, 'utf8');
        sc = sc.replace(/formEndpoint:\s*''/, `formEndpoint: '${cfg.formspreeEndpoint}'`);
        fs.writeFileSync(scPath, sc, 'utf8');
    }
}

// Report any placeholders still present anywhere.
const PLACEHOLDER_MARKERS = ['example.com', 'your-gumroad', 'your-agency', 'your-company', 'your-handle', 'Your Name', 'auradesign.agency', '+44 (0) 20 7123 4567', '100 Structural Way'];
for (const file of targetFiles.concat(path.join(ROOT, 'package.json'))) {
    const text = fs.readFileSync(file, 'utf8');
    for (const m of PLACEHOLDER_MARKERS) {
        if (text.includes(m)) { remaining.push(`${path.relative(ROOT, file)} → "${m}"`); }
    }
}

if (CHECK) {
    console.log(remaining.length ? 'Remaining placeholders:\n  ' + remaining.join('\n  ') : 'No placeholders found.');
} else {
    console.log(`Applied ${totalReplaced} replacement(s) across ${targetFiles.length} files + package.json.`);
    if (remaining.length) console.log(`Still containing placeholder markers (review):\n  ${remaining.join('\n  ')}`);
    else console.log('No placeholder markers remain.');
}
