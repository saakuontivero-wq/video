import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { LogoBluFinal }             from "./components/LogoBluFinal";
import { LogoBluRecruitingFull }    from "./components/LogoBluRecruitingFull";
import { JobCardsGrid }             from "./components/JobCardsGrid";
import { BrowserMockup }            from "./components/BrowserMockup";
import { UploadCard }               from "./components/UploadCard";
import { COLORS, SPRINGS, CONFIG, GLOW_TEXT_SOFT, GLOW_TEXT_MINIMAL, fontStack, LAYOUT } from "./constants/theme";

// ─── Scene boundaries ─────────────────────────────────────────────────────────
const S_LOGO    = { start: 0,    end: 75   };
const S1        = { start: 75,   end: 165  };
const S2        = { start: 165,  end: 255  };
const S3        = { start: 255,  end: 495  };
const S_COUNTER = { start: 495,  end: 570  };
const S4        = { start: 570,  end: 750  };
const S5        = { start: 750,  end: 900  };
const S6        = { start: 900,  end: 1020 };
const S7        = { start: 1020, end: 1110 };

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

  // Logo intro
  const logoIntroEnter = spring({ frame: Math.max(0, frame - 5), fps, config: SPRINGS.text });
  const logoIntroExit  = interpolate(frame, [58, 74], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Counter scene
  const counterEnterS = spring({ frame: Math.max(0, frame - S_COUNTER.start), fps, config: SPRINGS.text });
  const counterValue  = Math.round(interpolate(frame, [S_COUNTER.start, S_COUNTER.start + 35], [0, 247], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // Scene 6 elements
  const ctaS   = spring({ frame: Math.max(0, frame - 935), fps, config: SPRINGS.text });
  const ewFade = interpolate(frame, [950, 960], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scene 7 elements
  const logoS7     = spring({ frame: Math.max(0, frame - 1025), fps, config: SPRINGS.text });
  const logoS7Blur = interpolate(frame, [1070, 1102], [0, 14], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoS7Fade = interpolate(frame, [1070, 1105], [1, 0],  { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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

          {/* ── Scene 0 — pausa inicial (fondo oscuro) ── */}

          {/* ── Scene 1 — Hook ── */}
          {frame >= S1.start - 8 && frame < S2.start && (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: sceneOp(frame, S1.start, S1.end),
              }}
            >
              <TLine text={CONFIG.copy.s1.hook} size={92} weight={300} delay={90} />
            </div>
          )}

          {/* ── Scene 2 — Promesa ── */}
          {frame >= S2.start - 8 && frame < S3.start && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: sceneOp(frame, S2.start, S2.end) }}>
              <TLine text={CONFIG.copy.s2.l1} size={90} weight={300} delay={170} />
              <TLine text={CONFIG.copy.s2.l2} size={108} weight={700} accent glowSoft delay={183} />
            </div>
          )}

          {/* ── Scene 3 — Cards ── */}
          {frame >= S3.start - 8 && frame < S_COUNTER.start && (
            <JobCardsGrid opacity={sceneOp(frame, S3.start, S3.end)} />
          )}

          {/* ── Scene COUNTER — 0 → 247 ── */}
          {frame >= S_COUNTER.start - 8 && frame < S4.start && (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: sceneOp(frame, S_COUNTER.start, S_COUNTER.end),
              }}
            >
              {/* inline-flex column con alignItems stretch hace que el label
                  herede exactamente el ancho del número */}
              <div
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  opacity: counterEnterS,
                  transform: `translateY(${interpolate(counterEnterS, [0, 1], [30, 0])}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 220,
                    fontWeight: 700,
                    color: COLORS.accent,
                    lineHeight: 1.0,
                    fontFamily: fontStack,
                    letterSpacing: "-0.03em",
                    textShadow: "0 0 60px rgba(0,207,206,0.55), 0 0 120px rgba(0,207,206,0.28)",
                    textAlign: "center",
                  }}
                >
                  {counterValue}
                </div>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 400,
                    color: COLORS.textPrimary,
                    marginTop: 24,
                    fontFamily: fontStack,
                    textAlign: "justify" as const,
                    textAlignLast: "justify" as const,
                    letterSpacing: 0,
                  }}
                >
                  BÚSQUEDAS ACTIVAS
                </div>
              </div>
            </div>
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
          {frame >= S6.start - 8 && frame < S7.start && (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: sceneOp(frame, S6.start, S6.end),
              }}
            >
              <TLine text={CONFIG.copy.s6.l1} size={52} weight={300} delay={902} ls="-0.01em" />
              <TLine text={CONFIG.copy.s6.l2} size={52} weight={300} delay={906} ls="-0.01em" />
              <TLine text={CONFIG.copy.s6.l3} size={92} weight={700} accent glowSoft delay={920} />

              {/* CTA button */}
              <div style={{ marginTop: 40, opacity: ctaS, transform: `scale(${interpolate(ctaS,[0,1],[0.95,1])})` }}>
                <div
                  style={{
                    width: 320, height: 56,
                    borderRadius: 28,
                    border: "1.5px solid #00CFCE",
                    backgroundColor: "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: COLORS.accent,
                    fontSize: 25, fontWeight: 600,
                    fontFamily: fontStack,
                    letterSpacing: "0.01em",
                    boxShadow: "0 0 20px rgba(0,207,206,0.20), 0 0 40px rgba(0,207,206,0.08), inset 0 0 20px rgba(0,207,206,0.05)",
                  }}
                >
                  {CONFIG.copy.s6.cta}
                </div>
              </div>

              {/* Eyebrow */}
              <div style={{ marginTop: 20, fontSize: 23, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: COLORS.textDim, opacity: ewFade, textShadow: GLOW_TEXT_MINIMAL }}>
                {CONFIG.copy.s6.ew}
              </div>
            </div>
          )}

          {/* ── Scene 7 — Logo final con difuminado de salida ── */}
          {frame >= S7.start - 8 && (
            <div
              style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                opacity: sceneOp(frame, S7.start, S7.end),
              }}
            >
              <div
                style={{
                  opacity: logoS7 * logoS7Fade,
                  transform: `translateY(${interpolate(logoS7, [0, 1], [20, 0])}px)`,
                  filter: `blur(${logoS7Blur}px)`,
                }}
              >
                <LogoBluFinal />
              </div>
            </div>
          )}

        </div>
      </div>

    </AbsoluteFill>
  );
};
