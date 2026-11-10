import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, reelSafe } from "../brand";
import { Background } from "../components/Background";
import { Pill } from "../components/Pill";
import { sceneFrames } from "../timing";
import type { ReelProps, ReelScene } from "../types";
import { SceneView } from "./scenes";

const TRANSITION = 6;

// Entrada com "punch" (zoom + blur) e saída rápida: corte seco segura a retenção.
const SceneFrame: React.FC<{ scene: ReelScene; duration: number; assetBase?: string }> = ({
  scene,
  duration,
  assetBase,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, TRANSITION], [0, 1], { extrapolateRight: "clamp" });
  const exit = interpolate(frame, [duration - TRANSITION, duration], [1, 0], { extrapolateLeft: "clamp" });
  const isLast = scene.kind === "cta";
  return (
    <AbsoluteFill
      style={{
        paddingTop: reelSafe.top + 120,
        paddingBottom: reelSafe.bottom,
        paddingLeft: reelSafe.left,
        paddingRight: reelSafe.right,
        justifyContent: "center",
        opacity: Math.min(enter, isLast ? 1 : exit),
        transform: `scale(${1.08 - enter * 0.08})`,
        filter: `blur(${(1 - enter) * 12}px)`,
      }}
    >
      <SceneView scene={scene} assetBase={assetBase} />
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 12, background: `${brand.colors.border}AA` }}>
      <div style={{ width: `${(frame / durationInFrames) * 100}%`, height: "100%", background: brand.colors.accent }} />
    </div>
  );
};

const Header: React.FC<{ tag?: string }> = ({ tag }) => (
  <div
    style={{
      position: "absolute",
      top: reelSafe.top - 40,
      left: reelSafe.left,
      right: reelSafe.right,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div style={{ fontFamily: brand.fonts.body, fontWeight: 900, fontSize: 36, color: brand.colors.text }}>
      {brand.handle}
    </div>
    {tag && <Pill size={30}>{tag}</Pill>}
  </div>
);

export const Reel: React.FC<ReelProps> = ({ scenes, tag, source, voiceover, music, musicVolume = 0.12, assetBase }) => {
  let offset = 0;
  return (
    <AbsoluteFill>
      <Background />
      {scenes.map((scene, i) => {
        const duration = sceneFrames(scene);
        const from = offset;
        offset += duration;
        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <SceneFrame scene={scene} duration={duration} assetBase={assetBase} />
          </Sequence>
        );
      })}
      <Header tag={tag} />
      {source && (
        <div
          style={{
            position: "absolute",
            bottom: reelSafe.bottom - 70,
            left: reelSafe.left,
            fontFamily: brand.fonts.body,
            fontWeight: 600,
            fontSize: 28,
            color: brand.colors.muted,
          }}
        >
          Fonte: {source}
        </div>
      )}
      <ProgressBar />
      {voiceover && <Audio src={staticFile(`${assetBase ?? ""}${voiceover}`)} />}
      {music && <Audio src={staticFile(`${assetBase ?? ""}${music}`)} volume={musicVolume} />}
    </AbsoluteFill>
  );
};
