import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { COLORS, SPRINGS, UPLOAD_CARD, CONFIG } from "../constants/theme";

const SCENE_START  = 600;
const CARD_ENTER   = 620;
const STATE2_START = 680;

export const UploadCard: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const u = CONFIG.upload;

  const cardS = spring({ frame: Math.max(0, frame - CARD_ENTER), fps, config: SPRINGS.ui });

  const isState2  = frame >= STATE2_START;
  const stateFade = interpolate(frame, [STATE2_START - 8, STATE2_START + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Bar: state A 0→68 (frames 630–660), state B 68→100 (frames 685–705)
  const barA = interpolate(frame, [630, 660], [0, 68],  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barB = interpolate(frame, [685, 705], [68, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barWidth = frame < STATE2_START ? barA : barB;

  // Counter 0→96 over 25 frames
  const matchScore = isState2
    ? Math.round(interpolate(frame, [680, 705], [0, u.matchScore], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))
    : 0;

  const matchBar = isState2
    ? interpolate(frame, [685, 715], [0, u.matchScore], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  const eyebrowS  = spring({ frame: Math.max(0, frame - (SCENE_START + 5)), fps, config: SPRINGS.text });
  const heading1S = spring({ frame: Math.max(0, frame - (SCENE_START + 12)), fps, config: SPRINGS.text });
  const heading2S = spring({ frame: Math.max(0, frame - (SCENE_START + 24)), fps, config: SPRINGS.text });

  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 60, opacity }}>

      {/* Eyebrow */}
      <div style={{ fontSize: 20, fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: COLORS.textSecondary, marginBottom: 18, opacity: eyebrowS, transform: `translateY(${interpolate(eyebrowS,[0,1],[28,0])}px)` }}>
        {CONFIG.copy.s5.ew}
      </div>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 70, fontWeight: 300, color: COLORS.textPrimary, lineHeight: 1.1, opacity: heading1S, transform: `translateY(${interpolate(heading1S,[0,1],[28,0])}px)` }}>
          {CONFIG.copy.s5.l1}
        </div>
        <div style={{ fontSize: 84, fontWeight: 800, color: COLORS.accent, lineHeight: 1.1, opacity: heading2S, transform: `translateY(${interpolate(heading2S,[0,1],[28,0])}px)` }}>
          {CONFIG.copy.s5.l2}
        </div>
      </div>

      {/* Upload card — 733px centered */}
      <div
        style={{
          width:        UPLOAD_CARD.width,
          background:   '#091c18',
          border:       'dashed 1px rgba(61,233,194,0.3)',
          borderRadius: UPLOAD_CARD.borderRadius,
          padding:      UPLOAD_CARD.padding,
          boxSizing:    'border-box' as const,
          boxShadow:    '0 0 0 1px rgba(61,233,194,0.25), inset 0 0 32px rgba(61,233,194,0.04)',
          opacity:      interpolate(cardS, [0, 0.25, 1], [0, 0, 1]),
          transform:    `translateY(${interpolate(cardS,[0,1],[55,0])}px) scale(${interpolate(cardS,[0,1],[0.97,1])})`,
        }}
      >
        {/* Upload icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v12M8 8l4-4 4 4" stroke={COLORS.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h16" stroke={COLORS.accent} strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Status */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 29, fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1.2 }}>
            {isState2 ? 'Encontramos tu match' : 'Analizando perfil...'}
          </div>
          <div style={{ fontSize: 20, color: COLORS.textSecondary, marginTop: 6 }}>
            {isState2 ? '1 oportunidad compatible' : `Cruzando con ${u.totalSearches} búsquedas`}
          </div>
        </div>

        {/* PDF row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, padding: '12px 14px', background: 'rgba(255,255,255,0.025)', borderRadius: 10, border: `1px solid ${COLORS.cardBorder}` }}>
          <div style={{ width: 36, height: 42, background: '#DC2626', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>PDF</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: COLORS.textPrimary }}>{u.fileName}</div>
            <div style={{ fontSize: 16, color: COLORS.textSecondary }}>{u.size} · {isState2 ? 'Procesado' : 'Subiendo...'}</div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: isState2 ? COLORS.accent : COLORS.textSecondary }}>
            {isState2 ? '✓ OK' : `${Math.round(barWidth)}%`}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: UPLOAD_CARD.barHeight, background: '#1a3530', borderRadius: 4, overflow: 'hidden', marginBottom: isState2 ? 20 : 0 }}>
          <div
            style={{
              height:      '100%',
              width:       `${barWidth}%`,
              background:  COLORS.progressFill,
              borderRadius: 4,
              filter:      'drop-shadow(0 0 3px rgba(61,233,194,0.45))',
            }}
          />
        </div>

        {/* Match row — state B */}
        {isState2 && (
          <div
            style={{
              padding:      '14px 16px',
              background:   'rgba(61,233,194,0.04)',
              border:       '1px solid rgba(61,233,194,0.25)',
              borderRadius: 12,
              opacity:      stateFade,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 600, color: COLORS.textPrimary }}>{u.matchRole}</div>
                <div style={{ fontSize: 18, color: COLORS.textSecondary }}>{u.matchCompany} · {u.matchCity}</div>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: COLORS.accent }}>{matchScore}%</div>
            </div>
            <div style={{ height: UPLOAD_CARD.barHeight, background: '#1a3530', borderRadius: 4, overflow: 'hidden' }}>
              <div
                style={{
                  height:      '100%',
                  width:       `${matchBar}%`,
                  background:  COLORS.progressFill,
                  borderRadius: 4,
                  filter:      'drop-shadow(0 0 3px rgba(61,233,194,0.45))',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
