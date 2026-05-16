import React from "react";

export const LogoBluRecruitingFull: React.FC<{ width?: number }> = ({ width = 826 }) => {
  const fontSize = Math.round(width * 0.13); // ~107px at 826 → natural height ≈131px

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontWeight: 300,
        fontSize: fontSize,
        letterSpacing: "-0.015em",
        lineHeight: 1,
        whiteSpace: "nowrap" as const,
        filter: "drop-shadow(0 0 12px rgba(0,207,206,0.30))",
      }}
    >
      <span style={{ color: "#ffffff" }}>Blu</span>
      <span style={{ color: "#00CFCE" }}>.</span>
      <span style={{ color: "#ffffff" }}>Recruiting</span>
    </div>
  );
};
