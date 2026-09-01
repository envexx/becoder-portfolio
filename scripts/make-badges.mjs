import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "badges") + path.sep;

// 1. Hypercerts: render SVG lalu crop mark di sisi kiri (persegi)
const svgBuf = await sharp(dir + "hypercerts-logo.svg", { density: 300 })
  .resize({ width: 800 })
  .png()
  .toBuffer();
const meta = await sharp(svgBuf).metadata();
console.log("hypercerts rendered:", meta.width, "x", meta.height);
const side = Math.min(meta.width, meta.height);
await sharp(svgBuf)
  .extract({ left: 0, top: 0, width: side, height: side })
  .resize(96, 96)
  .png()
  .toFile(dir + "badge-hypercerts.png");
console.log("badge-hypercerts.png OK");

// 2. Aura: 96x96 sudah pas
await sharp(dir + "aura-favicon.png").png().toFile(dir + "badge-aura.png");
console.log("badge-aura.png OK");

// 3. Tether: 76x76 -> 96x96
await sharp(dir + "tether.png").resize(96, 96).png().toFile(dir + "badge-tether.png");
console.log("badge-tether.png OK");

for (const f of await readdir(dir)) console.log(f);
