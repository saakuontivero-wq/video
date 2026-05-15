import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { JobCard } from "./JobCard";
import { CONFIG, COLORS } from "../constants/theme";

const SCENE_START = 180;

export const JobCardsGrid: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pairs = [
    [CONFIG.jobCards[0], CONFIG.jobCards[1]],
    [CONFIG.jobCards[2], CONFIG.jobCards[3]],
    [CONFIG.jobCards[4], CONFIG.jobCards[5]],
    [CONFIG.jobCards[6], CONFIG.jobCards[7]],
  ];

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "160px 40px 40px",
        gap: 0,
        opacity,
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: COLORS.textSecondary,
          textAlign: "center",
          marginBottom: 16,
          opacity: interpolate(frame, [SCENE_START, SCENE_START + 15], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        AHORA MISMO
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        {["Cientos de empresas", "buscan talento."].map((line, i) => {
          const entrySpring = spring({
            frame: Math.max(0, frame - (SCENE_START + 10 + i * 12)),
            fps,
            config: { damping: 14, stiffness: 120 },
          });
          const isAccent = i === 1;
          return (
            <div
              key={i}
              style={{
                fontSize: 44,
                fontWeight: isAccent ? 800 : 300,
                color: isAccent ? COLORS.accent : COLORS.textPrimary,
                lineHeight: 1.15,
                opacity: entrySpring,
                transform: `translateY(${interpolate(entrySpring, [0, 1], [30, 0])}px)`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {/* Cards grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {pairs.map((pair, pairIdx) => {
          const delay = SCENE_START + 40 + pairIdx * 18;
          const entrySpring = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 12, stiffness: 90 },
          });
          return (
            <div
              key={pairIdx}
              style={{
                display: "flex",
                gap: 10,
                opacity: entrySpring,
                transform: `translateY(${interpolate(entrySpring, [0, 1], [40, 0])}px)`,
              }}
            >
              {pair.map((card, cardIdx) => (
                <JobCard
                  key={cardIdx}
                  industry={card.industry}
                  role={card.role}
                  location={card.location}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
