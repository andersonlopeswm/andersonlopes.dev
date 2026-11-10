// Renderiza um post de content/<slug>/ para output/<slug>/.
// Uso: npm run render -- content/2026-11-10-exemplo
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const postDir = path.resolve(process.argv[2] ?? "");
const postFile = path.join(postDir, "post.json");

if (!process.argv[2] || !fs.existsSync(postFile)) {
  console.error("Uso: npm run render -- content/<slug>  (precisa existir content/<slug>/post.json)");
  process.exit(1);
}

const slug = path.basename(postDir);
const post = JSON.parse(fs.readFileSync(postFile, "utf8"));
const outDir = path.join(root, "output", slug);
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// Assets do post (prints, logos, áudio) vão para public/posts/<slug>/ para o Remotion enxergar.
const assetsDir = path.join(postDir, "assets");
const publicAssets = path.join(root, "public", "posts", slug);
fs.rmSync(publicAssets, { recursive: true, force: true });
if (fs.existsSync(assetsDir)) fs.cpSync(assetsDir, publicAssets, { recursive: true });
const inputProps = { ...post.props, assetBase: `posts/${slug}/` };

console.log("Empacotando projeto...");
const serveUrl = await bundle({ entryPoint: path.join(root, "src/index.ts") });

async function still(id, props, output) {
  const composition = await selectComposition({ serveUrl, id, inputProps: props });
  await renderStill({ serveUrl, composition, inputProps: props, output, imageFormat: "png" });
}

// Folha de conferência: miniaturas lado a lado para revisar tudo numa imagem só.
function contactSheet(args, output) {
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...args, "-frames:v", "1", output]);
}

if (post.type === "reel") {
  const composition = await selectComposition({ serveUrl, id: "Reel", inputProps });
  const video = path.join(outDir, "reel.mp4");
  console.log(`Renderizando Reel (${(composition.durationInFrames / composition.fps).toFixed(1)}s)...`);
  await renderMedia({
    serveUrl,
    composition,
    inputProps,
    codec: "h264",
    crf: 18,
    outputLocation: video,
    onProgress: ({ progress }) => process.stdout.write(`\r  ${Math.round(progress * 100)}%`),
  });
  process.stdout.write("\n");
  await still("ReelCover", inputProps, path.join(outDir, "cover.png"));
  contactSheet(["-i", video, "-vf", "fps=1,scale=216:-1,tile=8x5:padding=6:color=white"], path.join(outDir, "qa-sheet.jpg"));
} else if (post.type === "carousel") {
  const total = inputProps.slides.length;
  for (let index = 0; index < total; index++) {
    const name = `slide-${String(index + 1).padStart(2, "0")}.png`;
    console.log(`Renderizando ${name}...`);
    await still("CarouselSlide", { ...inputProps, index }, path.join(outDir, name));
  }
  contactSheet(
    ["-pattern_type", "glob", "-i", path.join(outDir, "slide-*.png"), "-vf", `scale=360:-1,tile=${Math.min(total, 5)}x${Math.ceil(total / 5)}:padding=6:color=white`],
    path.join(outDir, "qa-sheet.jpg"),
  );
} else {
  console.error(`Tipo desconhecido: ${post.type} (use "reel" ou "carousel")`);
  process.exit(1);
}

for (const file of ["caption.txt", "script.md"]) {
  const source = path.join(postDir, file);
  if (fs.existsSync(source)) fs.copyFileSync(source, path.join(outDir, file));
}

console.log(`Pronto: ${path.relative(root, outDir)}/`);
