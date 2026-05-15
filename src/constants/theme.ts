// Colors measured pixel-by-pixel from reference video (480×848) scaled ×1.833

export const COLORS = {
  outerBg:       '#050505',
  innerBg:       '#030e0b',
  gradientPeak:  '#133830',
  gradientMid:   '#0c2923',
  accent:        '#3de9c2',
  cardBg:        '#0b221d',
  cardBorder:    '#1a3530',
  cardBgAlt:     '#0a1f1b',
  cardHover:     '#0d2820',
  textPrimary:   '#ffffff',
  textSecondary: '#aabbaa',
  btnBg:         '#4fddbd',
  btnText:       '#051c17',
  progressFill:  '#3de9c2',
};

export const SPRINGS = {
  text:  { damping: 18, stiffness: 120, mass: 1.0 },
  ui:    { damping: 15, stiffness: 100, mass: 1.0 },
  card:  { damping: 13, stiffness: 130, mass: 0.8 },
  micro: { damping: 10, stiffness: 200, mass: 0.5 },
};

export const CARD = {
  width:        352,
  height:       132,
  borderRadius: 18,
  gap:          22,
  rowGap:       20,
  dotSize:      8,
};

export const BROWSER = {
  width:           760,
  borderRadius:    18,
  headerHeight:    44,
  rowHeight:       73,
  btnBorderRadius: 10,
};

export const UPLOAD_CARD = {
  width:        733,
  borderRadius: 18,
  padding:      '32px 36px',
  barHeight:    6,
};

export const CONFIG = {
  companyUrl: 'blustudioinc.com',

  canvas:  { width: 1080, height: 1920 },
  inner:   { x: 100, y: 100, width: 880, height: 1720, borderRadius: 60 },
  content: { padding: 60, width: 760, height: 1600 },

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
    { company: 'ASUS Argentina', role: 'Account Manager — B2B',   level: 'Semi Senior', modality: 'Remoto',     location: 'AMBA',     highlight: false },
    { company: 'Healthtech',     role: 'Full Stack Engineer',      level: 'Semi Senior', modality: 'Híbrido',    location: 'CABA',     highlight: true  },
    { company: 'E-commerce',     role: 'Data Analyst',             level: 'Semi Senior', modality: 'Presencial', location: 'Córdoba',  highlight: false },
    { company: 'SaaS Platform',  role: 'Product Designer (UX/UI)', level: 'Senior',      modality: 'Remoto',     location: 'LATAM',    highlight: false },
    { company: 'Fintech',        role: 'DevOps Engineer',          level: 'Senior',      modality: 'Remoto',     location: 'Global',   highlight: false },
  ],

  upload: {
    fileName:      'Ana_Garcia_CV.pdf',
    size:          '243 KB',
    matchRole:     'Full Stack Engineer',
    matchCompany:  'Healthtech',
    matchCity:     'CABA',
    matchScore:    96,
    totalSearches: 247,
  },

  copy: {
    s1: '¿Buscás talento?',
    s2: { l1: 'Está a tu',             l2: 'alcance.'                  },
    s3: { ew: 'AHORA MISMO',           l1: 'Cientos de empresas',       l2: 'buscan talento.'           },
    s4: { ew: '247 BÚSQUEDAS ACTIVAS', l1: 'Mirá qué se',              l2: 'mueve.'                    },
    s5: { ew: 'TU MOVIMIENTO',         l1: 'Dejanos tu CV.',            l2: 'Nosotros lo compartimos.'  },
    s6: { l1: 'El trabajo que',        l2: 'estás esperando',           l3: 'te espera.',
          ew: 'SUBÍ TU CV · SIN FORMULARIOS' },
  },
};
