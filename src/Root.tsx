import React from "react";
import { Composition } from "remotion";
import { RecruitingVideo } from "./RecruitingVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="RecruitingVideo"
      component={RecruitingVideo}
      durationInFrames={960}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
