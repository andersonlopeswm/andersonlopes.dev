import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { brand } from "../brand";

// Fundo escuro com brilhos em movimento lento e grade sutil (estética "tech").
export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 120;
  return (
    <AbsoluteFill style={{ background: brand.colors.bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          left: -350 + drift,
          top: -300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.secondary}55 0%, transparent 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          right: -380 - drift,
          bottom: -260,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${brand.colors.accent}30 0%, transparent 65%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${brand.colors.border}55 1px, transparent 1px), linear-gradient(90deg, ${brand.colors.border}55 1px, transparent 1px)`,
          backgroundSize: "90px 90px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </AbsoluteFill>
  );
};
