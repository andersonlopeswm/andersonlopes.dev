import { FPS } from "./brand";
import type { ReelScene } from "./types";

const WORDS_PER_SECOND = 3.2;

function countWords(...texts: (string | undefined)[]): number {
  return texts.join(" ").split(/\s+/).filter(Boolean).length;
}

// Duração da cena: usa "seconds" se informado; senão estima pelo tempo de leitura.
export function sceneFrames(scene: ReelScene): number {
  if (scene.seconds) return Math.round(scene.seconds * FPS);
  const words =
    scene.kind === "hook" ? countWords(scene.text, scene.kicker)
    : scene.kind === "point" ? countWords(scene.title, scene.body)
    : scene.kind === "stat" ? countWords(scene.value, scene.label)
    : scene.kind === "quote" ? countWords(scene.text, scene.author)
    : countWords(scene.text, scene.keyword);
  const minimum = scene.kind === "hook" ? 2.2 : 2.5;
  return Math.round(Math.max(minimum, words / WORDS_PER_SECOND + 0.8) * FPS);
}

export function reelFrames(scenes: ReelScene[]): number {
  return Math.max(FPS, scenes.reduce((total, scene) => total + sceneFrames(scene), 0));
}
