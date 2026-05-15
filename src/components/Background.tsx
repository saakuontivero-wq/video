import React from "react";
import { COLORS } from "../constants/theme";

export const Background: React.FC = () => (
  <>
    <div style={{ position: "absolute", inset: 0, backgroundColor: COLORS.innerBg }} />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(
          ellipse 80% 45% at 50% 15%,
          ${COLORS.gradientPeak} 0%,
          ${COLORS.gradientMid}  25%,
          #051411               55%,
          ${COLORS.innerBg}     100%
        )`,
      }}
    />
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke="rgba(0,207,206,0.035)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </>
);
