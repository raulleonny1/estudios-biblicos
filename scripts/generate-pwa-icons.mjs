import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const sourceLogo = path.join(publicDir, "logo-iere.png");

const background = "#ffffff";

async function buildSquareIcon(size, logoScale, outputName) {
  const logoSize = Math.round(size * logoScale);
  const offset = Math.round((size - logoSize) / 2);

  const resizedLogo = await sharp(sourceLogo)
    .resize(logoSize, logoSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: resizedLogo, left: offset, top: offset }])
    .png()
    .toFile(path.join(publicDir, outputName));
}

async function main() {
  await mkdir(publicDir, { recursive: true });
  await buildSquareIcon(512, 0.72, "icon-512.png");
  await buildSquareIcon(192, 0.72, "icon-192.png");
  await buildSquareIcon(512, 0.58, "icon-maskable-512.png");

  await writeFile(
    path.join(publicDir, "apple-touch-icon.png"),
    await sharp(path.join(publicDir, "icon-192.png")).png().toBuffer()
  );

  console.log("Iconos PWA generados en public/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
