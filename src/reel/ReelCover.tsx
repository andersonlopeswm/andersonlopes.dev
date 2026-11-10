import React from "react";
import { AbsoluteFill } from "remotion";
import { brand } from "../brand";
import { Background } from "../components/Background";
import { Pill } from "../components/Pill";
import { RichText } from "../components/RichText";
import type { ReelProps } from "../types";

// Capa do Reel (1080x1920). O grid do perfil corta para 1080x1350 central,
// então todo o texto fica dentro dessa faixa.
export const ReelCover: React.FC<ReelProps> = ({ scenes, tag }) => {
  const hook = scenes.find((scene) => scene.kind === "hook");
  const text = hook && hook.kind === "hook" ? hook.text : "";
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ top: 285, height: 1350, padding: "120px 80px", justifyContent: "center" }}>
        {tag && (
          <div style={{ marginBottom: 40 }}>
            <Pill tone="danger" size={40}>{tag}</Pill>
          </div>
        )}
        <RichText
          text={text}
          marker
          style={{ fontFamily: brand.fonts.display, fontSize: 150, lineHeight: 1.1, textTransform: "uppercase", color: brand.colors.text }}
        />
        <div style={{ marginTop: 50, fontFamily: brand.fonts.body, fontWeight: 900, fontSize: 38, color: brand.colors.muted }}>
          {brand.handle}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
