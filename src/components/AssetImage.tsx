import React from "react";
import { Img, staticFile } from "remotion";
import { brand } from "../brand";

// Imagem do post (print, logo, foto) com moldura arredondada.
export const AssetImage: React.FC<{ src: string; assetBase?: string; height: number; zoom?: number }> = ({
  src,
  assetBase = "",
  height,
  zoom = 1,
}) => {
  const url = /^https?:\/\//.test(src) ? src : staticFile(`${assetBase}${src}`);
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: 36,
        overflow: "hidden",
        border: `3px solid ${brand.colors.border}`,
        boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
      }}
    >
      <Img src={url} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }} />
    </div>
  );
};
