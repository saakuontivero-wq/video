export const COLORS = {
  bgOuter: "#050505",
  bgBase: "#041A16",
  bgRadial: "#0A3530",
  accent: "#00CFCE",
  textPrimary: "#FFFFFF",
  textSecondary: "#AABBAA",
  cardBg: "#0B2820",
  cardBorder: "#1A4035",
  cardHover: "#0D2420",
};

export const SPRINGS = {
  text:  { damping: 18, stiffness: 120, mass: 1 },
  ui:    { damping: 14, stiffness: 100, mass: 1 },
  card:  { damping: 12, stiffness: 130, mass: 0.8 },
  micro: { damping: 10, stiffness: 200, mass: 0.5 },
};

export const CONFIG = {
  accentColor: "#00CFCE",
  companyUrl: "blustudioinc.com",

  canvas:  { width: 1080, height: 1920 },
  inner:   { x: 100, y: 100, width: 880, height: 1720, borderRadius: 60 },
  content: { padding: 60, width: 760, height: 1600 },

  jobCards: [
    { industry: "ASUS",       role: "Account Manager", location: "Argentina" },
    { industry: "HEALTHTECH", role: "Full Stack Eng",   location: "CABA"     },
    { industry: "E-COMMERCE", role: "Data Analyst",     location: "Córdoba"  },
    { industry: "SAAS",       role: "Product Designer", location: "LATAM"    },
    { industry: "FINTECH",    role: "DevOps Engineer",  location: "Remoto"   },
    { industry: "RETAIL",     role: "Growth Lead",      location: "México"   },
    { industry: "AGENCY",     role: "Brand Manager",    location: "Chile"    },
    { industry: "STARTUP",    role: "QA Automation",    location: "Uruguay"  },
  ],

  browserListings: [
    { company: "ASUS Argentina", role: "Account Manager — B2B",   level: "Semi Senior", modality: "Remoto",     location: "AMBA",     highlight: false },
    { company: "Healthtech",     role: "Full Stack Engineer",      level: "Semi Senior", modality: "Híbrido",    location: "CABA",     highlight: true  },
    { company: "E-commerce",     role: "Data Analyst",             level: "Semi Senior", modality: "Presencial", location: "Córdoba",  highlight: false },
    { company: "SaaS Platform",  role: "Product Designer (UX/UI)", level: "Senior",      modality: "Remoto",     location: "LATAM",    highlight: false },
    { company: "Fintech",        role: "DevOps Engineer",          level: "Senior",      modality: "Remoto",     location: "Global",   highlight: false },
  ],

  upload: {
    cvFileName:    "Ana_Garcia_CV.pdf",
    cvSize:        "243 KB",
    matchRole:     "Full Stack Engineer",
    matchCompany:  "Healthtech",
    matchCity:     "CABA",
    matchScore:    96,
    totalSearches: 247,
  },

  copy: {
    scene1:  "¿Buscás talento?",
    scene2:  { line1: "Está a tu",           line2: "alcance."                  },
    scene3:  { eyebrow: "AHORA MISMO",       line1: "Cientos de empresas",      line2: "buscan talento."           },
    scene4:  { eyebrow: "247 BÚSQUEDAS ACTIVAS", line1: "Mirá qué se",          line2: "mueve."                    },
    scene5:  { eyebrow: "TU MOVIMIENTO",     line1: "Dejanos tu CV.",           line2: "Nosotros lo compartimos."  },
    closing: { line1: "El trabajo que", line2: "estás esperando", line3: "te espera.", eyebrow: "SUBÍ TU CV · SIN FORMULARIOS" },
  },
};
