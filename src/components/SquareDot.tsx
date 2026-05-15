import React from "react";

interface SquareDotProps {
  color?: string;
  size?: number;
}

export const SquareDot: React.FC<SquareDotProps> = ({ color = "#00CFCE", size = 7 }) => (
  <span
    style={{
      display: "inline-block",
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: 1,
      flexShrink: 0,
      boxShadow: "0 0 6px rgba(0,207,206,0.5)",
    }}
  />
);
