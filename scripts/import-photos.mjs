// Import HD item photos into the site.
// usage: node scripts/import-photos.mjs <folder>
// Matches each image to a solution item by file name ("Premium Gift Hampers.jpg", "premium-gift-hampers.png",
// "Personalized merchandise.jpeg" all work), then writes public/images/solutions/<slug>.webp
// (1600px on the long side, quality 82) and <folder>/_contact-sheet.png to check the matches by eye.
// Files it cannot match are listed; rename them to the item name and run it again.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const inDir = process.argv[2] && path.resolve(process.argv[2]);
if (!inDir || !fs.existsSync(inDir)) {
  console.log("usage: node scripts/import-photos.mjs <folder with the photos>");
  process.exit(1);
}
const outDir = path.join(root, "public/images/solutions");

// Item names straight from content/solutions.ts, so the list never drifts from the site.
const src = fs.readFileSync(path.join(root, "content/solutions.ts"), "utf8");
const names = [...src.matchAll(/\{ name: "([^"]+)"/g)].map((m) => m[1]);
const slugOf = (s) =>
  s
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/personalized/g, "personalised")
    .replace(/merchendise/g, "merchandise")
    .replace(/occational/g, "occasional")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const known = new Map(names.map((n) => [slugOf(n), n]));
// Loose forms people actually type: singular/plural, without "products"
for (const [slug, n] of [...known]) {
  known.set(slug.replace(/s$/, ""), n);
  known.set(slug.replace(/-products?$/, ""), n);
}

const files = fs.readdirSync(inDir).filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f) && !f.startsWith("_"));
const done = [];
const unmatched = [];
for (const f of files) {
  const s = slugOf(f);
  const name = known.get(s) ?? known.get(s.replace(/s$/, ""));
  if (!name) {
    unmatched.push(f);
    continue;
  }
  const slug = slugOf(name);
  const info = await sharp(path.join(inDir, f))
    .rotate()
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, `${slug}.webp`));
  done.push({ slug, file: f, size: `${info.width}x${info.height}` });
  console.log(`${slug.padEnd(28)} <- ${f}  (${info.width}x${info.height}${Math.max(info.width, info.height) < 1200 ? ", SMALL" : ""})`);
}

if (done.length) {
  const T = 220;
  const cols = 6;
  const comps = [];
  for (const [i, d] of done.entries()) {
    const x = (i % cols) * T;
    const y = Math.floor(i / cols) * (T + 26);
    comps.push({ input: await sharp(path.join(outDir, `${d.slug}.webp`)).resize(T, T, { fit: "cover" }).toBuffer(), left: x, top: y });
    comps.push({
      input: Buffer.from(`<svg width="${T}" height="26"><text x="4" y="18" font-size="14" font-family="Arial">${d.slug}</text></svg>`),
      left: x,
      top: y + T,
    });
  }
  const rows = Math.ceil(done.length / cols);
  await sharp({ create: { width: cols * T, height: rows * (T + 26), channels: 3, background: "#ffffff" } })
    .composite(comps)
    .png()
    .toFile(path.join(inDir, "_contact-sheet.png"));
}

const missing = names.filter((n) => !done.some((d) => d.slug === slugOf(n)));
console.log(`\nimported ${done.length} of ${names.length} items`);
if (unmatched.length) console.log(`could not match: ${unmatched.join(", ")}`);
if (missing.length) console.log(`still using the old photo: ${missing.join(", ")}`);
if (done.length) console.log(`check the matches: ${path.join(inDir, "_contact-sheet.png")}`);
