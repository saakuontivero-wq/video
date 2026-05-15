import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { COLORS, CONFIG } from "../constants/theme";

interface LiveBadgeProps {
  opacity?: number;
}

export const LiveBadge: React.FC<LiveBadgeProps> = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();
  const dotOpacity = interpolate(
    (frame % 36) / 36,
    [0, 0.5, 1],
    [1, 0.3, 1]
  );

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 14px",
        background: "rgba(0,0,0,0.4)",
        border: `1px solid rgba(0,207,206,0.35)`,
        borderRadius: 999,
        opacity,
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: COLORS.accent,
          opacity: dotOpacity,
        }}
      />
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: COLORS.accent,
          opacity: dotOpacity,
          marginLeft: -4,
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: COLORS.textSecondary,
          marginLeft: 4,
        }}
      >
        EN VIVO · {CONFIG.companyName}
      </span>
    </div>
  );
};
