import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, staticFile, delayRender, continueRender } from "remotion";
import { Background } from "./components/Background";
import { LiveBadge } from "./components/LiveBadge";
import { JobCardsGrid } from "./components/JobCardsGrid";
import { BrowserMockup } from "./components/BrowserMockup";
import { UploadCard } from "./components/UploadCard";
import { BluLogo } from "./components/BluLogo";
import { COLORS } from "./constants/theme";

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

// Scene boundaries
const S1_START = 0,   S1_END = 90;
const S2_START = 90,  S2_END = 180;
const S3_START = 180, S3_END = 420;
const S4_START = 420, S4_END = 600;
const S5_START = 600, S5_END = 750;
const S6_START = 750, S6_END = 810;

function sceneOpacity(frame: number, start: number, end: number, overlapIn = 15, overlapOut = 15): number {
  const fadeIn = interpolate(frame, [start, start + overlapIn], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [end - overlapOut, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(fadeIn, fadeOut);
}

const TextScene: React.FC<{
  lines: { text: string; accent?: boolean; size?: number; weight?: number }[];
  startFrame: number;
  opacity: number;
  eyebrow?: string;
}> = ({ lines, startFrame, opacity, eyebrow }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 60px",
        opacity,
      }}
    >
      {eyebrow && (
        <div style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.textSecondary, marginBottom: 20, opacity: interpolate(frame, [startFrame, startFrame + 15], [0, 1], { extrapolateRight: "clamp" }) }}>
          {eyebrow}
        </div>
      )}
      {lines.map((line, i) => {
        const s = spring({ frame: Math.max(0, frame - (startFrame + i * 12)), fps, config: { damping: 14, stiffness: 120 } });
        return (
          <div
            key={i}
            style={{
              fontSize: line.size ?? 64,
              fontWeight: line.weight ?? (line.accent ? 800 : 300),
              color: line.accent ? COLORS.accent : COLORS.textPrimary,
              lineHeight: 1.15,
              textAlign: "center",
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
            }}
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
};

export const RecruitingVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [handle] = React.useState(() => delayRender("Loading Inter font"));
  React.useEffect(() => {
    loadInterFont();
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  const badgeOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scene 6 closing animations
  const logoSpring = spring({ frame: Math.max(0, frame - 780), fps, config: { damping: 14, stiffness: 100 } });
  const eyebrowFade = interpolate(frame, [790, 800], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const s6opacity = sceneOpacity(frame, S6_START, S6_END, 10, 5);

  return (
    <div style={{ width: 1080, height: 1920, position: "relative", fontFamily, overflow: "hidden" }}>
      <Background />

      {/* Live badge — persists across scenes */}
      {frame < S6_START && (
        <div style={{ position: "absolute", top: "35%", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10, opacity: badgeOpacity }}>
          <LiveBadge />
        </div>
      )}

      {/* Scene 1 — Hook */}
      {frame < S2_END && (
        <TextScene
          opacity={sceneOpacity(frame, S1_START, S1_END + 20, 10, 20)}
          startFrame={20}
          lines={[{ text: "¿Buscás talento?", size: 68, weight: 700 }]}
        />
      )}

      {/* Scene 2 — Promise */}
      {frame >= S2_START - 20 && frame < S3_START && (
        <TextScene
          opacity={sceneOpacity(frame, S2_START - 20, S2_END + 15, 20, 15)}
          startFrame={S2_START}
          lines={[
            { text: "Está a tu", size: 68, weight: 300 },
            { text: "alcance.", size: 68, weight: 800, accent: true },
          ]}
        />
      )}

      {/* Scene 3 — Job cards */}
      {frame >= S3_START - 15 && frame < S4_START && (
        <JobCardsGrid opacity={sceneOpacity(frame, S3_START - 15, S3_END + 15, 15, 15)} />
      )}

      {/* Scene 4 — Browser mockup */}
      {frame >= S4_START - 15 && frame < S5_START && (
        <BrowserMockup opacity={sceneOpacity(frame, S4_START - 15, S4_END + 15, 15, 15)} />
      )}

      {/* Scene 5 — Upload */}
      {frame >= S5_START - 15 && frame < S6_START && (
        <UploadCard opacity={sceneOpacity(frame, S5_START - 15, S5_END + 10, 15, 10)} />
      )}

      {/* Scene 6 — Closing */}
      {frame >= S6_START - 10 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px",
            opacity: s6opacity,
          }}
        >
          {["El trabajo que", "estás esperando"].map((line, i) => {
            const s = spring({ frame: Math.max(0, frame - (S6_START + i * 10)), fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div key={i} style={{ fontSize: 64, fontWeight: 300, color: COLORS.textPrimary, lineHeight: 1.15, textAlign: "center", opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)` }}>
                {line}
              </div>
            );
          })}
          {(() => {
            const s = spring({ frame: Math.max(0, frame - 770), fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div style={{ fontSize: 64, fontWeight: 800, color: COLORS.accent, lineHeight: 1.15, textAlign: "center", opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)` }}>
                te espera.
              </div>
            );
          })()}

          {/* Divider */}
          <div style={{ width: 200, height: 1, background: `rgba(0,207,206,0.3)`, margin: "32px 0", opacity: logoSpring }} />

          {/* Logo */}
          <div style={{ opacity: logoSpring, transform: `translateY(${interpolate(logoSpring, [0, 1], [20, 0])}px)` }}>
            <BluLogo width={180} />
          </div>

          {/* Eyebrow */}
          <div style={{ marginTop: 16, fontSize: 11, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.textSecondary, opacity: eyebrowFade }}>
            SUBÍ TU CV · SIN FORMULARIOS
          </div>
        </div>
      )}
    </div>
  );
};
