import React from "react";

export const LogoBluRecruitingFull: React.FC<{ width?: number }> = ({ width = 826 }) => {
  const fontSize = Math.round(width * 0.118); // ~97px at 826 — proporcional a la imagen

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        fontFamily: "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontWeight: 300,
        fontSize: fontSize,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        whiteSpace: "nowrap" as const,
        filter: "drop-shadow(0 0 14px rgba(0,207,206,0.28))",
      }}
    >
      <span style={{ color: "#ffffff" }}>Blu</span>
      <span style={{ color: "#00CFCE", fontWeight: 400 }}>.</span>
      <span style={{ color: "#ffffff" }}>Recruiting</span>
    </div>
  );
};
