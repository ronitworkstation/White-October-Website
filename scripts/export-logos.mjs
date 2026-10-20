// Export the current client logos as PNGs so Aziz can redraw/upscale them.
// usage: node scripts/export-logos.mjs [outDir]   (default: ../Resources/logos-current)
// Reads the colour files (public/clients/<slug>.webp), never the -mask files.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const out = path.resolve(root, process.argv[2] || "../Resources/logos-current");
fs.mkdirSync(out, { recursive: true });

const src = fs.readFileSync(path.join(root, "content/clients.ts"), "utf8");
const clients = [...src.matchAll(/\{ slug: "([^"]+)", name: "([^"]*)", w: (\d+), h: (\d+) \}/g)].map((m) => ({
  slug: m[1],
  name: m[2],
  w: +m[3],
  h: +m[4],
}));

const meta = JSON.parse(fs.readFileSync(path.join(root, "public/clients/_meta.json"), "utf8"));
const srcPx = Object.fromEntries(meta.map((m) => [m.slug, m.srcPx]));

const unnamed = [];
const lowRes = [];
for (const c of clients) {
  await sharp(path.join(root, "public/clients", `${c.slug}.webp`)).png().toFile(path.join(out, `${c.slug}.png`));
  if (!c.name) unnamed.push(c.slug);
  const [, h] = (srcPx[c.slug] || `${c.w}x${c.h}`).split("x").map(Number);
  if (h < 60) lowRes.push(`${c.slug}${c.name ? ` (${c.name})` : ""}: ${srcPx[c.slug] || `${c.w}x${c.h}`} px`);
}

const readme = `White October client logos (current versions, exported ${new Date().toISOString().slice(0, 10)})
${clients.length} files, named by the slug the website uses. Keep the same file names when you send them back.

SEND BACK TO: Website/Resources/logos/   (then run: node scripts/import-logos.mjs)

SPEC FOR EACH NEW FILE
- PNG with a transparent background, in the logo's original colours.
- Canvas 1200 x 600 px. Centre the logo and scale it until it touches either
  1000 px wide or 400 px tall, whichever comes first.
- Logo only: no tagline, no white box behind it, no drop shadow.
- Exact padding does not matter: the site trims it and balances every logo optically.

NEED A NAME (used for screen-reader labels; ${unnamed.length} unnamed + 1 to confirm)
- client-f: blue stylised "F" (profile grid row 3, col 5)
- client-pica: round emblem with "PICA"-style letters (row 3, col 10)
- client-crest: small college crest (row 4, col 5)
- delhi-public-school: green crest, "Service before self". Confirm it is DPS (which branch?)

LOW RESOLUTION IN THE PROFILE (replace first)
${lowRes.map((s) => `- ${s}`).join("\n")}

ALL FILES
${clients.map((c) => `- ${c.slug}.png  ${c.name || "(unnamed)"}`).join("\n")}
`;
fs.writeFileSync(path.join(out, "README.txt"), readme);
console.log(`exported ${clients.length} logos to ${out}`);
console.log(`unnamed: ${unnamed.length}, low-res: ${lowRes.length}`);
