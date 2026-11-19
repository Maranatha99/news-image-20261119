import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1048576;
const EXPECTED_WIDTH = 1024;
const EXPECTED_HEIGHT = 1024;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function main(): void {
  const here = dirname(fileURLToPath(import.meta.url));
  const source = join(here, "entry.png");
  if (!existsSync(source)) fail(`entry image not found: ${source}`);

  const bytes = readFileSync(source);
  if (bytes.length > MAX_BYTES) {
    fail(`entry image is ${bytes.length} bytes, over the 1 MiB limit`);
  }

  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (bytes.length < 8 || !bytes.subarray(0, 8).equals(signature)) {
    fail("entry image is not a PNG (bad signature)");
  }

  // First chunk must be IHDR, 13 bytes of data: width, height, bit depth, color type.
  if (bytes.length < 33) fail("entry image is too short to hold an IHDR chunk");
  const chunkType = bytes.subarray(12, 16).toString("latin1");
  if (chunkType !== "IHDR") fail(`first PNG chunk is ${chunkType}, expected IHDR`);
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  const bitDepth = bytes[24];
  const colorType = bytes[25];
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    fail(`entry image is ${width}x${height}, expected 1024x1024`);
  }
  if (bitDepth !== 8 || colorType !== 2) {
    fail(`entry image is ${bitDepth}-bit color type ${colorType}, expected 8-bit RGB`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.png");
  writeFileSync(target, bytes);

  // Read the copy back and confirm it matches byte for byte.
  const written = readFileSync(target);
  if (!written.equals(bytes)) fail("written entry.png differs from the source");
  if (written.length !== bytes.length) {
    fail(`written entry.png is ${written.length} bytes, expected ${bytes.length}`);
  }

  const digest = createHash("sha256").update(bytes).digest("hex");
  console.log(
    `Wrote ${target} (${bytes.length} bytes, ${width}x${height}, 8-bit color 2, sha256 ${digest}) from ${source} (${bytes.length} bytes)`
  );
}

main();
