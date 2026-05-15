import React from "react";
import { COLORS, CARD, GLOW_TEXT_MINIMAL, fontStack } from "../constants/theme";
import { SquareDot } from "./SquareDot";

interface JobCardProps {
  industry: string;
  role: string;
  location: string;
  glow?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ industry, role, location, glow }) => (
  <div
    style={{
      width: CARD.width,
      height: CARD.height,
      flexShrink: 0,
      background: glow ? "rgba(8,32,30,0.52)" : "rgba(5,24,22,0.42)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: `1px solid ${glow ? "rgba(0,207,206,0.55)" : "rgba(0,207,206,0.16)"}`,
      borderRadius: CARD.borderRadius,
      padding: "20px 22px",
      boxSizing: "border-box" as const,
      boxShadow: glow
        ? "0 0 0 1px rgba(0,207,206,0.25), 0 0 22px rgba(0,207,206,0.22), 0 6px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)"
        : "0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.03)",
      fontFamily: fontStack,
    }}
  >
    <div
      style={{
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        color: COLORS.accent,
        marginBottom: 8,
        textShadow: GLOW_TEXT_MINIMAL,
      }}
    >
      {industry}
    </div>
    <div style={{ fontSize: 26, fontWeight: 600, color: COLORS.textPrimary, lineHeight: 1.1, marginBottom: 10 }}>
      {role}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <SquareDot />
      <span style={{ fontSize: 14, color: COLORS.textSecondary }}>{location}</span>
    </div>
  </div>
);
