type Track = 'allied-health' | 'emergency-medicine' | 'aha';

type BadgeVariant = 'funded' | 'triple' | 'ri' | 'aha' | 'community';

type ProgramBadge = {
  label: string;
  variant: BadgeVariant;
};

type ProgramDetail = {
  label: string;
  value: string;
};

type ProgramOutcome = {
  text: string;
};

type ProgramSkill = {
  text: string;
};

type Program = {
  slug: string;
  shortName: string;
  fullName: string;
  tagline: string;
  description: string;
  track: Track;
  details: ProgramDetail[];
  outcomes: ProgramOutcome[];
  skills: ProgramSkill[];
  badges: ProgramBadge[];
  grantFunded: boolean;
  prerequisites: string[];
  order: number;
  schemaUrl: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: 'cna',
    shortName: 'CNA',
    fullName: 'Certified Nursing Assistant',
    tagline: 'Start your healthcare career with foundational bedside care training.',
    description: 'Hands-on CNA training with classroom instruction and clinical practice for Rhode Island learners.',
    track: 'allied-health',
    details: [
      { label: 'Duration', value: '8 Weeks' },
      { label: 'Format', value: 'In-Person / Hybrid' },
    ],
    outcomes: [{ text: 'Eligible for Rhode Island CNA exam pathways.' }],
    skills: [{ text: 'Patient care, vitals, infection control.' }],
    badges: [{ label: '100% Grant-Funded', variant: 'funded' }],
    grantFunded: true,
    prerequisites: [],
    order: 1,
    schemaUrl: 'https://rieducationcenter.org/programs/cna',
  },
  {
    slug: 'emt-basic',
    shortName: 'EMT-Basic',
    fullName: 'Emergency Medical Technician - Basic',
    tagline: 'Train for frontline emergency response roles in Rhode Island.',
    description: 'Evening and weekend EMT-Basic training with field and clinical requirements.',
    track: 'emergency-medicine',
    details: [
      { label: 'Duration', value: '16 Weeks' },
      { label: 'Format', value: 'Evening / Weekend' },
    ],
    outcomes: [{ text: 'Eligible for EMT-Basic licensure pathway.' }],
    skills: [{ text: 'Emergency assessment, airway management, trauma care.' }],
    badges: [{ label: '100% Grant-Funded', variant: 'funded' }],
    grantFunded: true,
    prerequisites: [],
    order: 2,
    schemaUrl: 'https://rieducationcenter.org/programs/emt-basic',
  },
  {
    slug: 'aha',
    shortName: 'AHA Training',
    fullName: 'American Heart Association Training Center',
    tagline: 'BLS, ACLS, and PALS training for providers and the community.',
    description: 'AHA-aligned life-support certifications delivered in person.',
    track: 'aha',
    details: [
      { label: 'Duration', value: '1 Day' },
      { label: 'Format', value: 'In-Person' },
    ],
    outcomes: [{ text: 'Earn AHA certification cards where applicable.' }],
    skills: [{ text: 'CPR, AED, emergency response protocols.' }],
    badges: [
      { label: 'AHA Certified', variant: 'aha' },
      { label: 'Open to Community', variant: 'community' },
    ],
    grantFunded: false,
    prerequisites: [],
    order: 3,
    schemaUrl: 'https://rieducationcenter.org/programs/aha',
  },
];

export const VALID_SLUGS: string[] = PROGRAMS.map((p) => p.slug);

export const TRACKS: Record<Track, {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
}> = {
  'allied-health': {
    title: 'Allied Health Track',
    subtitle: 'Patient-care career pathways',
    description: 'Programs focused on direct patient support and clinical readiness.',
    icon: '🏥',
    color: '#0C1B4D',
  },
  'emergency-medicine': {
    title: 'Emergency Medicine Track',
    subtitle: 'Frontline response roles',
    description: 'Programs for pre-hospital and emergency care teams.',
    icon: '🚑',
    color: '#1B7A8C',
  },
  aha: {
    title: 'AHA Training Center',
    subtitle: 'Life-saving certifications',
    description: 'American Heart Association courses for healthcare and community learners.',
    icon: '❤️',
    color: '#C0392B',
  },
};

export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

export function getProgramsByTrack(track: Track): Program[] {
  return PROGRAMS.filter((p) => p.track === track).sort((a, b) => a.order - b.order);
}

export function getGrantFundedPrograms(): Program[] {
  return PROGRAMS.filter((p) => p.grantFunded);
}

export type { Program, Track, BadgeVariant };
