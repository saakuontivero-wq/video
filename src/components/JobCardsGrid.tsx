import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { JobCard } from "./JobCard";
import { CONFIG, COLORS, SPRINGS } from "../constants/theme";

const SCENE_START = 180;
// Stagger delays per pair
const PAIR_DELAYS = [220, 238, 256, 274];
// Last card glow fades out 30 frames after it fully enters
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

  const eyebrowOpacity = interpolate(frame, [SCENE_START, SCENE_START + 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 60,
        opacity,
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 400,
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          color: COLORS.textSecondary,
          marginBottom: 18,
          opacity: eyebrowOpacity,
        }}
      >
        {CONFIG.copy.scene3.eyebrow}
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        {[CONFIG.copy.scene3.line1, CONFIG.copy.scene3.line2].map((line, i) => {
          const s = spring({
            frame: Math.max(0, frame - (SCENE_START + 10 + i * 14)),
            fps,
            config: SPRINGS.text,
          });
          return (
            <div
              key={i}
              style={{
                fontSize: i === 1 ? 84 : 70,
                fontWeight: i === 1 ? 800 : 300,
                color: i === 1 ? COLORS.accent : COLORS.textPrimary,
                lineHeight: 1.1,
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [28, 0])}px)`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* Cards grid — 2 cols × 352px, gap 22px = 726px centered in 760px */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {pairs.map((pair, pairIdx) => {
          const s = spring({
            frame: Math.max(0, frame - PAIR_DELAYS[pairIdx]),
            fps,
            config: SPRINGS.card,
          });
          return (
            <div
              key={pairIdx}
              style={{
                display: "flex",
                gap: 22,
                opacity: s,
                transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
              }}
            >
              {pair.map((card, ci) => {
                // Last card of last pair gets a glow that fades out
                const isLastCard = pairIdx === 3 && ci === 1;
                const glowFade = isLastCard
                  ? interpolate(frame, [PAIR_DELAYS[3] + 15, LAST_GLOW_END], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
                  : 0;
                return (
                  <JobCard
                    key={ci}
                    industry={card.industry}
                    role={card.role}
                    location={card.location}
                    glow={isLastCard && glowFade > 0.05}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
