import React from "react";
import { brand } from "../brand";

export const Pill: React.FC<{ children: React.ReactNode; tone?: "accent" | "danger" | "ghost"; size?: number }> = ({
  children,
  tone = "accent",
  size = 34,
}) => {
  const palette = {
    accent: { background: brand.colors.accent, color: brand.colors.accentInk, border: "none" },
    danger: { background: brand.colors.danger, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: brand.colors.text, border: `3px solid ${brand.colors.border}` },
  }[tone];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: `${size * 0.35}px ${size * 0.8}px`,
        borderRadius: 999,
        fontFamily: brand.fonts.body,
        fontWeight: 900,
        fontSize: size,
        letterSpacing: 1,
        textTransform: "uppercase",
        ...palette,
      }}
    >
      {children}
    </div>
  );
};
