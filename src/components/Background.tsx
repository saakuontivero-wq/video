import React from "react";
import { COLORS } from "../constants/theme";

export const Background: React.FC = () => (
  <>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: COLORS.bgBase,
        background: `radial-gradient(ellipse 70% 50% at 50% 20%, ${COLORS.bgRadial} 0%, ${COLORS.bgBase} 70%)`,
      }}
    />
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,207,206,0.04)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </>
);
