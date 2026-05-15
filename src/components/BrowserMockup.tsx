import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, CONFIG } from "../constants/theme";

const SCENE_START = 420;
const MOCKUP_ENTER = 440;
const GLOW_START = 500;

export const BrowserMockup: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dotOpacity = interpolate((frame % 36) / 36, [0, 0.5, 1], [1, 0.3, 1]);
  const listScrollY = interpolate(frame, [500, 600], [0, -8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const mockupSpring = spring({
    frame: Math.max(0, frame - MOCKUP_ENTER),
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  const glowPulse = interpolate(
    frame,
    [GLOW_START, GLOW_START + 30, GLOW_START + 60, GLOW_START + 90, GLOW_START + 120],
    [1, 1.04, 1, 1.04, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        padding: "140px 32px 40px",
        opacity,
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          justifyContent: "center",
          marginBottom: 16,
          opacity: interpolate(frame, [SCENE_START, SCENE_START + 15], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: COLORS.accent, opacity: dotOpacity }} />
        <span style={{ fontSize: 11, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.textSecondary }}>
          247 BÚSQUEDAS ACTIVAS
        </span>
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        {["Mirá qué se", "mueve."].map((line, i) => {
          const s = spring({ frame: Math.max(0, frame - (SCENE_START + 10 + i * 12)), fps, config: { damping: 14, stiffness: 120 } });
          return (
            <div key={i} style={{ fontSize: 52, fontWeight: i === 1 ? 800 : 300, color: i === 1 ? COLORS.accent : COLORS.textPrimary, lineHeight: 1.15, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)` }}>
              {line}
            </div>
          );
        })}
      </div>

      {/* Browser frame */}
      <div
        style={{
          background: COLORS.cardBg,
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: 14,
          overflow: "hidden",
          flex: 1,
          opacity: mockupSpring,
          transform: `translateY(${interpolate(mockupSpring, [0, 1], [60, 0])}px)`,
        }}
      >
        {/* Title bar */}
        <div style={{ background: "#071F19", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${COLORS.cardBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: c }} />
            ))}
            <span style={{ fontSize: 11, color: "#666", marginLeft: 10 }}>{CONFIG.companyUrl} / reclutamiento</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 10px", background: "rgba(0,0,0,0.4)", border: `1px solid rgba(0,207,206,0.35)`, borderRadius: 999 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: COLORS.accent, opacity: dotOpacity }} />
            <span style={{ fontSize: 9, letterSpacing: "0.12em", color: COLORS.textSecondary }}>EN VIVO</span>
          </div>
        </div>

        {/* Inner content */}
        <div style={{ padding: "12px 14px", overflowY: "hidden", height: "calc(100% - 44px)" }}>
          {/* Filters row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textPrimary }}>Búsquedas activas</span>
            <span style={{ fontSize: 11, color: COLORS.accent }}>5 de 247</span>
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
            {["Todos los roles ▾", "Tecnologías ▾", "Niveles ▾", "● Remoto"].map((f, i) => (
              <div key={i} style={{ fontSize: 9, padding: "3px 8px", background: COLORS.tagBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6, color: COLORS.textSecondary }}>
                {f}
              </div>
            ))}
          </div>

          {/* Listings */}
          <div style={{ transform: `translateY(${listScrollY}px)`, transition: "transform 0.1s" }}>
            {CONFIG.browserListings.map((listing, i) => {
              const isHighlighted = listing.highlighted;
              const glowStyle = isHighlighted && frame >= GLOW_START ? {
                boxShadow: `0 0 12px rgba(0,207,206,0.4)`,
                borderColor: COLORS.accent,
              } : {};
              return (
                <div
                  key={i}
                  style={{
                    padding: "8px 10px",
                    marginBottom: 8,
                    background: isHighlighted ? "rgba(0,207,206,0.06)" : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isHighlighted ? COLORS.accent : COLORS.cardBorder}`,
                    borderRadius: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    ...glowStyle,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 10, color: COLORS.textSecondary, marginBottom: 2 }}>
                      {listing.company} → <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>{listing.role}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 9, color: COLORS.textSecondary }}>{listing.level}</span>
                      <span style={{ fontSize: 9, color: COLORS.textSecondary }}>·</span>
                      <span style={{ fontSize: 9, color: COLORS.textSecondary }}>{listing.modality}</span>
                      <span style={{ fontSize: 9, color: COLORS.textSecondary }}>·</span>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: COLORS.accent }} />
                      <span style={{ fontSize: 9, color: COLORS.textSecondary }}>{listing.location}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "5px 10px",
                      background: COLORS.accent,
                      color: "#000",
                      borderRadius: 6,
                      transform: isHighlighted && frame >= GLOW_START ? `scale(${glowPulse})` : "scale(1)",
                      whiteSpace: "nowrap",
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
    </div>
  );
};
