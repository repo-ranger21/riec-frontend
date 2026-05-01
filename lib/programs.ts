export type Track = 'allied-health' | 'emergency-medicine' | 'aha';

export type BadgeVariant = 'funded' | 'triple' | 'ri' | 'aha' | 'community';

export type ProgramBadge = {
  label: string;
  variant: BadgeVariant;
};

export type ProgramDetail = {
  label: string;
  value: string;
};

export type ProgramOutcome = {
  text: string;
};

export type ProgramSkill = {
  text: string;
};

export type Program = {
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
    description:
      'Our CNA program provides comprehensive classroom instruction combined with hands-on clinical practice. Students learn to deliver compassionate, skilled patient care in nursing homes, hospitals, and assisted living facilities across Rhode Island. The program prepares graduates to sit for the RI State CNA License Exam and begin working immediately upon certification.',
    track: 'allied-health',
    details: [
      { label: 'Duration', value: '8 Weeks' },
      { label: 'Format', value: 'In-Person Mon–Thu or Hybrid' },
      { label: 'Certification', value: 'RI State CNA License Exam' },
      { label: 'Tuition', value: '100% Grant-Funded' },
    ],
    outcomes: [
      { text: 'Eligible to sit for the Rhode Island State CNA License Examination.' },
      { text: 'Qualified for entry-level CNA positions in hospitals, SNFs, and home health agencies.' },
      { text: 'Foundation for advancement into PCT, Phlebotomy, or EKG certifications.' },
    ],
    skills: [
      { text: 'Vital signs measurement and patient monitoring' },
      { text: 'Safe patient handling, transfers, and positioning' },
      { text: 'Infection control and standard precautions' },
      { text: 'Personal care, hygiene, and activities of daily living (ADLs)' },
      { text: 'Communication and documentation with the nursing team' },
      { text: 'Resident rights and person-centered care principles' },
    ],
    badges: [{ label: '100% Grant-Funded', variant: 'funded' }],
    grantFunded: true,
    prerequisites: [],
    order: 1,
    schemaUrl: 'https://rieducationcenter.org/programs/cna',
  },
  {
    slug: 'pct',
    shortName: 'PCT',
    fullName: 'Patient Care Technician',
    tagline: 'Earn three certifications — CNA, Phlebotomy, and EKG — in one accelerated program.',
    description:
      "The PCT program is RIEC's most comprehensive allied health offering. Students earn triple certification (CNA + Phlebotomy + EKG) in 12 weeks, making them uniquely qualified for high-demand roles in emergency rooms, ICUs, and outpatient clinics. This grant-funded program is designed for students who want maximum career versatility in the shortest timeframe.",
    track: 'allied-health',
    details: [
      { label: 'Duration', value: '12 Weeks' },
      { label: 'Format', value: 'In-Person / Hybrid' },
      { label: 'Certifications', value: 'CNA + Phlebotomy (NHA CPT) + EKG (NHA CET)' },
      { label: 'Tuition', value: '100% Grant-Funded' },
    ],
    outcomes: [
      { text: 'Graduate with three nationally recognized certifications: CNA, CPT, and CET.' },
      { text: 'Qualified for PCT roles in ER, ICU, and acute care hospital settings.' },
      { text: 'Competitive advantage over single-certification candidates in hiring.' },
    ],
    skills: [
      { text: 'All CNA core competencies (patient care, vitals, ADLs)' },
      { text: 'Venipuncture and capillary blood draw techniques' },
      { text: 'EKG lead placement, acquisition, and rhythm recognition' },
      { text: 'Specimen handling, labeling, and chain of custody' },
      { text: 'ER and ICU workflows and acute care protocols' },
      { text: 'Electronic health record (EHR) documentation basics' },
    ],
    badges: [
      { label: 'Triple Cert', variant: 'triple' },
      { label: '100% Grant-Funded', variant: 'funded' },
    ],
    grantFunded: true,
    prerequisites: [],
    order: 2,
    schemaUrl: 'https://rieducationcenter.org/programs/pct',
  },
  {
    slug: 'phlebotomy',
    shortName: 'Phlebotomy',
    fullName: 'Phlebotomy Technician',
    tagline: 'Master the art and science of blood collection for labs, hospitals, and clinics.',
    description:
      'The Phlebotomy Technician program trains students in venipuncture, capillary puncture, and specimen processing. Graduates are prepared to sit for the NHA Certified Phlebotomy Technician (CPT) exam. This focused 4–6 week program is ideal for students seeking quick entry into clinical settings or looking to add phlebotomy to existing healthcare credentials.',
    track: 'allied-health',
    details: [
      { label: 'Duration', value: '4–6 Weeks' },
      { label: 'Format', value: 'In-Person / Hybrid' },
      { label: 'Certification', value: 'NHA Certified Phlebotomy Technician (CPT)' },
      { label: 'Tuition', value: '100% Grant-Funded' },
    ],
    outcomes: [
      { text: 'Eligible to sit for the NHA Certified Phlebotomy Technician (CPT) exam.' },
      { text: 'Qualified for phlebotomist roles in hospitals, labs, and blood donation centers.' },
      { text: 'Stackable credential — pairs with CNA or EKG for broader employability.' },
    ],
    skills: [
      { text: 'Venipuncture techniques for antecubital and alternative sites' },
      { text: 'Capillary puncture (fingerstick and heelstick)' },
      { text: 'Order of draw and tube additives for specimen integrity' },
      { text: 'Specimen labeling, handling, and processing' },
      { text: 'Patient identification and consent procedures' },
      { text: 'Infection control and sharps safety' },
    ],
    badges: [{ label: '100% Grant-Funded', variant: 'funded' }],
    grantFunded: true,
    prerequisites: [],
    order: 3,
    schemaUrl: 'https://rieducationcenter.org/programs/phlebotomy',
  },
  {
    slug: 'ekg',
    shortName: 'EKG Tech',
    fullName: 'EKG Technician',
    tagline: 'Learn 12-lead EKG acquisition and cardiac monitoring for clinical settings.',
    description:
      'The EKG Technician program teaches students to perform 12-lead electrocardiograms, apply telemetry electrodes, and recognize basic cardiac rhythms. Graduates are prepared for the NHA Certified EKG Technician (CET) exam and entry-level roles in cardiology departments, telemetry units, and physician offices.',
    track: 'allied-health',
    details: [
      { label: 'Duration', value: '4 Weeks' },
      { label: 'Format', value: 'In-Person / Hybrid' },
      { label: 'Certification', value: 'NHA Certified EKG Technician (CET)' },
      { label: 'Tuition', value: '100% Grant-Funded' },
    ],
    outcomes: [
      { text: 'Eligible to sit for the NHA Certified EKG Technician (CET) exam.' },
      { text: 'Qualified for EKG tech roles in cardiology, telemetry, and ambulatory care.' },
      { text: 'Stackable credential — combines with CNA or Phlebotomy for PCT-level roles.' },
    ],
    skills: [
      { text: '12-lead EKG electrode placement and acquisition' },
      { text: 'Telemetry monitoring and lead placement' },
      { text: 'Basic cardiac rhythm identification and documentation' },
      { text: 'Patient preparation, skin prep, and artifact reduction' },
      { text: 'Equipment maintenance and troubleshooting' },
      { text: 'Emergency response awareness during monitoring' },
    ],
    badges: [{ label: '100% Grant-Funded', variant: 'funded' }],
    grantFunded: true,
    prerequisites: [],
    order: 4,
    schemaUrl: 'https://rieducationcenter.org/programs/ekg',
  },
  {
    slug: 'emt-basic',
    shortName: 'EMT-Basic',
    fullName: 'Emergency Medical Technician — Basic',
    tagline: 'Train for frontline emergency response across Rhode Island.',
    description:
      "RIEC's EMT-Basic program meets National EMS Education Standards and prepares students for the National Registry EMT (NREMT) certification exam and Rhode Island licensure. Delivered over 16 weeks in evening and weekend sessions, this program accommodates working adults. Clinical and field internship hours are included. No prior medical experience is required.",
    track: 'emergency-medicine',
    details: [
      { label: 'Duration', value: '16 Weeks' },
      { label: 'Format', value: 'Evenings & Weekends' },
      { label: 'Certification', value: 'NREMT (National Registry EMT)' },
      { label: 'Tuition', value: '100% Grant-Funded' },
    ],
    outcomes: [
      { text: 'Eligible for the NREMT cognitive and psychomotor examinations.' },
      { text: 'Qualified for Rhode Island EMT-Basic licensure and field deployment.' },
      { text: 'Foundation for advancement to AEMT-Cardiac or Paramedic programs.' },
    ],
    skills: [
      { text: 'Patient assessment: scene safety, primary and secondary survey' },
      { text: 'Airway management: BVM, OPA/NPA, suction' },
      { text: 'Trauma care: hemorrhage control, splinting, spinal motion restriction' },
      { text: 'Medical emergencies: cardiac arrest, stroke, diabetic, respiratory' },
      { text: 'Obstetric and pediatric emergencies' },
      { text: 'Ambulance operations, ICS, and MCI fundamentals' },
    ],
    badges: [{ label: '100% Grant-Funded', variant: 'funded' }],
    grantFunded: true,
    prerequisites: [],
    order: 5,
    schemaUrl: 'https://rieducationcenter.org/programs/emt-basic',
  },
  {
    slug: 'aemt-cardiac',
    shortName: 'AEMT-Cardiac',
    fullName: 'Advanced EMT — Cardiac (RI-Specific)',
    tagline: "Rhode Island's unique AEMT-Cardiac licensure — ACLS and PALS included.",
    description:
      "The AEMT-Cardiac program is specific to Rhode Island's tiered EMS licensure system. Building on EMT-Basic skills, students learn advanced cardiac interventions, IV/IO access, medication administration, and critical care transport. The program includes ACLS and PALS certification. Graduates are eligible for Rhode Island AEMT-Cardiac licensure.",
    track: 'emergency-medicine',
    details: [
      { label: 'Duration', value: 'Approx. 6 Months' },
      { label: 'Format', value: 'Evenings & Weekends' },
      { label: 'Certifications', value: 'RI AEMT-Cardiac License + ACLS + PALS' },
      { label: 'Tuition', value: '100% Grant-Funded' },
    ],
    outcomes: [
      { text: 'Eligible for Rhode Island AEMT-Cardiac licensure.' },
      { text: 'Certified in ACLS (Advanced Cardiovascular Life Support) and PALS (Pediatric Advanced Life Support).' },
      { text: 'Qualified for advanced EMS roles with BLS and ALS-capable agencies.' },
    ],
    skills: [
      { text: 'IV and IO vascular access and fluid administration' },
      { text: 'Advanced airway: supraglottic devices and CPAP' },
      { text: 'Cardiac monitoring, 12-lead acquisition, and rhythm interpretation' },
      { text: 'Emergency medication administration (epinephrine, nitroglycerin, dextrose)' },
      { text: 'ACLS algorithms: VF/VT, PEA, asystole, bradycardia, tachycardia' },
      { text: 'PALS assessment and resuscitation of pediatric patients' },
    ],
    badges: [
      { label: 'RI-Specific License', variant: 'ri' },
      { label: '100% Grant-Funded', variant: 'funded' },
    ],
    grantFunded: true,
    prerequisites: ['Active Rhode Island EMT-Basic License'],
    order: 6,
    schemaUrl: 'https://rieducationcenter.org/programs/aemt-cardiac',
  },
  {
    slug: 'paramedic',
    shortName: 'Paramedic',
    fullName: 'Paramedic Program',
    tagline: 'The highest level of prehospital care — NREMT-Paramedic preparation.',
    description:
      "RIEC's Paramedic Program is a comprehensive 12–18 month hybrid curriculum that meets National EMS Education Standards. Students master advanced assessment, pharmacology, cardiac and critical care interventions, and emergency management. Graduates are prepared for the NREMT-Paramedic certification exam and Rhode Island Paramedic licensure.",
    track: 'emergency-medicine',
    details: [
      { label: 'Duration', value: '12–18 Months' },
      { label: 'Format', value: 'Hybrid (Online + In-Person Labs)' },
      { label: 'Certification', value: 'NREMT-Paramedic' },
      { label: 'Tuition', value: '100% Grant-Funded' },
    ],
    outcomes: [
      { text: 'Eligible for the NREMT-Paramedic cognitive and psychomotor examinations.' },
      { text: 'Qualified for Rhode Island Paramedic licensure and ALS unit deployment.' },
      { text: 'Prepared for supervisory, flight, critical care, or community paramedicine roles.' },
    ],
    skills: [
      { text: 'Advanced airway management: RSI, endotracheal intubation, surgical airway' },
      { text: 'Comprehensive cardiac care: 12-lead interpretation, STEMI recognition, cardioversion' },
      { text: 'Advanced pharmacology: 40+ emergency medications, calculations, and protocols' },
      { text: 'Trauma management: needle decompression, tourniquet, hemostatic agents' },
      { text: 'Critical care transport and inter-facility transfers' },
      { text: 'Medical direction interface, documentation, and quality improvement' },
    ],
    badges: [{ label: '100% Grant-Funded', variant: 'funded' }],
    grantFunded: true,
    prerequisites: ['Active Rhode Island EMT-Basic License'],
    order: 7,
    schemaUrl: 'https://rieducationcenter.org/programs/paramedic',
  },
  {
    slug: 'aha',
    shortName: 'AHA Training',
    fullName: 'American Heart Association Training Center',
    tagline: 'BLS, ACLS, PALS, and Heartsaver certifications open to the whole community.',
    description:
      'RIEC is an authorized American Heart Association Training Center offering BLS for Healthcare Providers, ACLS, PALS, and Heartsaver CPR/AED courses. Classes are open to healthcare professionals, students, and community members alike. Courses are delivered in person with hands-on skills stations and immediate certification cards.',
    track: 'aha',
    details: [
      { label: 'Duration', value: '4–8 Hours (varies by course)' },
      { label: 'Format', value: 'In-Person' },
      { label: 'Courses', value: 'BLS, ACLS, PALS, Heartsaver CPR/AED' },
      { label: 'Open To', value: 'Community, Students & Professionals' },
    ],
    outcomes: [
      { text: 'Receive official AHA certification cards valid for 2 years.' },
      { text: 'Competent in life-saving skills: CPR, AED use, and emergency response.' },
    ],
    skills: [
      { text: 'High-quality CPR for adults, children, and infants' },
      { text: 'AED operation and defibrillation technique' },
      { text: 'Relief of foreign-body airway obstruction' },
      { text: 'BVM ventilation with 1 and 2 rescuers' },
      { text: 'ACLS algorithms and team dynamics (ACLS course)' },
      { text: 'Pediatric assessment and resuscitation (PALS course)' },
    ],
    badges: [
      { label: 'AHA Authorized', variant: 'aha' },
      { label: 'Open to Community', variant: 'community' },
    ],
    grantFunded: false,
    prerequisites: [],
    order: 8,
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
    description:
      'CNA, PCT, Phlebotomy, and EKG programs that prepare students for direct patient care roles in hospitals, clinics, and long-term care facilities across Rhode Island.',
    icon: '🏥',
    color: '#0C1B4D',
  },
  'emergency-medicine': {
    title: 'Emergency Medicine Track',
    subtitle: 'Frontline emergency response',
    description:
      "EMT-Basic, AEMT-Cardiac, and Paramedic programs that train students to deliver advanced prehospital care as part of Rhode Island's EMS system.",
    icon: '🚑',
    color: '#1B7A8C',
  },
  aha: {
    title: 'AHA Training Center',
    subtitle: 'Life-saving certifications',
    description:
      'American Heart Association BLS, ACLS, PALS, and Heartsaver courses open to healthcare professionals, students, and the broader Rhode Island community.',
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
