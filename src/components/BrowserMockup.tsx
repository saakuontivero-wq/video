import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, SPRINGS, BROWSER, CONFIG, GLOW_TEXT_MINIMAL, GLOW_TEXT_SOFT, fontStack } from "../constants/theme";
import { SquareDot } from "./SquareDot";

const SCENE_START  = 420;
const MOCKUP_ENTER = 440;
const SCROLL_END   = 580;

function getRowGlow(rowIndex: number, frame: number, fps: number) {
  const schedule = CONFIG.rowGlowSchedule.find(r => r.row === rowIndex);
  if (!schedule) return {};

  const p = spring({
    frame: Math.max(0, frame - schedule.start),
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.6 },
  });
  const fadeOut = interpolate(
    frame,
    [schedule.start + schedule.duration, schedule.start + schedule.duration + 20],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const intensity = Math.min(p, 1) * fadeOut;

  return {
    backgroundColor: `rgba(0,207,206,${interpolate(intensity, [0, 1], [0, 0.10])})`,
    boxShadow: `inset 0 0 0 1px rgba(0,207,206,${interpolate(intensity, [0, 1], [0, 0.70])}), 0 0 24px rgba(0,207,206,${interpolate(intensity, [0, 1], [0, 0.28])})`,
  };
}

export const BrowserMockup: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dotPulse = interpolate((frame % 36) / 36, [0, 0.5, 1], [1, 0.2, 1]);
  const scrollY  = interpolate(frame, [500, SCROLL_END], [0, -10], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const mockupS  = spring({ frame: Math.max(0, frame - MOCKUP_ENTER), fps, config: SPRINGS.ui });

  const ewS = spring({ frame: Math.max(0, frame - (SCENE_START + 8)),  fps, config: SPRINGS.text });
  const h1S = spring({ frame: Math.max(0, frame - (SCENE_START + 18)), fps, config: SPRINGS.text });
  const h2S = spring({ frame: Math.max(0, frame - (SCENE_START + 30)), fps, config: SPRINGS.text });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity, fontFamily: fontStack }}>

      {/* Eyebrow with pulsing square dot */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, opacity: ewS, transform: `translateY(${interpolate(ewS,[0,1],[24,0])}px)` }}>
        <div style={{ width: 7, height: 7, backgroundColor: COLORS.accent, borderRadius: 1, opacity: dotPulse, boxShadow: "0 0 6px rgba(0,207,206,0.5)" }} />
        <span style={{ fontSize: 18, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: COLORS.textDim, textShadow: GLOW_TEXT_MINIMAL }}>
          {CONFIG.copy.s4.ew}
        </span>
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 68, fontWeight: 300, color: COLORS.textPrimary, lineHeight: 1.1, letterSpacing: "-0.01em", opacity: h1S, transform: `translateY(${interpolate(h1S,[0,1],[24,0])}px)` }}>
          {CONFIG.copy.s4.l1}
        </div>
        <div style={{ fontSize: 80, fontWeight: 700, color: COLORS.accent, lineHeight: 1.1, letterSpacing: "-0.02em", textShadow: GLOW_TEXT_SOFT, opacity: h2S, transform: `translateY(${interpolate(h2S,[0,1],[24,0])}px)` }}>
          {CONFIG.copy.s4.l2}
        </div>
      </div>

      {/* Browser — glass panel, 760×559px */}
      <div
        style={{
          width: BROWSER.width,
          height: BROWSER.totalHeight,
          background: "rgba(5, 22, 20, 0.36)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0,207,206,0.22)",
          borderRadius: BROWSER.borderRadius,
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "0 8px 44px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 0 1px rgba(0,207,206,0.06)",
          opacity: interpolate(mockupS, [0, 0.3, 1], [0, 0, 1]),
          transform: `translateY(${interpolate(mockupS,[0,1],[50,0])}px) scale(${interpolate(mockupS,[0,1],[0.97,1])})`,
        }}
      >
        {/* Header bar — 19px */}
        <div style={{ height: BROWSER.headerHeight, background: "rgba(4, 15, 13, 0.70)", display: "flex", alignItems: "center", padding: "0 14px", gap: 6, borderBottom: "1px solid rgba(0,207,206,0.14)" }}>
          {["#FF5F57","#FFBD2E","#28C840"].map((c, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: c }} />
          ))}
          <span style={{ fontSize: 10, color: "#3a5555", marginLeft: 8 }}>{CONFIG.companyUrl} / reclutamiento</span>
        </div>

        {/* Search header — 106px */}
        <div style={{ height: BROWSER.searchBarHeight, padding: "0 16px", display: "flex", flexDirection: "column", justifyContent: "center", borderBottom: "1px solid rgba(0,207,206,0.09)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 24, fontWeight: 600, color: COLORS.textPrimary }}>Búsquedas activas</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: COLORS.accent }}>5 DE 247</span>
          </div>
        </div>

        {/* Filter pills — 44px */}
        <div style={{ height: BROWSER.filterBarHeight, padding: "0 16px", display: "flex", alignItems: "center", gap: 7, overflow: "hidden", borderBottom: "1px solid rgba(0,207,206,0.09)" }}>
          {["Todos los roles ▾","Tecnologías ▾","Niveles ▾"].map((f, i) => (
            <div key={i} style={{ fontSize: 13, fontWeight: 500, padding: "3px 9px", background: "rgba(0,207,206,0.05)", border: "1px solid rgba(0,207,206,0.12)", borderRadius: 6, color: COLORS.textDim, whiteSpace: "nowrap" as const }}>
              {f}
            </div>
          ))}
          <div style={{ fontSize: 13, fontWeight: 500, padding: "3px 9px", background: "rgba(0,207,206,0.05)", border: "1px solid rgba(0,207,206,0.12)", borderRadius: 6, color: COLORS.textDim, display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" as const }}>
            <SquareDot size={5} /> Remoto
          </div>
        </div>

        {/* Listing rows — 5 × 78px */}
        <div style={{ transform: `translateY(${scrollY}px)` }}>
          {CONFIG.browserListings.map((listing, i) => {
            const rowGlowStyle = getRowGlow(i, frame, fps);
            const btnGlowSchedule = CONFIG.rowGlowSchedule.find(r => r.row === i);
            const btnActive = btnGlowSchedule
              ? frame >= btnGlowSchedule.start && frame < btnGlowSchedule.start + btnGlowSchedule.duration + 20
              : false;

            return (
              <div
                key={i}
                style={{
                  height: BROWSER.rowHeight,
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid rgba(0,207,206,0.07)",
                  ...rowGlowStyle,
                }}
              >
                <div>
                  <div style={{ marginBottom: 3 }}>
                    <span style={{ fontSize: 20, fontWeight: 400, color: COLORS.textSecondary }}>{listing.company} → </span>
                    <span style={{ fontSize: 20, fontWeight: 600, color: COLORS.textPrimary }}>{listing.role}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 15, fontWeight: 500, color: COLORS.textDim }}>{listing.level}</span>
                    <span style={{ fontSize: 12, color: "#1a3535" }}>·</span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: COLORS.textDim }}>{listing.modality}</span>
                    <span style={{ fontSize: 12, color: "#1a3535" }}>·</span>
                    <SquareDot size={5} />
                    <span style={{ fontSize: 15, fontWeight: 500, color: COLORS.textDim }}>{listing.location}</span>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    padding: "7px 14px",
                    background: btnActive ? COLORS.btnBg : "rgba(0,207,206,0.12)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    color: btnActive ? COLORS.btnText : COLORS.accent,
                    border: `1px solid rgba(0,207,206,${btnActive ? "0" : "0.25"})`,
                    borderRadius: 8,
                    whiteSpace: "nowrap" as const,
                    flexShrink: 0,
                    boxShadow: btnActive ? "0 0 14px rgba(0,207,206,0.45)" : "none",
                  }}
                >
                  Postularme
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
