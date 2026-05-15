import { useCurrentFrame, useVideoConfig } from "remotion";

export const useSceneProgress = (startFrame: number, endFrame: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = Math.max(0, Math.min(frame - startFrame, endFrame - startFrame));
  const progress = relativeFrame / (endFrame - startFrame);
  return { relativeFrame, progress, fps, frame };
};
