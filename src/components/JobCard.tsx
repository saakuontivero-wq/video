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
      background: "rgba(3, 16, 15, 0.22)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
      border: `1px solid rgba(0,207,206,${glow ? "0.65" : "0.35"})`,
      borderRadius: CARD.borderRadius,
      padding: "20px 22px",
      boxSizing: "border-box" as const,
      boxShadow: glow
        ? "0 0 0 1px rgba(0,207,206,0.20), 0 0 36px rgba(0,207,206,0.30), 0 8px 32px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 0 24px rgba(0,207,206,0.06)"
        : "0 0 0 1px rgba(0,207,206,0.08), 0 0 22px rgba(0,207,206,0.12), 0 6px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 0 16px rgba(0,207,206,0.04)",
      fontFamily: fontStack,
    }}
  >
    <div
      style={{
        fontSize: 16,
        fontWeight: 500,
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        color: COLORS.accent,
        marginBottom: 10,
        textShadow: GLOW_TEXT_MINIMAL,
      }}
    >
      {industry}
    </div>
    <div style={{ fontSize: 29, fontWeight: 600, color: COLORS.textPrimary, lineHeight: 1.1, marginBottom: 12 }}>
      {role}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <SquareDot />
      <span style={{ fontSize: 17, color: COLORS.textSecondary }}>{location}</span>
    </div>
  </div>
);
