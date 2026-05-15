import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { LogoBluRecruiting }  from "./components/LogoBluRecruiting";
import { JobCardsGrid }       from "./components/JobCardsGrid";
import { BrowserMockup }      from "./components/BrowserMockup";
import { UploadCard }         from "./components/UploadCard";
import { COLORS, SPRINGS, CONFIG, GLOW_TEXT_SOFT, GLOW_TEXT_MINIMAL, fontStack, LAYOUT } from "./constants/theme";

// ─── Scene boundaries ─────────────────────────────────────────────────────────
const S1 = { start: 0,   end: 90  };
const S2 = { start: 90,  end: 180 };
const S3 = { start: 180, end: 420 };
const S4 = { start: 420, end: 600 };
const S5 = { start: 600, end: 750 };
const S6 = { start: 750, end: 810 };

function sceneOp(frame: number, start: number, end: number): number {
  const fi = interpolate(frame, [start - 8, start + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fo = interpolate(frame, [end - 12, end + 8],     [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(fi, fo);
}

// ─── Animated text line ────────────────────────────────────────────────────────
interface TLineProps {
  text: string;
  size: number;
  weight: number;
  accent?: boolean;
  glow?: boolean;
  glowSoft?: boolean;
  delay: number;
  ls?: string;
}

const TLine: React.FC<TLineProps> = ({ text, size, weight, accent, glowSoft, delay, ls }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: Math.max(0, frame - delay), fps, config: SPRINGS.text });
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        color: accent ? COLORS.accent : COLORS.textPrimary,
        lineHeight: 1.1,
        textAlign: "center",
        letterSpacing: ls ?? (accent ? "-0.02em" : "-0.01em"),
        fontFamily: fontStack,
        textShadow: glowSoft ? GLOW_TEXT_SOFT : undefined,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px)`,
      }}
    >
      {text}
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
export const RecruitingVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene 6 elements
  const logoS6   = spring({ frame: Math.max(0, frame - 780), fps, config: SPRINGS.text });
  const ctaS     = spring({ frame: Math.max(0, frame - 788), fps, config: SPRINGS.text });
  const ewFade   = interpolate(frame, [795, 805], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.outerBg, fontFamily: fontStack }}>

      {/* ── Inner rounded rectangle ── */}
      <div
        style={{
          position: "absolute",
          left: LAYOUT.inner.x,
          top:  LAYOUT.inner.y,
          width:        LAYOUT.inner.width,
          height:       LAYOUT.inner.height,
          borderRadius: LAYOUT.inner.borderRadius,
          overflow:     "hidden",
          backgroundColor: COLORS.innerBg,
        }}
      >
        <AnimatedBackground />

        {/* ── Content zone: x=60 y=300 w=760 h=1120 ── */}
        <div
          style={{
            position:       "absolute",
            left:           LAYOUT.content.x,
            top:            LAYOUT.content.y,
            width:          LAYOUT.content.width,
            height:         LAYOUT.content.height,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            textAlign:      "center",
          }}
        >

          {/* ── Scene 1 — Hook ── */}
          {frame < S2.end && (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 28,
                opacity: sceneOp(frame, S1.start, S1.end),
              }}
            >
              {/* Logo — enters from above */}
              {(() => {
                const s = spring({ frame: Math.max(0, frame - 10), fps, config: SPRINGS.text });
                return (
                  <div style={{ opacity: s, transform: `translateY(${interpolate(s, [0, 1], [-20, 0])}px)` }}>
                    <LogoBluRecruiting width={520} />
                  </div>
                );
              })()}
              {/* Hook text */}
              <TLine text={CONFIG.copy.s1.hook} size={78} weight={300} delay={30} />
            </div>
          )}

          {/* ── Scene 2 — Promesa ── */}
          {frame >= S2.start - 8 && frame < S3.start && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: sceneOp(frame, S2.start, S2.end) }}>
              <TLine text={CONFIG.copy.s2.l1} size={68} weight={300} delay={95} />
              <TLine text={CONFIG.copy.s2.l2} size={80} weight={700} accent glowSoft delay={108} />
            </div>
          )}

          {/* ── Scene 3 — Cards ── */}
          {frame >= S3.start - 8 && frame < S4.start && (
            <JobCardsGrid opacity={sceneOp(frame, S3.start, S3.end)} />
          )}

          {/* ── Scene 4 — Browser ── */}
          {frame >= S4.start - 8 && frame < S5.start && (
            <BrowserMockup opacity={sceneOp(frame, S4.start, S4.end)} />
          )}

          {/* ── Scene 5 — Upload ── */}
          {frame >= S5.start - 8 && frame < S6.start && (
            <UploadCard opacity={sceneOp(frame, S5.start, S5.end)} />
          )}

          {/* ── Scene 6 — Closing ── */}
          {frame >= S6.start - 8 && (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: sceneOp(frame, S6.start, S6.end),
              }}
            >
              <TLine text={CONFIG.copy.s6.l1} size={48} weight={300} delay={752} ls="-0.01em" />
              <TLine text={CONFIG.copy.s6.l2} size={48} weight={300} delay={756} ls="-0.01em" />
              <TLine text={CONFIG.copy.s6.l3} size={88} weight={700} accent glowSoft delay={770} />

              {/* Gap + Logo */}
              <div style={{ marginTop: 44, opacity: logoS6, transform: `translateY(${interpolate(logoS6,[0,1],[-16,0])}px)` }}>
                <LogoBluRecruiting width={520} />
              </div>

              {/* CTA button */}
              <div style={{ marginTop: 24, opacity: ctaS, transform: `scale(${interpolate(ctaS,[0,1],[0.95,1])})` }}>
                <div
                  style={{
                    width: 320, height: 56,
                    borderRadius: 28,
                    border: "1.5px solid #00CFCE",
                    backgroundColor: "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: COLORS.accent,
                    fontSize: 22, fontWeight: 600,
                    fontFamily: fontStack,
                    letterSpacing: "0.01em",
                    boxShadow: "0 0 20px rgba(0,207,206,0.20), 0 0 40px rgba(0,207,206,0.08), inset 0 0 20px rgba(0,207,206,0.05)",
                  }}
                >
                  {CONFIG.copy.s6.cta}
                </div>
              </div>

              {/* Eyebrow */}
              <div style={{ marginTop: 14, fontSize: 16, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: COLORS.textDim, opacity: ewFade, textShadow: GLOW_TEXT_MINIMAL }}>
                {CONFIG.copy.s6.ew}
              </div>
            </div>
          )}

        </div>
      </div>

    </AbsoluteFill>
  );
};
