import React from "react";
import { Composition, Still } from "remotion";
import { FPS } from "./brand";
import { CarouselSlideView } from "./carousel/CarouselSlideView";
import { Reel } from "./reel/Reel";
import { ReelCover } from "./reel/ReelCover";
import { sampleCarousel, sampleReel } from "./samples";
import { reelFrames } from "./timing";

export const Root: React.FC = () => (
  <>
    <Composition
      id="Reel"
      component={Reel}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={reelFrames(sampleReel.scenes)}
      defaultProps={sampleReel}
      calculateMetadata={({ props }) => ({ durationInFrames: reelFrames(props.scenes) })}
    />
    <Still id="ReelCover" component={ReelCover} width={1080} height={1920} defaultProps={sampleReel} />
    <Still id="CarouselSlide" component={CarouselSlideView} width={1080} height={1350} defaultProps={sampleCarousel} />
  </>
);
