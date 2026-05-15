import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, SPRINGS, BROWSER, CONFIG } from "../constants/theme";

const SCENE_START    = 420;
const MOCKUP_ENTER   = 440;
const HIGHLIGHT_START = 500;
const HIGHLIGHT_END  = 560;
const SCROLL_END     = 590;

export const BrowserMockup: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dotPulse   = interpolate((frame % 36) / 36, [0, 0.5, 1], [1, 0.2, 1]);
  const scrollY    = interpolate(frame, [HIGHLIGHT_START, SCROLL_END], [0, -12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mockupS    = spring({ frame: Math.max(0, frame - MOCKUP_ENTER), fps, config: SPRINGS.ui });
  const highlightS = spring({ frame: Math.max(0, frame - HIGHLIGHT_START), fps, config: SPRINGS.micro });
  const rowScale   = interpolate(highlightS, [0, 0.5, 1], [1, 1.022, 1]);
  const isHighlighting = frame >= HIGHLIGHT_START && frame <= HIGHLIGHT_END;

  const eyebrowS  = spring({ frame: Math.max(0, frame - (SCENE_START + 5)), fps, config: SPRINGS.text });
  const heading1S = spring({ frame: Math.max(0, frame - (SCENE_START + 12)), fps, config: SPRINGS.text });
  const heading2S = spring({ frame: Math.max(0, frame - (SCENE_START + 24)), fps, config: SPRINGS.text });

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50, opacity }}>

      {/* Eyebrow with pulsing dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, opacity: eyebrowS, transform: `translateY(${interpolate(eyebrowS,[0,1],[28,0])}px)` }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.accent, opacity: dotPulse }} />
        <span style={{ fontSize: 20, fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: COLORS.textSecondary }}>
          {CONFIG.copy.s4.ew}
        </span>
      </div>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 70, fontWeight: 300, color: COLORS.textPrimary, lineHeight: 1.1, opacity: heading1S, transform: `translateY(${interpolate(heading1S,[0,1],[28,0])}px)` }}>
          {CONFIG.copy.s4.l1}
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, color: COLORS.accent, lineHeight: 1.1, opacity: heading2S, transform: `translateY(${interpolate(heading2S,[0,1],[28,0])}px)` }}>
          {CONFIG.copy.s4.l2}
        </div>
      </div>

      {/* Browser frame — 760px, no EN VIVO badge */}
      <div
        style={{
          width: BROWSER.width,
          background: COLORS.cardBgAlt,
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: BROWSER.borderRadius,
          overflow: 'hidden',
          flex: 1,
          opacity: interpolate(mockupS, [0, 0.25, 1], [0, 0, 1]),
          transform: `translateY(${interpolate(mockupS, [0,1], [55,0])}px) scale(${interpolate(mockupS,[0,1],[0.97,1])})`,
        }}
      >
        {/* Title bar — dots + URL, no badge */}
        <div style={{ height: BROWSER.headerHeight, background: '#07211c', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 8, borderBottom: `1px solid ${COLORS.cardBorder}` }}>
          {['#FF5F57', '#FFBD2E', '#28C840'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
          ))}
          <span style={{ fontSize: 13, color: '#3a4a45', marginLeft: 10 }}>{CONFIG.companyUrl} / reclutamiento</span>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 18px', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 26, fontWeight: 600, color: COLORS.textPrimary }}>Búsquedas activas</span>
            <span style={{ fontSize: 18, fontWeight: 600, color: COLORS.accent }}>5 DE 247</span>
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' as const }}>
            {['Todos los roles ▾', 'Tecnologías ▾', 'Niveles ▾', '● Remoto'].map((f, i) => (
              <div key={i} style={{ fontSize: 16, fontWeight: 500, padding: '5px 12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${COLORS.cardBorder}`, borderRadius: 8, color: COLORS.textSecondary }}>
                {f}
              </div>
            ))}
          </div>

          {/* Listing rows */}
          <div style={{ transform: `translateY(${scrollY}px)` }}>
            {CONFIG.browserListings.map((listing, i) => {
              const isH   = listing.highlight;
              const active = isH && frame >= HIGHLIGHT_START;
              const btnGlowOpacity = active ? interpolate(highlightS, [0, 1], [0, 0.3]) : 0;

              return (
                <div
                  key={i}
                  style={{
                    height:      BROWSER.rowHeight,
                    padding:     '0 14px',
                    marginBottom: 7,
                    background:  active ? COLORS.cardHover : 'rgba(255,255,255,0.015)',
                    border:      `1px solid ${active ? 'transparent' : '#0e2820'}`,
                    borderRadius: 10,
                    display:     'flex',
                    alignItems:  'center',
                    justifyContent: 'space-between',
                    boxShadow:   active
                      ? `0 0 0 1px rgba(61,233,194,0.25), 0 4px 20px rgba(0,0,0,0.5)`
                      : 'none',
                    transform:   isH && isHighlighting ? `scale(${rowScale})` : 'scale(1)',
                    transformOrigin: 'center',
                  }}
                >
                  <div>
                    <div style={{ marginBottom: 4 }}>
                      <span style={{ fontSize: 22, fontWeight: 400, color: COLORS.textSecondary }}>{listing.company} → </span>
                      <span style={{ fontSize: 22, fontWeight: 600, color: COLORS.textPrimary }}>{listing.role}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 18, fontWeight: 500, color: COLORS.textSecondary }}>{listing.level}</span>
                      <span style={{ fontSize: 12, color: '#2a3a35' }}>·</span>
                      <span style={{ fontSize: 18, fontWeight: 500, color: COLORS.textSecondary }}>{listing.modality}</span>
                      <span style={{ fontSize: 12, color: '#2a3a35' }}>·</span>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: COLORS.accent }} />
                      <span style={{ fontSize: 18, fontWeight: 500, color: COLORS.textSecondary }}>{listing.location}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize:     20,
                      fontWeight:   700,
                      padding:      '10px 18px',
                      background:   COLORS.btnBg,
                      color:        COLORS.btnText,
                      borderRadius: BROWSER.btnBorderRadius,
                      whiteSpace:   'nowrap' as const,
                      flexShrink:   0,
                      boxShadow:    `0 0 14px rgba(61,233,194,${btnGlowOpacity})`,
                    }}
                  >
                    Postularme
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
