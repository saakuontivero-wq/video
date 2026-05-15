import React from "react";
import { COLORS, CARD } from "../constants/theme";

interface JobCardProps {
  industry: string;
  role: string;
  location: string;
  glow?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ industry, role, location, glow }) => (
  <div
    style={{
      width:        CARD.width,
      height:       CARD.height,
      flexShrink:   0,
      background:   COLORS.cardBg,
      border:       `1px solid ${COLORS.cardBorder}`,
      borderRadius: CARD.borderRadius,
      padding:      '22px 24px',
      boxSizing:    'border-box' as const,
      boxShadow:    glow
        ? '0 0 0 1px rgba(61,233,194,0.25), 0 4px 20px rgba(0,0,0,0.5)'
        : '0 2px 12px rgba(0,0,0,0.6)',
    }}
  >
    <div style={{ fontSize: 15, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: COLORS.accent, marginBottom: 8 }}>
      {industry}
    </div>
    <div style={{ fontSize: 29, fontWeight: 600, color: COLORS.textPrimary, lineHeight: 1.1, marginBottom: 10 }}>
      {role}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <div style={{ width: CARD.dotSize, height: CARD.dotSize, borderRadius: '50%', backgroundColor: COLORS.accent, flexShrink: 0 }} />
      <span style={{ fontSize: 16, color: COLORS.textSecondary }}>{location}</span>
    </div>
  </div>
);
