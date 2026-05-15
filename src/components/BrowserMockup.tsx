import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, CONFIG, SPRINGS } from "../constants/theme";

const SCENE_START = 420;
const MOCKUP_ENTER = 440;
const HIGHLIGHT_START = 500;
const SCROLL_END = 590;

export const BrowserMockup: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dotPulse = interpolate((frame % 36) / 36, [0, 0.5, 1], [1, 0.25, 1]);
  const scrollY   = interpolate(frame, [HIGHLIGHT_START, SCROLL_END], [0, -12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const mockupS = spring({ frame: Math.max(0, frame - MOCKUP_ENTER), fps, config: SPRINGS.ui });

  // Micro spring for row highlight
  const highlightS = spring({ frame: Math.max(0, frame - HIGHLIGHT_START), fps, config: SPRINGS.micro });
  const rowScale    = interpolate(highlightS, [0, 0.5, 1], [1, 1.025, 1]);
  const isHighlighting = frame >= HIGHLIGHT_START && frame <= HIGHLIGHT_START + 60;

  const eyebrowOpacity = interpolate(frame, [SCENE_START, SCENE_START + 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        opacity,
      }}
    >
      {/* Eyebrow with pulsing dot */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 18,
          opacity: eyebrowOpacity,
        }}
      >
        <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: COLORS.accent, opacity: dotPulse }} />
        <span style={{ fontSize: 20, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: COLORS.textSecondary }}>
          {CONFIG.copy.scene4.eyebrow}
        </span>
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        {[CONFIG.copy.scene4.line1, CONFIG.copy.scene4.line2].map((line, i) => {
          const s = spring({ frame: Math.max(0, frame - (SCENE_START + 10 + i * 14)), fps, config: SPRINGS.text });
          return (
            <div key={i} style={{ fontSize: i === 1 ? 84 : 70, fontWeight: i === 1 ? 800 : 300, color: i === 1 ? COLORS.accent : COLORS.textPrimary, lineHeight: 1.1, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [28, 0])}px)` }}>
              {line}
            </div>
          );
        })}
      </div>

      {/* Browser frame — 760px wide */}
      <div
        style={{
          width: 760,
          background: COLORS.cardBg,
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: 18,
          overflow: "hidden",
          flex: 1,
          opacity: interpolate(mockupS, [0, 0.3, 1], [0, 0, 1]),
          transform: `translateY(${interpolate(mockupS, [0, 1], [60, 0])}px) scale(${interpolate(mockupS, [0, 1], [0.97, 1])})`,
        }}
      >
        {/* Title bar — NO EN VIVO badge */}
        <div
          style={{
            height: 44,
            background: "#061510",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            borderBottom: `1px solid ${COLORS.cardBorder}`,
            gap: 8,
          }}
        >
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c }} />
          ))}
          <span style={{ fontSize: 14, color: "#444", marginLeft: 10 }}>{CONFIG.companyUrl} / reclutamiento</span>
        </div>

        {/* Content */}
        <div style={{ padding: "16px 18px", overflow: "hidden" }}>
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 26, fontWeight: 600, color: COLORS.textPrimary }}>Búsquedas activas</span>
            <span style={{ fontSize: 18, fontWeight: 500, color: COLORS.accent }}>5 DE 247</span>
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" as const }}>
            {["Todos los roles ▾", "Tecnologías ▾", "Niveles ▾", "● Remoto"].map((f, i) => (
              <div key={i} style={{ fontSize: 16, fontWeight: 500, padding: "5px 12px", background: "rgba(255,255,255,0.03)", border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, color: COLORS.textSecondary }}>
                {f}
              </div>
            ))}
          </div>

          {/* Listings */}
          <div style={{ transform: `translateY(${scrollY}px)` }}>
            {CONFIG.browserListings.map((listing, i) => {
              const isH = listing.highlight;
              const active = isH && frame >= HIGHLIGHT_START;
              return (
                <div
                  key={i}
                  style={{
                    height: 73,
                    padding: "0 14px",
                    marginBottom: 8,
                    background: active ? COLORS.cardHover : "rgba(255,255,255,0.02)",
                    border: `1px solid ${active ? "transparent" : COLORS.cardBorder}`,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: active
                      ? "0 0 0 1px rgba(0,207,206,0.4), 0 4px 24px rgba(0,207,206,0.12)"
                      : "none",
                    transform: isH && isHighlighting ? `scale(${rowScale})` : "scale(1)",
                    transformOrigin: "center",
                  }}
                >
                  <div>
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontSize: 22, color: COLORS.textSecondary }}>{listing.company} → </span>
                      <span style={{ fontSize: 22, fontWeight: 600, color: COLORS.textPrimary }}>{listing.role}</span>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 18, fontWeight: 500, color: COLORS.textSecondary }}>{listing.level}</span>
                      <span style={{ fontSize: 14, color: COLORS.cardBorder }}>·</span>
                      <span style={{ fontSize: 18, fontWeight: 500, color: COLORS.textSecondary }}>{listing.modality}</span>
                      <span style={{ fontSize: 14, color: COLORS.cardBorder }}>·</span>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: COLORS.accent }} />
                      <span style={{ fontSize: 18, fontWeight: 500, color: COLORS.textSecondary }}>{listing.location}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      padding: "12px 20px",
                      background: COLORS.accent,
                      color: "#000",
                      borderRadius: 10,
                      whiteSpace: "nowrap" as const,
                      flexShrink: 0,
                      boxShadow: active ? "0 0 16px rgba(0,207,206,0.25)" : "none",
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
