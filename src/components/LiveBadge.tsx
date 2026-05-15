import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../constants/theme";

export const LiveBadge: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();
  const dotOpacity = interpolate((frame % 36) / 36, [0, 0.5, 1], [1, 0.3, 1]);

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 14px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,207,206,0.35)", borderRadius: 999, opacity }}>
      {[0, 1].map((i) => (
        <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: COLORS.accent, opacity: dotOpacity, marginLeft: i === 1 ? -4 : 0 }} />
      ))}
      <span style={{ fontSize: 10, fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: COLORS.textSecondary, marginLeft: 4 }}>
        EN VIVO · BLU
      </span>
    </div>
  );
};
