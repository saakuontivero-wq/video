import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  staticFile,
  delayRender,
  continueRender,
} from "remotion";
import { Background }    from "./components/Background";
import { BluLogo }       from "./components/BluLogo";
import { JobCardsGrid }  from "./components/JobCardsGrid";
import { BrowserMockup } from "./components/BrowserMockup";
import { UploadCard }    from "./components/UploadCard";
import { COLORS, SPRINGS, CONFIG } from "./constants/theme";

// ─── Font loading ───────────────────────────────────────────────────────────
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

// ─── Scene boundaries ───────────────────────────────────────────────────────
const S1 = { start: 0,   end: 90  };
const S2 = { start: 90,  end: 180 };
const S3 = { start: 180, end: 420 };
const S4 = { start: 420, end: 600 };
const S5 = { start: 600, end: 750 };
const S6 = { start: 750, end: 810 };

function fadeIn(frame: number, at: number): number {
  return interpolate(frame, [at - 8, at + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}
function fadeOut(frame: number, at: number): number {
  return interpolate(frame, [at - 12, at + 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}
function sceneOp(frame: number, start: number, end: number): number {
  return Math.min(fadeIn(frame, start), fadeOut(frame, end));
}

// ─── Floating particles (scenes 1, 2, 6) ───────────────────────────────────
const PARTICLES = [
  { x: 90,  y: 280,  r: 3, sx: 0.018, sy: 0.013, ax: 18, ay: 12 },
  { x: 640, y: 420,  r: 2, sx: 0.014, sy: 0.020, ax: 22, ay: 16 },
  { x: 55,  y: 720,  r: 4, sx: 0.022, sy: 0.015, ax: 14, ay: 20 },
  { x: 700, y: 900,  r: 2, sx: 0.017, sy: 0.024, ax: 20, ay: 10 },
  { x: 350, y: 1300, r: 3, sx: 0.020, sy: 0.016, ax: 16, ay: 18 },
];

const Particles: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x + Math.sin(frame * p.sx + i * 1.3) * p.ax,
            top:  p.y + Math.cos(frame * p.sy + i * 0.9) * p.ay,
            width:  p.r * 2,
            height: p.r * 2,
            borderRadius: "50%",
            backgroundColor: "rgba(0,207,206,0.15)",
          }}
        />
      ))}
    </div>
  );
};

// ─── Text entry helper ──────────────────────────────────────────────────────
const TextLine: React.FC<{
  text: string;
  size: number;
  weight: number;
  accent?: boolean;
  delay: number;
}> = ({ text, size, weight, accent, delay }) => {
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
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [28, 0])}px)`,
      }}
    >
      {text}
    </div>
  );
};

// ─── Main component ─────────────────────────────────────────────────────────
export const RecruitingVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [handle] = React.useState(() => delayRender("Inter font"));
  React.useEffect(() => {
    loadInterFont();
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  // Scenes 1, 2, 6 are text-only — show particles in those windows
  const inTextScene = frame < S3.start || frame >= S6.start;
  const particleOp  = inTextScene ? 1 : 0;

  // Closing scene
  const logoS      = spring({ frame: Math.max(0, frame - 782), fps, config: { damping: 14, stiffness: 100 } });
  const eyebrowFade = interpolate(frame, [792, 802], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgOuter, fontFamily }}>

      {/* ── Inner rounded rectangle ── */}
      <div
        style={{
          position: "absolute",
          left: 100, top: 100,
          width: 880, height: 1720,
          borderRadius: 60,
          overflow: "hidden",
          backgroundColor: COLORS.bgBase,
        }}
      >
        <Background />

        {/* ── Content area 760 × 1600, padded 60px inside ── */}
        <div style={{ position: "absolute", left: 60, top: 60, width: 760, height: 1600 }}>

          {/* Floating particles */}
          <Particles opacity={particleOp} />

          {/* ── Scene 1 — Hook ── */}
          {frame < S2.end && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: sceneOp(frame, S1.start, S1.end) }}>
              <TextLine text={CONFIG.copy.scene1} size={81} weight={300} delay={15} />
            </div>
          )}

          {/* ── Scene 2 — Promesa ── */}
          {frame >= S2.start - 8 && frame < S3.start && (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: sceneOp(frame, S2.start, S2.end) }}>
              <TextLine text={CONFIG.copy.scene2.line1} size={70} weight={300} delay={95}  />
              <TextLine text={CONFIG.copy.scene2.line2} size={84} weight={800} accent delay={107} />
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
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: sceneOp(frame, S6.start, S6.end),
              }}
            >
              {/* Line 1 & 2 */}
              {[CONFIG.copy.closing.line1, CONFIG.copy.closing.line2].map((line, i) => (
                <TextLine key={i} text={line} size={51} weight={300} delay={752 + i * 8} />
              ))}

              {/* "te espera." */}
              <TextLine text={CONFIG.copy.closing.line3} size={95} weight={800} accent delay={772} />

              {/* Thin divider */}
              <div style={{ width: 140, height: 1, background: "rgba(0,207,206,0.2)", margin: "32px 0 0", opacity: logoS }} />

              {/* BLU Logo */}
              <div style={{ marginTop: 24, opacity: logoS, transform: `translateY(${interpolate(logoS, [0, 1], [18, 0])}px)` }}>
                <BluLogo width={180} />
              </div>

              {/* Eyebrow */}
              <div style={{ marginTop: 18, fontSize: 20, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: COLORS.textSecondary, opacity: eyebrowFade, textAlign: "center" }}>
                {CONFIG.copy.closing.eyebrow}
              </div>
            </div>
          )}

        </div>{/* end content area */}
      </div>{/* end inner rect */}

    </AbsoluteFill>
  );
};
