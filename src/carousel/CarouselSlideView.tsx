import React from "react";
import { AbsoluteFill } from "remotion";
import { brand } from "../brand";
import { AssetImage } from "../components/AssetImage";
import { Background } from "../components/Background";
import { Pill } from "../components/Pill";
import { RichText } from "../components/RichText";
import type { CarouselProps, CarouselSlide } from "../types";

const title: React.CSSProperties = {
  fontFamily: brand.fonts.display,
  textTransform: "uppercase",
  color: brand.colors.text,
  lineHeight: 1.1,
  letterSpacing: 1,
};

const body: React.CSSProperties = {
  fontFamily: brand.fonts.body,
  fontWeight: 600,
  fontSize: 44,
  lineHeight: 1.35,
  color: brand.colors.muted,
};

const SlideContent: React.FC<{ slide: CarouselSlide; assetBase?: string }> = ({ slide, assetBase }) => {
  switch (slide.kind) {
    case "cover":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {slide.kicker && <div><Pill tone="danger" size={36}>{slide.kicker}</Pill></div>}
          <RichText text={slide.title} marker style={{ ...title, fontSize: slide.image ? 110 : 140 }} />
          {slide.image && <AssetImage src={slide.image} assetBase={assetBase} height={440} />}
        </div>
      );
    case "content":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {slide.number !== undefined && (
            <div style={{ ...title, fontSize: 110, color: brand.colors.accent }}>{String(slide.number).padStart(2, "0")}</div>
          )}
          <RichText text={slide.title} style={{ ...title, fontSize: 92 }} />
          {slide.body && <RichText text={slide.body} style={body} />}
          {slide.image && <AssetImage src={slide.image} assetBase={assetBase} height={420} />}
        </div>
      );
    case "list":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <RichText text={slide.title} style={{ ...title, fontSize: 88 }} />
          {slide.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
              <div
                style={{
                  flexShrink: 0,
                  width: 64,
                  height: 64,
                  borderRadius: 18,
                  background: brand.colors.accent,
                  color: brand.colors.accentInk,
                  fontFamily: brand.fonts.display,
                  fontSize: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <RichText text={item} style={{ ...body, color: brand.colors.text, fontSize: 46, paddingTop: 4 }} />
            </div>
          ))}
        </div>
      );
    case "stat":
      return (
        <div style={{ textAlign: "center" }}>
          <div style={{ ...title, fontSize: 280, color: brand.colors.accent, textShadow: `0 0 80px ${brand.colors.accent}55` }}>
            {slide.value}
          </div>
          <RichText text={slide.label} style={{ ...title, fontSize: 80 }} />
          {slide.body && <RichText text={slide.body} style={{ ...body, marginTop: 30 }} />}
        </div>
      );
    case "quote":
      return (
        <div>
          <div style={{ ...title, fontSize: 240, color: brand.colors.accent, lineHeight: 0.6, height: 130 }}>“</div>
          <RichText text={slide.text} style={{ fontFamily: brand.fonts.body, fontWeight: 800, fontSize: 64, lineHeight: 1.25, color: brand.colors.text }} />
          <div style={{ ...body, marginTop: 36, color: brand.colors.accent, fontWeight: 800 }}>— {slide.author}</div>
        </div>
      );
    case "cta":
      return (
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
          <RichText text={slide.title} marker style={{ ...title, fontSize: 116 }} />
          {slide.body && <RichText text={slide.body} style={body} />}
          {slide.keyword ? (
            <Pill size={46}>Comenta “{slide.keyword}”</Pill>
          ) : (
            <div style={{ display: "flex", gap: 22 }}>
              <Pill size={36}>Segue</Pill>
              <Pill tone="ghost" size={36}>Salva</Pill>
              <Pill tone="ghost" size={36}>Envia</Pill>
            </div>
          )}
          <div style={{ fontFamily: brand.fonts.body, fontWeight: 900, fontSize: 44, color: brand.colors.text }}>{brand.handle}</div>
        </div>
      );
  }
};

// Slide 1080x1350 (4:5 ocupa mais tela no feed). Rodapé com @, fonte e "arrasta".
export const CarouselSlideView: React.FC<CarouselProps> = ({ slides, index, tag, source, assetBase }) => {
  const slide = slides[index];
  if (!slide) return null;
  const isLast = index === slides.length - 1;
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ padding: "150px 90px 170px", justifyContent: "center" }}>
        <SlideContent slide={slide} assetBase={assetBase} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 60, left: 90, right: 90, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: brand.fonts.body, fontWeight: 900, fontSize: 32, color: brand.colors.text }}>{brand.handle}</div>
        {tag && <Pill size={26}>{tag}</Pill>}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 90,
          right: 90,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: brand.fonts.body,
          fontWeight: 700,
          fontSize: 28,
          color: brand.colors.muted,
        }}
      >
        <span>{source && index === 0 ? `Fonte: ${source}` : `${index + 1}/${slides.length}`}</span>
        {!isLast && <span style={{ color: brand.colors.accent, fontWeight: 900, fontSize: 32 }}>ARRASTA →</span>}
      </div>
    </AbsoluteFill>
  );
};
