import React from "react";
import { COLORS } from "../constants/theme";

interface JobCardProps {
  industry: string;
  role: string;
  location: string;
  glow?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ industry, role, location, glow }) => (
  <div
    style={{
      width: 352,
      height: 132,
      flexShrink: 0,
      background: COLORS.cardBg,
      border: "1px solid " + (glow ? "transparent" : COLORS.cardBorder),
      borderRadius: 18,
      padding: "22px 24px",
      boxSizing: "border-box",
      boxShadow: glow
        ? "0 0 0 1px rgba(0,207,206,0.4), 0 4px 24px rgba(0,207,206,0.12)"
        : "none",
    }}
  >
    <div
      style={{
        fontSize: 15,
        fontWeight: 400,
        letterSpacing: "0.12em",
        textTransform: "uppercase" as const,
        color: COLORS.accent,
        marginBottom: 8,
      }}
    >
      {industry}
    </div>
    <div
      style={{
        fontSize: 29,
        fontWeight: 600,
        color: COLORS.textPrimary,
        lineHeight: 1.1,
        marginBottom: 10,
      }}
    >
      {role}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.accent, flexShrink: 0 }} />
      <span style={{ fontSize: 16, color: COLORS.textSecondary }}>{location}</span>
    </div>
  </div>
);
