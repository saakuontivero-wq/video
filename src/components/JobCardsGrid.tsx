import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { JobCard } from "./JobCard";
import { CONFIG, COLORS, SPRINGS, CARD } from "../constants/theme";

const SCENE_START = 180;
const PAIR_DELAYS = [220, 238, 256, 274];
const LAST_GLOW_END = PAIR_DELAYS[3] + 42;

export const JobCardsGrid: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pairs: (typeof CONFIG.jobCards[0])[][] = [
    [CONFIG.jobCards[0], CONFIG.jobCards[1]],
    [CONFIG.jobCards[2], CONFIG.jobCards[3]],
    [CONFIG.jobCards[4], CONFIG.jobCards[5]],
    [CONFIG.jobCards[6], CONFIG.jobCards[7]],
  ];

  const eyebrowS = spring({ frame: Math.max(0, frame - (SCENE_START + 5)), fps, config: SPRINGS.text });
  const heading1S = spring({ frame: Math.max(0, frame - (SCENE_START + 12)), fps, config: SPRINGS.text });
  const heading2S = spring({ frame: Math.max(0, frame - (SCENE_START + 24)), fps, config: SPRINGS.text });

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 60, opacity }}>

      {/* Eyebrow */}
      <div style={{ fontSize: 20, fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: COLORS.textSecondary, marginBottom: 18, opacity: eyebrowS, transform: `translateY(${interpolate(eyebrowS, [0,1], [28,0])}px)` }}>
        {CONFIG.copy.s3.ew}
      </div>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 70, fontWeight: 300, color: COLORS.textPrimary, lineHeight: 1.1, opacity: heading1S, transform: `translateY(${interpolate(heading1S,[0,1],[28,0])}px)` }}>
          {CONFIG.copy.s3.l1}
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, color: COLORS.accent, lineHeight: 1.1, opacity: heading2S, transform: `translateY(${interpolate(heading2S,[0,1],[28,0])}px)` }}>
          {CONFIG.copy.s3.l2}
        </div>
      </div>

      {/* Cards grid — 726px total (2 × 352 + 22 gap) centered in 760px */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: CARD.rowGap }}>
        {pairs.map((pair, pairIdx) => {
          const s = spring({ frame: Math.max(0, frame - PAIR_DELAYS[pairIdx]), fps, config: SPRINGS.card });
          return (
            <div key={pairIdx} style={{ display: 'flex', gap: CARD.gap, opacity: s, transform: `translateY(${interpolate(s,[0,1],[40,0])}px)` }}>
              {pair.map((card, ci) => {
                const isLastCard = pairIdx === 3 && ci === 1;
                const glowFade = isLastCard
                  ? interpolate(frame, [PAIR_DELAYS[3] + 16, LAST_GLOW_END], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
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
