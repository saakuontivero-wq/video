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
      background: COLORS.cardBg,
      border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: CARD.borderRadius,
      padding: "20px 22px",
      boxSizing: "border-box" as const,
      boxShadow: glow
        ? "0 0 0 1px rgba(0,207,206,0.35), 0 4px 20px rgba(0,0,0,0.5)"
        : "0 2px 16px rgba(0,0,0,0.7)",
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
