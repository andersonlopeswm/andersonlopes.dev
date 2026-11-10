import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";

type Token = { word: string; accent: boolean; tight?: boolean } | { lineBreak: true };

const LEADING_PUNCTUATION = /^[,.;:!?)…%]/;

// Converte "texto com *destaque*\nnova linha" em tokens por palavra.
// Com marcador, o trecho destacado vira um bloco único (uma caixa só).
function tokenize(text: string, groupAccent: boolean): Token[] {
  const tokens: Token[] = [];
  text.split(/(\*[^*]+\*)/).forEach((chunk) => {
    const accent = chunk.startsWith("*") && chunk.endsWith("*") && chunk.length > 2;
    const clean = accent ? chunk.slice(1, -1) : chunk;
    if (accent && groupAccent) {
      tokens.push({ word: clean.trim(), accent });
      return;
    }
    clean.split(/(\n)/).forEach((part) => {
      if (part === "\n") {
        tokens.push({ lineBreak: true });
        return;
      }
      part.split(/\s+/).filter(Boolean).forEach((word) => tokens.push({ word, accent }));
    });
  });
  // Sem espaço antes de pontuação: "melhor*, vai" não vira "melhor , vai".
  tokens.forEach((token, i) => {
    const next = tokens[i + 1];
    if ("word" in token && next && "word" in next && LEADING_PUNCTUATION.test(next.word)) token.tight = true;
  });
  return tokens;
}

type Props = {
  text: string;
  style?: React.CSSProperties;
  // Frame (relativo à cena) em que a primeira palavra entra; omitido = sem animação.
  animateFrom?: number;
  stagger?: number;
  accentColor?: string;
  marker?: boolean;
};

export const RichText: React.FC<Props> = ({
  text,
  style,
  animateFrom,
  stagger = 3,
  accentColor = brand.colors.accent,
  marker = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let wordIndex = 0;

  return (
    <div style={style}>
      {tokenize(text, marker).map((token, i) => {
        if ("lineBreak" in token) return <br key={i} />;
        const index = wordIndex++;
        const progress =
          animateFrom === undefined
            ? 1
            : spring({ frame: frame - animateFrom - index * stagger, fps, config: { damping: 14, mass: 0.6 } });
        const accentStyle: React.CSSProperties = token.accent
          ? marker
            ? { background: accentColor, color: brand.colors.accentInk, padding: "0 0.12em", borderRadius: 8 }
            : { color: accentColor }
          : {};
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              marginRight: token.tight ? 0 : "0.24em",
              marginBottom: marker && token.accent ? "0.06em" : 0,
              opacity: progress,
              transform: `translateY(${(1 - progress) * 40}px) scale(${0.85 + progress * 0.15})`,
              ...accentStyle,
            }}
          >
            {token.word}
          </span>
        );
      })}
    </div>
  );
};
