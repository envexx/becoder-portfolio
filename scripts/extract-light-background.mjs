import sharp from "sharp";

const [input, output] = process.argv.slice(2);
if (!input || !output) throw new Error("Usage: node scripts/extract-light-background.mjs <input> <output>");

const source = sharp(input).removeAlpha();
const { data, info } = await source.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const alpha = Buffer.alloc(width * height, 255);
const visited = new Uint8Array(width * height);
const queue = new Int32Array(width * height);
let head = 0;
let tail = 0;

const isBackground = (index) => {
  const offset = index * channels;
  const r = data[offset];
  const g = data[offset + 1];
  const b = data[offset + 2];
  return Math.min(r, g, b) >= 218 && Math.max(r, g, b) - Math.min(r, g, b) <= 12;
};

const enqueue = (index) => {
  if (visited[index] || !isBackground(index)) return;
  visited[index] = 1;
  queue[tail++] = index;
};

for (let x = 0; x < width; x++) {
  enqueue(x);
  enqueue((height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  enqueue(y * width);
  enqueue(y * width + width - 1);
}

while (head < tail) {
  const index = queue[head++];
  alpha[index] = 0;
  const x = index % width;
  const y = Math.floor(index / width);
  if (x > 0) enqueue(index - 1);
  if (x < width - 1) enqueue(index + 1);
  if (y > 0) enqueue(index - width);
  if (y < height - 1) enqueue(index + width);
}

await sharp(data, { raw: { width, height, channels } })
  .joinChannel(alpha, { raw: { width, height, channels: 1 } })
  .png({ compressionLevel: 9 })
  .toFile(output);
