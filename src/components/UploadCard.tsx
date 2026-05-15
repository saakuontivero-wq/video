import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, SPRINGS, UPLOAD, CONFIG, GLOW_TEXT_MINIMAL, GLOW_TEXT_SOFT, fontStack } from "../constants/theme";

const SCENE_START  = 600;
const CARD_ENTER   = 620;
const STATE2_START = 680;

export const UploadCard: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const u = CONFIG.upload;

  const cardS = spring({ frame: Math.max(0, frame - CARD_ENTER), fps, config: SPRINGS.ui });

  const isState2  = frame >= STATE2_START;
  const stateFade = interpolate(frame, [STATE2_START - 8, STATE2_START + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const barA = interpolate(frame, [630, 660], [0, 68],   { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barB = interpolate(frame, [685, 705], [68, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barWidth = frame < STATE2_START ? barA : barB;

  const matchScore = isState2
    ? Math.round(interpolate(frame, [680, 705], [0, u.matchScore], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
    : 0;
  const matchBar = isState2
    ? interpolate(frame, [685, 715], [0, u.matchScore], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  const ewS = spring({ frame: Math.max(0, frame - (SCENE_START + 8)), fps, config: SPRINGS.text });
  const h1S = spring({ frame: Math.max(0, frame - (SCENE_START + 18)), fps, config: SPRINGS.text });
  const h2S = spring({ frame: Math.max(0, frame - (SCENE_START + 30)), fps, config: SPRINGS.text });

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity, fontFamily: fontStack }}>

      {/* Eyebrow */}
      <div style={{ fontSize: 18, fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: COLORS.textDim, marginBottom: 16, textShadow: GLOW_TEXT_MINIMAL, opacity: ewS, transform: `translateY(${interpolate(ewS,[0,1],[24,0])}px)` }}>
        {CONFIG.copy.s5.ew}
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 68, fontWeight: 300, color: COLORS.textPrimary, lineHeight: 1.1, letterSpacing: "-0.01em", opacity: h1S, transform: `translateY(${interpolate(h1S,[0,1],[24,0])}px)` }}>
          {CONFIG.copy.s5.l1}
        </div>
        <div style={{ fontSize: 80, fontWeight: 700, color: COLORS.accent, lineHeight: 1.1, letterSpacing: "-0.02em", textShadow: GLOW_TEXT_SOFT, opacity: h2S, transform: `translateY(${interpolate(h2S,[0,1],[24,0])}px)` }}>
          {CONFIG.copy.s5.l2}
        </div>
      </div>

      {/* Upload card — 720px, dashed border + inset glow */}
      <div
        style={{
          width: UPLOAD.width,
          background: "#031414",
          border: "1px dashed rgba(0,207,206,0.35)",
          borderRadius: UPLOAD.borderRadius,
          padding: "32px 36px",
          boxSizing: "border-box" as const,
          boxShadow: "0 0 0 1px rgba(0,207,206,0.15), inset 0 0 40px rgba(0,207,206,0.03)",
          opacity: interpolate(cardS, [0, 0.3, 1], [0, 0, 1]),
          transform: `translateY(${interpolate(cardS,[0,1],[50,0])}px) scale(${interpolate(cardS,[0,1],[0.97,1])})`,
        }}
      >
        {/* Upload icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v12M8 8l4-4 4 4" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h16" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Status */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.2 }}>
            {isState2 ? "Encontramos tu match" : "Analizando perfil..."}
          </div>
          <div style={{ fontSize: 18, color: COLORS.textSecondary, marginTop: 5 }}>
            {isState2 ? "1 oportunidad compatible" : `Cruzando con ${u.totalSearches} búsquedas`}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(0,207,206,0.12)", margin: "0 -36px 20px" }} />

        {/* PDF row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, padding: "10px 12px", background: "rgba(0,207,206,0.03)", borderRadius: 10, border: "1px solid rgba(0,207,206,0.08)" }}>
          <div style={{ width: 34, height: 38, background: "#DC2626", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>PDF</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: COLORS.textPrimary }}>{u.fileName}</div>
            <div style={{ fontSize: 14, color: COLORS.textSecondary }}>{u.size} · {isState2 ? "Procesado" : "Subiendo..."}</div>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: isState2 ? COLORS.accent : COLORS.textSecondary }}>
            {isState2 ? "✓ OK" : `${Math.round(barWidth)}%`}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: UPLOAD.barHeight, background: "#0d3535", borderRadius: 3, overflow: "hidden", marginBottom: isState2 ? 16 : 0 }}>
          <div style={{ height: "100%", width: `${barWidth}%`, background: COLORS.accent, borderRadius: 3, filter: "drop-shadow(0 0 4px rgba(0,207,206,0.6))" }} />
        </div>

        {/* Match row — state B */}
        {isState2 && (
          <div style={{ padding: "12px 14px", background: "rgba(0,207,206,0.04)", border: "1px solid rgba(0,207,206,0.2)", borderRadius: 10, opacity: stateFade }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.textPrimary }}>{u.matchRole}</div>
                <div style={{ fontSize: 16, color: COLORS.textSecondary }}>{u.matchCompany} · {u.matchCity}</div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.accent }}>{matchScore}%</div>
            </div>
            <div style={{ height: UPLOAD.barHeight, background: "#0d3535", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${matchBar}%`, background: COLORS.accent, borderRadius: 3, filter: "drop-shadow(0 0 4px rgba(0,207,206,0.6))" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
