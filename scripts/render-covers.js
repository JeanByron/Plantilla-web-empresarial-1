// Rasterizes the marketing cover SVGs to PNG at marketplace sizes.
//   node scripts/render-covers.js
// Requires the devDependency `sharp`. Outputs to marketing/covers/*.png and a
// square thumbnail. SVGs are authored at 1280x720; rendered at 2x for retina.
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const COVERS = path.join(__dirname, '..', 'marketing', 'covers');
const DENSITY = 144; // ~2x of the 72dpi viewBox => 2560x1440

const svgs = fs.readdirSync(COVERS).filter(f => f.endsWith('.svg')).sort();

async function run() {
    for (const svg of svgs) {
        const out = path.join(COVERS, svg.replace(/\.svg$/, '.png'));
        const info = await sharp(path.join(COVERS, svg), { density: DENSITY }).png().toFile(out);
        console.log(`${svg} -> ${path.basename(out)}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`);
    }

    // Square 80x80 thumbnail (ThemeForest spec) derived from the hero cover's
    // top-left brand area, plus a 460x460 social square.
    const hero = path.join(COVERS, 'cover-1-hero.svg');
    await sharp(hero, { density: 144 })
        .resize(80, 80, { fit: 'cover', position: 'left top' })
        .png()
        .toFile(path.join(COVERS, 'thumbnail-80.png'));
    console.log('cover-1-hero.svg -> thumbnail-80.png  80x80');
}

run().catch(e => { console.error(e.message); process.exit(1); });
