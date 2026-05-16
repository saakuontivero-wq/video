import React, { useEffect, useState } from "react";
import { Composition, continueRender, delayRender, staticFile } from "remotion";
import { RecruitingVideo } from "./RecruitingVideo";

const FontLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [handle] = useState(() => delayRender("Loading Inter font"));

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        src: url('${staticFile("fonts/inter-300.ttf")}') format('truetype');
        font-weight: 300;
      }
      @font-face {
        font-family: 'Inter';
        src: url('${staticFile("fonts/inter-400.ttf")}') format('truetype');
        font-weight: 400;
      }
    `;
    document.head.appendChild(style);
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  return <>{children}</>;
};

export const RemotionRoot: React.FC = () => {
  return (
    <FontLoader>
      <Composition
        id="RecruitingVideo"
        component={RecruitingVideo}
        durationInFrames={1110}
        fps={30}
        width={1080}
        height={1920}
      />
    </FontLoader>
  );
};
