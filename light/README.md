# AuraDesign Studio — Free Edition

A free, static taste of the [AuraDesign Studio](https://your-gumroad.gumroad.com/l/auradesign-studio) agency template:
the Home and Portfolio pages with the full interactive effects, no backend.

## This is a lead magnet — set your links first

This folder is **generated** by `scripts/build-light.js` in the full template
repo from the values in `brand.config.json`. Before publishing, fill those
values and regenerate:

1. Edit `brand.config.json` — `fullTemplateUrl` (your paid Gumroad page),
   `agencyUrl` (your agency / services site), and `lightSiteDomain` (where
   you host this free demo).
2. Run `node scripts/personalize.js` then `node scripts/build-light.js`.

(If you only have this `light/` folder, just find-and-replace the placeholder
URLs directly in these files.)

## Deploy

Drag this folder onto Netlify, or connect the repo and set the publish
directory to `light`. It's fully static — no build, no server.

## License

Free to use and deploy. The full template is sold under a commercial license.
