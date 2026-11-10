import { loadFont as loadDisplay } from "@remotion/google-fonts/Anton";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";

const display = loadDisplay("normal", { weights: ["400"], subsets: ["latin", "latin-ext"] });
const body = loadBody("normal", {
  weights: ["400", "600", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

// Identidade do canal. Trocar nome/@ aqui reflete em todos os templates.
export const brand = {
  name: "SEU CANAL",
  handle: "@seucanal",
  colors: {
    bg: "#07070C",
    surface: "#12121C",
    border: "#262636",
    text: "#F5F5FA",
    muted: "#9A9AB0",
    accent: "#B6FF3B",
    accentInk: "#07070C",
    secondary: "#7C5CFF",
    danger: "#FF3B5C",
  },
  fonts: {
    display: display.fontFamily,
    body: body.fontFamily,
  },
} as const;

// Área segura do Reel: a interface do Instagram cobre topo, base e lateral direita.
export const reelSafe = { top: 250, bottom: 480, left: 80, right: 140 } as const;

export const FPS = 30;
