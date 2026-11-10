// Tipos dos roteiros. O Claude gera post.json seguindo estes formatos.
// Texto aceita *destaque* (cor de acento) e \n (quebra de linha).

export type ReelScene =
  | { kind: "hook"; text: string; kicker?: string; seconds?: number }
  | { kind: "point"; title: string; body?: string; number?: number; image?: string; seconds?: number }
  | { kind: "stat"; value: string; label: string; seconds?: number }
  | { kind: "quote"; text: string; author: string; seconds?: number }
  | { kind: "cta"; text: string; keyword?: string; seconds?: number };

export type ReelProps = {
  scenes: ReelScene[];
  tag?: string;
  source?: string;
  voiceover?: string;
  music?: string;
  musicVolume?: number;
  assetBase?: string;
};

export type CarouselSlide =
  | { kind: "cover"; title: string; kicker?: string; image?: string }
  | { kind: "content"; title: string; body?: string; number?: number; image?: string }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "stat"; value: string; label: string; body?: string }
  | { kind: "quote"; text: string; author: string }
  | { kind: "cta"; title: string; body?: string; keyword?: string };

export type CarouselProps = {
  slides: CarouselSlide[];
  index: number;
  tag?: string;
  source?: string;
  assetBase?: string;
};
