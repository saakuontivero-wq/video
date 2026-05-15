import React from "react";
import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  spring, interpolate, staticFile, delayRender, continueRender,
} from "remotion";
import { Background }    from "./components/Background";
import { BluLogo }       from "./components/BluLogo";
import { JobCardsGrid }  from "./components/JobCardsGrid";
import { BrowserMockup } from "./components/BrowserMockup";
import { UploadCard }    from "./components/UploadCard";
import { COLORS, SPRINGS, CONFIG } from "./constants/theme";

// ─── Font ────────────────────────────────────────────────────────────────────
const fontFamily = "Inter, sans-serif";

function loadInterFont() {
  const weights: [number, string][] = [
    [300, staticFile("fonts/inter-300.ttf")],
    [400, staticFile("fonts/inter-400.ttf")],
    [600, staticFile("fonts/inter-600.ttf")],
    [700, staticFile("fonts/inter-700.ttf")],
    [800, staticFile("fonts/inter-800.ttf")],
  ];
  const style = document.createElement("style");
  style.textContent = weights
    .map(([w, url]) => `@font-face{font-family:'Inter';font-weight:${w};font-style:normal;src:url('${url}') format('truetype');}`)
    .join("\n");
  document.head.appendChild(style);
}

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

// ─── Particles (4, scenes 1, 2, 6) ────────────────────────────────────────────
const PARTICLE_DEFS = [
  { cx: 0.20, cy: 0.30, r: 3, speed: 0.7, phase: 0   },
  { cx: 0.75, cy: 0.50, r: 2, speed: 0.5, phase: 45  },
  { cx: 0.40, cy: 0.75, r: 4, speed: 0.6, phase: 90  },
  { cx: 0.85, cy: 0.20, r: 2, speed: 0.8, phase: 135 },
];

const Particles: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}>
      {PARTICLE_DEFS.map((p, i) => {
        const cy = p.cy * 1600 + Math.sin((frame * p.speed + p.phase) * Math.PI / 180) * 20;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.cx * 760,
              top:  cy,
              width:  p.r * 2,
              height: p.r * 2,
              borderRadius: "50%",
              backgroundColor: "rgba(61,233,194,0.12)",
            }}
          />
        );
      })}
    </div>
  );
};

// ─── Single animated text line ─────────────────────────────────────────────────
const TLine: React.FC<{ text: string; size: number; weight: number; accent?: boolean; delay: number }> = ({ text, size, weight, accent, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: Math.max(0, frame - delay), fps, config: SPRINGS.text });
  return (
    <div style={{ fontSize: size, fontWeight: weight, color: accent ? COLORS.accent : COLORS.textPrimary, lineHeight: 1.1, textAlign: "center", opacity: s, transform: `translateY(${interpolate(s,[0,1],[28,0])}px)` }}>
      {text}
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────────
export const RecruitingVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [handle] = React.useState(() => delayRender("Inter font"));
  React.useEffect(() => {
    loadInterFont();
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  const inTextScene = frame < S3.start || frame >= S6.start;

  // Scene 6 elements
  const logoS      = spring({ frame: Math.max(0, frame - 782), fps, config: { damping: 14, stiffness: 100 } });
  const eyebrowFade = interpolate(frame, [792, 802], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.outerBg, fontFamily }}>

      {/* ── Inner rounded rectangle ── */}
      <div
        style={{
          position: "absolute",
          left: 100, top: 100,
          width: 880, height: 1720,
          borderRadius: 60,
          overflow: "hidden",
          backgroundColor: COLORS.innerBg,
        }}
      >
        <Background />

        {/* ── Content area 760 × 1600 ── */}
        <div style={{ position: "absolute", left: 60, top: 60, width: 760, height: 1600 }}>

          {/* Particles — text-only scenes */}
          <Particles opacity={inTextScene ? 1 : 0} />

          {/* ── Scene 1 — Hook ── */}
          {frame < S2.end && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: sceneOp(frame, S1.start, S1.end) }}>
              <TLine text={CONFIG.copy.s1} size={81} weight={300} delay={15} />
            </div>
          )}

          {/* ── Scene 2 — Promesa ── */}
          {frame >= S2.start - 8 && frame < S3.start && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: sceneOp(frame, S2.start, S2.end) }}>
              <TLine text={CONFIG.copy.s2.l1} size={70} weight={300} delay={95} />
              <TLine text={CONFIG.copy.s2.l2} size={84} weight={800} accent delay={107} />
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
              <TLine text={CONFIG.copy.s6.l1} size={51} weight={300} delay={752} />
              <TLine text={CONFIG.copy.s6.l2} size={51} weight={300} delay={758} />
              <TLine text={CONFIG.copy.s6.l3} size={95} weight={800} accent delay={772} />

              {/* Divider */}
              <div style={{ width: 120, height: 1, background: "rgba(61,233,194,0.18)", margin: "32px 0 0", opacity: logoS }} />

              {/* Logo */}
              <div style={{ marginTop: 24, opacity: logoS, transform: `translateY(${interpolate(logoS,[0,1],[18,0])}px)` }}>
                <BluLogo width={180} />
              </div>

              {/* Eyebrow */}
              <div style={{ marginTop: 18, fontSize: 20, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: COLORS.textSecondary, opacity: eyebrowFade, textAlign: "center" }}>
                {CONFIG.copy.s6.ew}
              </div>
            </div>
          )}

        </div>
      </div>

    </AbsoluteFill>
  );
};
