// Import redrawn client logos (PNG, any padding) into the site.
// usage: node scripts/import-logos.mjs [inDir]   (default: ../Resources/logos)
// For each <slug>.png whose slug is in content/clients.ts:
//   trims the margin (transparent or white), caps the size for ~3x screens, then writes
//   public/clients/<slug>.webp       original colours on white (shown on the white hover tile)
//   public/clients/<slug>-mask.webp  luminance mask (ink = white on black), tinted grey in CSS for the idle state
// and updates w/h in content/clients.ts and public/clients/_meta.json (used for optical sizing).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const inDir = path.resolve(root, process.argv[2] || "../Resources/logos");
const outDir = path.join(root, "public/clients");
const MAX_H = 200; // display max is ~62px tall: ~3x
const MAX_W = 500; // display max is ~164px wide: ~3x

const clientsPath = path.join(root, "content/clients.ts");
let clientsSrc = fs.readFileSync(clientsPath, "utf8");
const slugs = new Set([...clientsSrc.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]));
const metaPath = path.join(outDir, "_meta.json");
const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));

const files = fs.existsSync(inDir) ? fs.readdirSync(inDir).filter((f) => /\.png$/i.test(f)) : [];
if (!files.length) {
  console.log(`no PNGs in ${inDir}`);
  process.exit(0);
}

for (const file of files) {
  const slug = file.replace(/\.png$/i, "");
  if (!slugs.has(slug)) {
    console.log(`SKIP ${file}: no client with slug "${slug}" in content/clients.ts`);
    continue;
  }
  // Composite on white first, so transparent and white-background files are treated the same.
  const { data, info } = await sharp(path.join(inDir, file))
    .flatten({ background: "#ffffff" })
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;
  const ink = (k) => Math.max(255 - data[k], 255 - data[k + 1], 255 - data[k + 2]) / 255;

  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (ink((y * w + x) * ch) > 0.1) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  if (x1 < 0) {
    console.log(`SKIP ${file}: no visible logo`);
    continue;
  }
  const pad = 2;
  x0 = Math.max(0, x0 - pad);
  y0 = Math.max(0, y0 - pad);
  x1 = Math.min(w - 1, x1 + pad);
  y1 = Math.min(h - 1, y1 + pad);
  const cw = x1 - x0 + 1;
  const chh = y1 - y0 + 1;
  const scale = Math.min(1, MAX_H / chh, MAX_W / cw);
  const ow = Math.round(cw * scale);
  const oh = Math.round(chh * scale);

  const trimmed = sharp(path.join(inDir, file))
    .flatten({ background: "#ffffff" })
    .extract({ left: x0, top: y0, width: cw, height: chh })
    .resize(ow, oh, { kernel: "lanczos3" });
  await trimmed.clone().webp({ quality: 86 }).toFile(path.join(outDir, `${slug}.webp`));

  // Luminance mask: intensity = distance from white, slightly boosted so thin strokes stay visible.
  const { data: px } = await trimmed.clone().raw().toBuffer({ resolveWithObject: true });
  const mask = Buffer.alloc(ow * oh);
  for (let i = 0, k = 0; i < mask.length; i++, k += 3)
    mask[i] = Math.round(Math.min(1, (Math.max(255 - px[k], 255 - px[k + 1], 255 - px[k + 2]) / 255) * 1.15) * 255);
  await sharp(mask, { raw: { width: ow, height: oh, channels: 1 } })
    .webp({ quality: 86 })
    .toFile(path.join(outDir, `${slug}-mask.webp`));

  clientsSrc = clientsSrc.replace(
    new RegExp(`(\\{ slug: "${slug}", name: "[^"]*", )w: \\d+, h: \\d+( \\})`),
    `$1w: ${ow}, h: ${oh}$2`,
  );
  const m = meta.find((e) => e.slug === slug);
  const entry = { slug, w: ow, h: oh, srcPx: `${cw}x${chh}` };
  if (m) Object.assign(m, entry);
  else meta.push(entry);
  console.log(`${slug.padEnd(24)} ${ow}x${oh}  (trimmed from ${cw}x${chh})${chh < 120 ? "  still small" : ""}`);
}

fs.writeFileSync(clientsPath, clientsSrc);
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 1));
console.log("done: content/clients.ts and public/clients/_meta.json updated");
