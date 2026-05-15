import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, CONFIG, SPRINGS } from "../constants/theme";

const SCENE_START = 600;
const CARD_ENTER  = 620;
const STATE2_START = 680;

export const UploadCard: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const u = CONFIG.upload;

  const cardS = spring({ frame: Math.max(0, frame - CARD_ENTER), fps, config: SPRINGS.ui });

  const isState2  = frame >= STATE2_START;
  const stateFade = interpolate(frame, [STATE2_START - 7, STATE2_START + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Bar progress: 0→68 in state A, 68→100 in state B
  const barA = interpolate(frame, [630, 660], [0, 68],  { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barB = interpolate(frame, [685, 705], [68, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barWidth = frame < STATE2_START ? barA : barB;

  // Match score counter 0→96
  const matchScore = isState2
    ? Math.round(interpolate(frame, [680, 705], [0, u.matchScore], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
    : 0;

  // Match bar 0→96%
  const matchBar = isState2
    ? interpolate(frame, [685, 715], [0, u.matchScore], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

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
      <div style={{ fontSize: 20, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: COLORS.textSecondary, marginBottom: 18, opacity: eyebrowOpacity }}>
        {CONFIG.copy.scene5.eyebrow}
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        {[CONFIG.copy.scene5.line1, CONFIG.copy.scene5.line2].map((line, i) => {
          const s = spring({ frame: Math.max(0, frame - (SCENE_START + 10 + i * 14)), fps, config: SPRINGS.text });
          return (
            <div key={i} style={{ fontSize: i === 1 ? 84 : 70, fontWeight: i === 1 ? 800 : 300, color: i === 1 ? COLORS.accent : COLORS.textPrimary, lineHeight: 1.1, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [28, 0])}px)` }}>
              {line}
            </div>
          );
        })}
      </div>

      {/* Upload card — 733px wide, centered in 760px */}
      <div
        style={{
          width: 733,
          background: COLORS.cardBg,
          border: "1px dashed rgba(0,207,206,0.3)",
          borderRadius: 18,
          padding: "28px 28px",
          boxSizing: "border-box",
          boxShadow: "0 0 0 1px rgba(0,207,206,0.3), inset 0 0 40px rgba(0,207,206,0.04)",
          opacity: interpolate(cardS, [0, 0.3, 1], [0, 0, 1]),
          transform: `translateY(${interpolate(cardS, [0, 1], [60, 0])}px) scale(${interpolate(cardS, [0, 1], [0.97, 1])})`,
        }}
      >
        {/* Upload icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v12M8 8l4-4 4 4" stroke={COLORS.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h16" stroke={COLORS.accent} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Status */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 29, fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.2 }}>
            {isState2 ? "Encontramos tu match" : "Analizando perfil..."}
          </div>
          <div style={{ fontSize: 20, color: COLORS.textSecondary, marginTop: 6 }}>
            {isState2 ? "1 oportunidad compatible" : `Cruzando con ${u.totalSearches} búsquedas`}
          </div>
        </div>

        {/* PDF row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, padding: "12px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: `1px solid ${COLORS.cardBorder}` }}>
          <div style={{ width: 36, height: 40, background: "#DC2626", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>PDF</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: COLORS.textPrimary }}>{u.cvFileName}</div>
            <div style={{ fontSize: 16, color: COLORS.textSecondary }}>
              {u.cvSize} · {isState2 ? "Procesado" : "Subiendo..."}
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: isState2 ? COLORS.accent : COLORS.textSecondary }}>
            {isState2 ? "✓ OK" : `${Math.round(barWidth)}%`}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: COLORS.cardBorder, borderRadius: 4, overflow: "hidden", marginBottom: isState2 ? 18 : 0 }}>
          <div
            style={{
              height: "100%",
              width: `${barWidth}%`,
              background: COLORS.accent,
              borderRadius: 4,
              filter: "drop-shadow(0 0 4px rgba(0,207,206,0.5))",
            }}
          />
        </div>

        {/* Match row — state B only */}
        {isState2 && (
          <div
            style={{
              padding: "14px 16px",
              background: "rgba(0,207,206,0.05)",
              border: `1px solid rgba(0,207,206,0.4)`,
              borderRadius: 12,
              opacity: stateFade,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.textPrimary }}>{u.matchRole}</div>
                <div style={{ fontSize: 18, color: COLORS.textSecondary }}>{u.matchCompany} · {u.matchCity}</div>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.accent }}>{matchScore}%</div>
            </div>
            {/* Match bar with glow */}
            <div style={{ height: 6, background: COLORS.cardBorder, borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${matchBar}%`,
                  background: COLORS.accent,
                  borderRadius: 4,
                  filter: "drop-shadow(0 0 4px rgba(0,207,206,0.5))",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
