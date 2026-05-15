import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { JobCard } from "./JobCard";
import { CONFIG, COLORS, SPRINGS, CARD, GLOW_TEXT_MINIMAL, GLOW_TEXT_SOFT, fontStack } from "../constants/theme";

const SCENE_START  = 255;
const FIRST_DELAY  = 290;
const CARD_STAGGER = 10;   // frames between each card

export const JobCardsGrid: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ewS = spring({ frame: Math.max(0, frame - (SCENE_START + 8)), fps, config: SPRINGS.text });
  const h1S = spring({ frame: Math.max(0, frame - (SCENE_START + 18)), fps, config: SPRINGS.text });
  const h2S = spring({ frame: Math.max(0, frame - (SCENE_START + 30)), fps, config: SPRINGS.text });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity, fontFamily: fontStack }}>

      {/* Eyebrow */}
      <div style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: COLORS.textDim, marginBottom: 20, textShadow: GLOW_TEXT_MINIMAL, opacity: ewS, transform: `translateY(${interpolate(ewS,[0,1],[24,0])}px)` }}>
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

      {/* Cards — CSS grid, one by one with individual springs + entry glow */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(2, ${CARD.width}px)`,
          gap: `${CARD.rowGap}px ${CARD.gap}px`,
        }}
      >
        {CONFIG.jobCards.map((card, i) => {
          const delay = FIRST_DELAY + i * CARD_STAGGER;
          const glowEnd = delay + 50;
          const s = spring({ frame: Math.max(0, frame - delay), fps, config: SPRINGS.card });
          const glowFade = interpolate(
            frame,
            [glowEnd - 15, glowEnd + 20],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const showGlow = frame >= delay + 4 && glowFade > 0.04;

          return (
            <div
              key={i}
              style={{
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [44, 0])}px)`,
              }}
            >
              <JobCard
                industry={card.industry}
                role={card.role}
                location={card.location}
                glow={showGlow}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
