import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";
import { AssetImage } from "../components/AssetImage";
import { Pill } from "../components/Pill";
import { RichText } from "../components/RichText";
import type { ReelScene } from "../types";

const displayTitle: React.CSSProperties = {
  fontFamily: brand.fonts.display,
  color: brand.colors.text,
  textTransform: "uppercase",
  lineHeight: 1.1,
  letterSpacing: 1,
};

const bodyText: React.CSSProperties = {
  fontFamily: brand.fonts.body,
  color: brand.colors.muted,
  fontWeight: 600,
  fontSize: 50,
  lineHeight: 1.3,
};

function usePop(delay = 0) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping: 12, mass: 0.7 } });
}

const HookScene: React.FC<{ scene: Extract<ReelScene, { kind: "hook" }> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const kicker = usePop(0);
  const zoom = interpolate(frame, [0, 90], [1, 1.06], { extrapolateRight: "clamp" });
  return (
    <div style={{ transform: `scale(${zoom})` }}>
      {scene.kicker && (
        <div style={{ transform: `scale(${kicker})`, transformOrigin: "left center", marginBottom: 40 }}>
          <Pill tone="danger" size={40}>{scene.kicker}</Pill>
        </div>
      )}
      <RichText text={scene.text} animateFrom={4} stagger={3} marker style={{ ...displayTitle, fontSize: 138 }} />
    </div>
  );
};

const PointScene: React.FC<{ scene: Extract<ReelScene, { kind: "point" }>; assetBase?: string }> = ({
  scene,
  assetBase,
}) => {
  const frame = useCurrentFrame();
  const badge = usePop(0);
  const bodyIn = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(frame, [0, 150], [1.05, 1.15], { extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      {scene.number !== undefined && (
        <div
          style={{
            ...displayTitle,
            fontSize: 120,
            color: brand.colors.accent,
            transform: `scale(${badge})`,
            transformOrigin: "left center",
          }}
        >
          {String(scene.number).padStart(2, "0")}
        </div>
      )}
      <RichText text={scene.title} animateFrom={3} stagger={2} style={{ ...displayTitle, fontSize: 104 }} />
      {scene.body && (
        <RichText
          text={scene.body}
          style={{ ...bodyText, opacity: bodyIn, transform: `translateY(${(1 - bodyIn) * 30}px)` }}
        />
      )}
      {scene.image && (
        <div style={{ opacity: bodyIn }}>
          <AssetImage src={scene.image} assetBase={assetBase} height={520} zoom={zoom} />
        </div>
      )}
    </div>
  );
};

// Faz contagem animada quando o valor é um inteiro simples ("87%", "+3000", "R$ 20").
function countUp(value: string, progress: number): string {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return value;
  const current = Math.round(Number(match[2]) * progress);
  return `${match[1]}${current.toLocaleString("pt-BR")}${match[3]}`;
}

const StatScene: React.FC<{ scene: Extract<ReelScene, { kind: "stat" }> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const pop = usePop(0);
  const count = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp", easing: (t) => 1 - (1 - t) ** 3 });
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          ...displayTitle,
          fontSize: 260,
          color: brand.colors.accent,
          transform: `scale(${0.6 + pop * 0.4})`,
          textShadow: `0 0 80px ${brand.colors.accent}66`,
        }}
      >
        {countUp(scene.value, count)}
      </div>
      <RichText text={scene.label} animateFrom={12} stagger={2} style={{ ...displayTitle, fontSize: 84, marginTop: 20 }} />
    </div>
  );
};

const QuoteScene: React.FC<{ scene: Extract<ReelScene, { kind: "quote" }> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const authorIn = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div>
      <div style={{ ...displayTitle, fontSize: 260, color: brand.colors.accent, lineHeight: 0.6, height: 140 }}>“</div>
      <RichText
        text={scene.text}
        animateFrom={2}
        stagger={2}
        style={{ fontFamily: brand.fonts.body, fontWeight: 800, fontSize: 72, lineHeight: 1.22, color: brand.colors.text }}
      />
      <div style={{ ...bodyText, marginTop: 40, opacity: authorIn, color: brand.colors.accent, fontWeight: 800 }}>
        — {scene.author}
      </div>
    </div>
  );
};

const CtaScene: React.FC<{ scene: Extract<ReelScene, { kind: "cta" }> }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + Math.sin(frame / 5) * 0.04;
  const buttons = usePop(12);
  return (
    <div style={{ textAlign: "center" }}>
      <RichText text={scene.text} animateFrom={0} stagger={3} marker style={{ ...displayTitle, fontSize: 112 }} />
      {scene.keyword ? (
        <div style={{ marginTop: 60, transform: `scale(${buttons * pulse})` }}>
          <Pill size={52}>Comenta “{scene.keyword}”</Pill>
        </div>
      ) : (
        <div style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 24, transform: `scale(${buttons})` }}>
          <Pill size={40}>Segue</Pill>
          <Pill tone="ghost" size={40}>Salva</Pill>
          <Pill tone="ghost" size={40}>Envia</Pill>
        </div>
      )}
    </div>
  );
};

export const SceneView: React.FC<{ scene: ReelScene; assetBase?: string }> = ({ scene, assetBase }) => {
  switch (scene.kind) {
    case "hook":
      return <HookScene scene={scene} />;
    case "point":
      return <PointScene scene={scene} assetBase={assetBase} />;
    case "stat":
      return <StatScene scene={scene} />;
    case "quote":
      return <QuoteScene scene={scene} />;
    case "cta":
      return <CtaScene scene={scene} />;
  }
};
