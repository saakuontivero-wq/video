import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, CONFIG } from "../constants/theme";

const SCENE_START = 600;
const CARD_ENTER = 620;
const STATE2_START = 680;

export const UploadCard: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardSpring = spring({ frame: Math.max(0, frame - CARD_ENTER), fps, config: { damping: 12, stiffness: 90 } });

  const isState2 = frame >= STATE2_START;
  const stateFade = interpolate(frame, [STATE2_START - 7, STATE2_START + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const progressValue = isState2
    ? interpolate(frame, [STATE2_START, STATE2_START + 30], [68, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(frame, [CARD_ENTER + 10, STATE2_START - 10], [0, 68], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const matchScore = isState2
    ? Math.round(interpolate(frame, [STATE2_START + 15, STATE2_START + 40], [0, CONFIG.matchScore], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))
    : 0;

  const matchBarWidth = isState2
    ? interpolate(frame, [STATE2_START + 15, STATE2_START + 45], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "140px 36px 60px",
        opacity,
      }}
    >
      {/* Eyebrow */}
      <div style={{ textAlign: "center", marginBottom: 16, opacity: interpolate(frame, [SCENE_START, SCENE_START + 15], [0, 1], { extrapolateRight: "clamp" }), fontSize: 11, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.textSecondary }}>
        TU MOVIMIENTO
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        {["Dejá tu CV.", "Nosotros lo llevamos."].map((line, i) => {
          const s = spring({ frame: Math.max(0, frame - (SCENE_START + 10 + i * 12)), fps, config: { damping: 14, stiffness: 120 } });
          return (
            <div key={i} style={{ fontSize: 48, fontWeight: i === 1 ? 800 : 300, color: i === 1 ? COLORS.accent : COLORS.textPrimary, lineHeight: 1.2, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)` }}>
              {line}
            </div>
          );
        })}
      </div>

      {/* Card */}
      <div
        style={{
          background: COLORS.cardBg,
          border: `1px dashed ${COLORS.cardBorder}`,
          borderRadius: 14,
          padding: "28px 24px",
          opacity: cardSpring,
          transform: `translateY(${interpolate(cardSpring, [0, 1], [60, 0])}px)`,
        }}
      >
        {/* Upload icon */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v12M8 8l4-4 4 4" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h16" stroke={COLORS.accent} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Status title */}
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary }}>
            {isState2 ? "Encontramos tu match" : "Analizando perfil..."}
          </div>
          <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 4 }}>
            {isState2 ? "1 oportunidad compatible" : `Cruzando con ${CONFIG.totalSearches} búsquedas`}
          </div>
        </div>

        {/* PDF row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0 10px", padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: `1px solid ${COLORS.cardBorder}` }}>
          <div style={{ width: 32, height: 36, background: "#DC2626", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>PDF</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.textPrimary }}>{CONFIG.cvFileName}</div>
            <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{CONFIG.cvSize}{!isState2 ? " · Subiendo..." : ""}</div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: isState2 ? COLORS.accent : COLORS.textSecondary }}>
            {isState2 ? "✓ OK" : `${Math.round(progressValue)}%`}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, background: COLORS.cardBorder, borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ height: "100%", width: `${progressValue}%`, background: COLORS.accent, borderRadius: 4, transition: "width 0.1s" }} />
        </div>

        {/* Match row (state 2 only) */}
        {isState2 && (
          <div
            style={{
              padding: "12px 14px",
              background: "rgba(0,207,206,0.06)",
              border: `1px solid ${COLORS.accent}`,
              borderRadius: 10,
              opacity: stateFade,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary }}>{CONFIG.matchRole}</div>
                <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{CONFIG.matchCompany} · {CONFIG.matchCity}</div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.accent }}>{matchScore}%</div>
            </div>
            <div style={{ height: 3, background: COLORS.cardBorder, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${matchBarWidth}%`, background: COLORS.accent, borderRadius: 4 }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
