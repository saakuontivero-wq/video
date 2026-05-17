// ─── Palette — centered on #00CFCE ──────────────────────────────────────────
export const COLORS = {
  outerBg:          '#050505',
  innerBg:          '#020d0d',
  gradientPeak:     'rgba(0,60,58,1)',
  gradientMid:      'rgba(0,40,38,0.8)',
  accent:           '#00CFCE',
  accentDim:        '#00a8a7',
  textPrimary:      '#ffffff',
  textSecondary:    '#7ecfce',
  textDim:          '#4a9998',
  cardBg:           '#041818',
  cardBorder:       '#0d3535',
  cardBorderActive: '#00CFCE',
  browserBg:        '#031414',
  browserHeader:    '#041a1a',
  btnBg:            '#00CFCE',
  btnText:          '#020d0d',
  rowHighlight:     '#061f1f',
};

// ─── Glow helpers ─────────────────────────────────────────────────────────────
export const GLOW_TEXT_SOFT    = '0 0 20px rgba(0,207,206,0.25), 0 0 40px rgba(0,207,206,0.10)';
export const GLOW_TEXT_MINIMAL = '0 0 12px rgba(0,207,206,0.15)';

// ─── Springs ──────────────────────────────────────────────────────────────────
export const SPRINGS = {
  text:  { damping: 18, stiffness: 120, mass: 1.0 },
  ui:    { damping: 15, stiffness: 100, mass: 1.0 },
  card:  { damping: 13, stiffness: 130, mass: 0.8 },
  micro: { damping: 10, stiffness: 200, mass: 0.5 },
};

// ─── Component constants ──────────────────────────────────────────────────────
export const CARD = {
  width: 346, height: 142,
  borderRadius: 14,
  gap: 20,      // gap entre columnas
  rowGap: 16,   // gap entre filas
};

export const BROWSER = {
  width: 760, borderRadius: 16,
  headerHeight: 19, searchBarHeight: 106, filterBarHeight: 44,
  rowHeight: 78, totalHeight: 559,
};

export const UPLOAD = {
  width: 720, height: 334, borderRadius: 16, barHeight: 5,
};

// ─── Layout ────────────────────────────────────────────────────────────────────
export const LAYOUT = {
  canvas:  { width: 1080, height: 1920 },
  inner:   { x: 100, y: 100, width: 880, height: 1720, borderRadius: 60 },
  content: { x: 60, y: 300, width: 760, height: 1120 },
};

// ─── Font ─────────────────────────────────────────────────────────────────────
export const fontStack = `'Helvetica Neue', Helvetica, Arial, sans-serif`;

// ─── App config ────────────────────────────────────────────────────────────────
export const CONFIG = {
  companyUrl: 'blustudioinc.com',

  jobCards: [
    { industry: 'ASUS',       role: 'Account Manager', location: 'Argentina' },
    { industry: 'HEALTHTECH', role: 'Full Stack Eng',   location: 'CABA'     },
    { industry: 'E-COMMERCE', role: 'Data Analyst',     location: 'Córdoba'  },
    { industry: 'SAAS',       role: 'Product Designer', location: 'LATAM'    },
    { industry: 'FINTECH',    role: 'DevOps Engineer',  location: 'Remoto'   },
    { industry: 'RETAIL',     role: 'Growth Lead',      location: 'México'   },
    { industry: 'AGENCY',     role: 'Brand Manager',    location: 'Chile'    },
    { industry: 'STARTUP',    role: 'QA Automation',    location: 'Uruguay'  },
  ],

  browserListings: [
    { company: 'ASUS Argentina', role: 'Account Manager — B2B',   level: 'Semi Senior', modality: 'Remoto',     location: 'AMBA'     },
    { company: 'Healthtech',     role: 'Full Stack Engineer',      level: 'Semi Senior', modality: 'Híbrido',    location: 'CABA'     },
    { company: 'E-commerce',     role: 'Data Analyst',             level: 'Semi Senior', modality: 'Presencial', location: 'Córdoba'  },
    { company: 'SaaS Platform',  role: 'Product Designer (UX/UI)', level: 'Senior',      modality: 'Remoto',     location: 'LATAM'    },
    { company: 'Fintech',        role: 'DevOps Engineer',          level: 'Senior',      modality: 'Remoto',     location: 'Global'   },
  ],

  upload: {
    fileName: 'Ana_Garcia_CV.pdf', size: '243 KB',
    matchRole: 'Full Stack Engineer', matchCompany: 'Healthtech',
    matchCity: 'CABA', matchScore: 96, totalSearches: 247,
  },

  copy: {
    s1: { hook: '¿Buscás trabajo?' },
    s2: { l1: 'Está a tu',             l2: 'alcance.'                  },
    s3: { ew: 'AHORA MISMO',           l1: 'Cientos de empresas',       l2: 'buscan talento.'           },
    s4: { ew: '247 BÚSQUEDAS ACTIVAS', l1: 'Mirá qué se',               l2: 'mueve.'                    },
    s5: { ew: 'TU MOVIMIENTO',         l1: 'Dejanos tu CV.',             l2: 'Nosotros lo compartimos.'  },
    s6: { l1: 'El trabajo que',        l2: 'estás buscando',             l3: 'TE ESPERA',
          cta: 'blustudioinc.com',     ew: 'SUBÍ TU CV · SIN FORMULARIOS' },
  },

  rowGlowSchedule: [
    { row: 0, start: 620, duration: 45 },
    { row: 1, start: 660, duration: 45 },
    { row: 2, start: 700, duration: 35 },
    { row: 3, start: 725, duration: 35 },
    { row: 4, start: 745, duration: 30 },
  ],
};
