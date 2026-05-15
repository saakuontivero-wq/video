import React from "react";
import { COLORS } from "../constants/theme";

interface JobCardProps {
  industry: string;
  role: string;
  location: string;
  style?: React.CSSProperties;
}

export const JobCard: React.FC<JobCardProps> = ({ industry, role, location, style }) => {
  return (
    <div
      style={{
        background: COLORS.cardBg,
        border: `1px solid ${COLORS.cardBorder}`,
        borderRadius: 12,
        padding: "14px 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        flex: 1,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 10,
          fontWeight: 400,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: COLORS.accent,
          marginBottom: 6,
        }}
      >
        {industry}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: COLORS.textPrimary,
          marginBottom: 8,
          lineHeight: 1.2,
        }}
      >
        {role}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: COLORS.accent,
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 11, color: COLORS.textSecondary }}>
          {location}
        </span>
      </div>
    </div>
  );
};
