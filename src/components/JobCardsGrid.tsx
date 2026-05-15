import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { JobCard } from "./JobCard";
import { CONFIG, COLORS, SPRINGS, CARD, GLOW_TEXT_MINIMAL, GLOW_TEXT_SOFT, fontStack } from "../constants/theme";

const SCENE_START = 180;
const PAIR_DELAYS = [215, 233, 251, 269];
const LAST_GLOW_END = PAIR_DELAYS[3] + 40;

export const JobCardsGrid: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pairs: (typeof CONFIG.jobCards[0])[][] = [
    [CONFIG.jobCards[0], CONFIG.jobCards[1]],
    [CONFIG.jobCards[2], CONFIG.jobCards[3]],
    [CONFIG.jobCards[4], CONFIG.jobCards[5]],
    [CONFIG.jobCards[6], CONFIG.jobCards[7]],
  ];

  const ewS = spring({ frame: Math.max(0, frame - (SCENE_START + 8)), fps, config: SPRINGS.text });
  const h1S = spring({ frame: Math.max(0, frame - (SCENE_START + 18)), fps, config: SPRINGS.text });
  const h2S = spring({ frame: Math.max(0, frame - (SCENE_START + 30)), fps, config: SPRINGS.text });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity, fontFamily: fontStack }}>

      {/* Eyebrow */}
      <div style={{ fontSize: 18, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: COLORS.textDim, marginBottom: 16, textShadow: GLOW_TEXT_MINIMAL, opacity: ewS, transform: `translateY(${interpolate(ewS,[0,1],[24,0])}px)` }}>
        {CONFIG.copy.s3.ew}
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 68, fontWeight: 300, color: COLORS.textPrimary, lineHeight: 1.1, letterSpacing: "-0.01em", opacity: h1S, transform: `translateY(${interpolate(h1S,[0,1],[24,0])}px)` }}>
          {CONFIG.copy.s3.l1}
        </div>
        <div style={{ fontSize: 80, fontWeight: 700, color: COLORS.accent, lineHeight: 1.1, letterSpacing: "-0.02em", textShadow: GLOW_TEXT_SOFT, opacity: h2S, transform: `translateY(${interpolate(h2S,[0,1],[24,0])}px)` }}>
          {CONFIG.copy.s3.l2}
        </div>
      </div>

      {/* Cards — 712px total (2×346 + 20 gap), centered in 760px */}
      <div style={{ display: "flex", flexDirection: "column", gap: CARD.rowGap }}>
        {pairs.map((pair, pairIdx) => {
          const s = spring({ frame: Math.max(0, frame - PAIR_DELAYS[pairIdx]), fps, config: SPRINGS.card });
          const isLastCard = pairIdx === 3;
          const glowFade = isLastCard
            ? interpolate(frame, [PAIR_DELAYS[3] + 14, LAST_GLOW_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
            : 0;

          return (
            <div key={pairIdx} style={{ display: "flex", gap: CARD.gap, opacity: s, transform: `translateY(${interpolate(s,[0,1],[40,0])}px)` }}>
              {pair.map((card, ci) => (
                <JobCard
                  key={ci}
                  industry={card.industry}
                  role={card.role}
                  location={card.location}
                  glow={isLastCard && glowFade > 0.05}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
