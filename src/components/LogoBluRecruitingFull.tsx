import React from "react";

// viewBox 0 0 8192 1306.5 — native coordinate space of the BLU paths.
// BLU symbol spans x: 0–1995, y: 37–1012 in this space.
// RECRUITING placed immediately to the right, baseline aligned with BLU bottom.
export const LogoBluRecruitingFull: React.FC<{ width?: number }> = ({ width = 826 }) => {
  const height = Math.round(width * 1306.5 / 8192); // ≈ 132 at width=826

  return (
    <div style={{ filter: "drop-shadow(0 0 10px rgba(0,207,206,0.28))" }}>
      <svg
        viewBox="0 0 8192 1306.5"
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* BLU symbol — paths in native space (x: 0–1995, y: 37–1012) */}
        <path fill="#ffffff" d="M848.5,37.1h165v962.7h-165V37.1Z"/>
        <path fill="#ffffff" d="M1405.5,1012.1c-56.8,0-105.2-9.4-145.1-28.2s-72.7-42.7-98.3-71.5c-25.7-28.9-44.2-60.3-55.7-94.2-11.4-33.9-17.2-66-17.2-96.3v-409.9h165.1v405.7c0,24.7,4.1,45.9,12.4,63.3,8.3,17.4,19.2,32.1,33,44,13.8,11.9,29.8,20.6,48.2,26.1,18.3,5.5,37.5,8.3,57.7,8.3s39.4-2.8,57.7-8.3c18.3-5.5,34.4-14.2,48.2-26.1s24.7-26.6,33-44,12.4-38.5,12.4-63.3v-405.7h165v409.9c0,30.2-5.7,62.4-17.1,96.3s-30.1,65.3-55.7,94.2c-25.7,28.9-58.4,52.7-98.3,71.5-40.1,18.8-88.5,28.2-145.3,28.2Z"/>
        <path fill="#ffffff" d="M773.6,627.1c-8.8-26.6-20.6-50-35.8-70.2-15.2-20.2-32.8-37.1-52.9-50.8-20.2-13.8-41.8-24.2-64.6-31.6,29.4-15.6,52.9-38.2,70.8-68.1,17.9-29.8,26.8-68.1,26.8-114.9s-6-71.7-17.9-102.5c-11.9-30.7-28.9-57.5-50.8-80.5-22-22.9-48.9-40.6-80.5-52.9s-67.2-18.5-106.6-18.5H0v804.5h171.8v158.2h328.8c44,0,83.6-6.9,118.9-20.6,35.3-13.8,65.3-33.2,90.1-58.4,24.7-25.2,43.7-55,57-89.4s19.9-72.2,19.9-113.5c0-34-4.2-64.2-12.9-90.8ZM171.9,195.2h268.2c32.1,0,57.7,9.7,77,28.9,19.2,19.2,28.9,45.4,28.9,78.4s-9.7,57.7-28.9,77c-19.2,19.2-44.9,28.9-77,28.9H171.9v-213.2ZM577.7,804.4c-24.7,24.7-57.7,37.1-99,37.1H171.9v-275h306.7c41.3,0,74.3,12.6,99,37.8,24.7,25.2,37.1,58.9,37.1,101.1,0,41.2-12.4,74.2-37.1,98.9Z"/>
        <rect fill="#00cecd" x="1830.3" y="832.7" width="165" height="158.1"/>

        {/* RECRUITING — starts at x=2200, baseline aligned with BLU bottom (y≈1000) */}
        <text
          x="2200"
          y="1000"
          fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontSize="900"
          fontWeight="700"
          fill="#ffffff"
          letterSpacing="-10"
        >
          RECRUITING
        </text>
      </svg>
    </div>
  );
};
