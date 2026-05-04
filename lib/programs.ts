/**
 * lib/programs.ts
 * Single source of truth for all RIEC program data.
 *
 * Used by:
 *  - app/programs/page.tsx         (programs index)
 *  - app/programs/[slug]/page.tsx  (individual program detail)
 *  - app/sitemap.ts                (dynamic sitemap entries)
 *  - components/ProgramCard.tsx    (card rendering)
 *
 * Security notes:
 *  - All slugs are hardcoded lowercase kebab-case — never user-generated
 *  - External URLs use explicit https:// protocol
 *  - No eval(), no dynamic key construction from user input
 *  - All fields are typed — TypeScript will catch missing/mistyped data at build
 */

/* ─── TYPES ──────────────────────────────────────────────────────────────── */

export type Track = "allied-health" | "emergency-medicine" | "aha";

export type BadgeVariant =
  | "funded"    // 100% Grant-Funded — gold
  | "triple"    // Triple Certification — navy
  | "ri"        // RI Exclusive — teal
  | "aha"       // AHA Certified — red
  | "community" // Open to community — green
  ;

export interface ProgramBadge {
  label: string;
  variant: BadgeVariant;
}

export interface ProgramDetail {
  label: string;
  value: string;
}

export interface ProgramOutcome {
  text: string;
}

export interface ProgramSkill {
  text: string;
}

export interface Program {
  /** URL-safe slug — never user-generated, always kebab-case */
  slug: string;
  /** Short display name used in cards and nav */
  shortName: string;
  /** Full official program name */
  fullName: string;
  /** One-line value proposition for meta description and card subtitle */
  tagline: string;
  /** 2–3 sentence description for the program detail page */
  description: string;
  /** Allied Health, Emergency Medicine, or AHA */
  track: Track;
  /** Key details rendered in a detail table (duration, format, etc.) */
  details: ProgramDetail[];
  /** What the graduate earns / is eligible for */
  outcomes: ProgramOutcome[];
  /** Skills covered in the curriculum */
  skills: ProgramSkill[];
  /** Badge(s) displayed on cards */
  badges: ProgramBadge[];
  /** Whether tuition is grant-fundable */
  grantFunded: boolean;
  /** Any prerequisites (empty array = none) */
  prerequisites: string[];
  /** Sort order within the track */
  order: number;
  /** Schema.org Course URL for JSON-LD on the detail page */
  schemaUrl: string;
}

/* ─── PROGRAM DATA ───────────────────────────────────────────────────────── */

export const PROGRAMS: Program[] = [

  /* ── ALLIED HEALTH TRACK ─────────────────────────────────────────────── */

  {
    slug: "cna",
    shortName: "CNA",
    fullName: "Certified Nursing Assistant",
    tagline: "The foundational credential for entering Rhode Island's healthcare workforce.",
    description:
      "Our 8-week CNA program teaches the core clinical skills required to provide direct " +
      "patient care in nursing homes, hospitals, and assisted living facilities. Students " +
      "complete both classroom theory and hands-on skills lab sessions, then fulfill mandatory " +
      "clinical rotation hours at a partnered Rhode Island nursing facility before sitting " +
      "for the RIDOH state certification exam. Daytime and evening cohorts are available, " +
      "and tuition is 100% covered by workforce development grants for eligible Rhode Island residents.",
    track: "allied-health",
    grantFunded: true,
    prerequisites: [],
    order: 1,
    schemaUrl: "https://rieducationcenter.org/programs/cna",
    badges: [
      { label: "100% Grant-Funded", variant: "funded" },
    ],
    details: [
      { label: "Duration",      value: "8 Weeks" },
      { label: "Format",        value: "In-Person (Mon–Thu) or Hybrid" },
      { label: "Schedule",      value: "Daytime & Evening cohorts available" },
      { label: "Clinical",      value: "Mandatory rotation at RI nursing facility" },
      { label: "Credential",    value: "RI State CNA License (via RIDOH)" },
      { label: "Tuition",       value: "$0 — 100% covered for eligible applicants" },
    ],
    outcomes: [
      { text: "Credential: Rhode Island State CNA License — issued by the Rhode Island Department of Health (RIDOH) upon passing the state competency exam" },
      { text: "Eligible employers: skilled nursing facilities, hospitals, assisted living facilities, home care agencies, hospice programs, and memory care units" },
      { text: "Estimated RI starting wage: $17–$22/hr, with advancement potential after earning the PCT Triple Certification" },
      { text: "Pathway to the Patient Care Technician (PCT) Triple Certification — CNA + Phlebotomy + EKG — for significantly higher starting wages and hospital ER/ICU eligibility" },
      { text: "RIEC provides job placement support, resume review, and employer introductions at no cost until you are placed" },
    ],
    skills: [
      { text: "Patient ADL assistance: bathing, dressing, grooming, oral hygiene, toileting, and perineal care techniques" },
      { text: "Vital sign measurement: manual and electronic blood pressure, pulse, respiratory rate, oral/axillary/tympanic temperature, and pulse oximetry (SpO2)" },
      { text: "Positioning, turning, and pressure injury prevention: repositioning schedules, skin assessment, and protective device application" },
      { text: "Infection control: hand hygiene protocols, PPE selection and donning/doffing, and contact, droplet, and airborne isolation precautions" },
      { text: "Nutrition and hydration: feeding assistance techniques, fluid intake and output documentation, and dysphagia/aspiration awareness" },
      { text: "Patient rights and dignity: HIPAA compliance, privacy protection, cultural sensitivity, and mandatory abuse/neglect recognition and reporting" },
      { text: "Catheter care, peri-care, and incontinence management: indwelling catheter maintenance, specimen collection, and skin integrity protection" },
      { text: "Range of motion exercises, ambulation assistance, and safe transfer techniques using gait belts and mechanical lifts (Hoyer)" },
    ],
  },

  {
    slug: "pct",
    shortName: "PCT / Triple Cert",
    fullName: "Patient Care Technician — Triple Certification",
    tagline: "CNA + Phlebotomy + EKG in one program. The gold standard for ER and ICU hiring.",
    description:
      "The 12-week PCT program is RIEC's most comprehensive Allied Health credential. " +
      "It stacks three nationally recognized certifications — RI CNA License, NHA Certified " +
      "Phlebotomy Technician (CPT), and NHA Certified EKG Technician (CET) — into a single " +
      "accelerated pathway, making graduates highly competitive for emergency room and ICU " +
      "positions across Rhode Island. Students master advanced patient care, venipuncture, and " +
      "12-lead cardiac monitoring before completing a multi-site clinical rotation. Tuition is " +
      "100% covered by workforce development grants for eligible Rhode Island residents.",
    track: "allied-health",
    grantFunded: true,
    prerequisites: [],
    order: 2,
    schemaUrl: "https://rieducationcenter.org/programs/pct",
    badges: [
      { label: "Triple Certification", variant: "triple" },
      { label: "100% Grant-Funded",    variant: "funded" },
    ],
    details: [
      { label: "Duration",        value: "12 Weeks" },
      { label: "Credentials",     value: "RI CNA License + NHA CPT + NHA CET (3 credentials)" },
      { label: "Format",          value: "In-Person with multi-site clinical rotations" },
      { label: "Schedule",        value: "Daytime cohorts" },
      { label: "Ideal For",       value: "Emergency Room, ICU, Hospital Med-Surg" },
      { label: "Tuition",         value: "$0 — 100% covered for eligible applicants" },
    ],
    outcomes: [
      { text: "Credential 1: Rhode Island State CNA License — issued by RIDOH upon passing the state competency exam" },
      { text: "Credential 2: NHA Certified Phlebotomy Technician (CPT) — National Healthcareer Association" },
      { text: "Credential 3: NHA Certified EKG Technician (CET) — National Healthcareer Association" },
      { text: "Eligible employers: hospital emergency departments, intensive care units, cardiac monitoring units, med-surg floors, and procedural areas" },
      { text: "Estimated RI starting wage: $20–$28/hr — triple-certified PCT graduates command a significant premium over single-credential CNAs in RI hospital hiring" },
    ],
    skills: [
      { text: "Advanced CNA skills: complex wound dressing assist, urinary catheter insertion, ostomy management, and sterile technique" },
      { text: "Venipuncture: vacutainer, butterfly (winged infusion set), and syringe draw techniques across all patient populations including pediatric and geriatric" },
      { text: "Capillary puncture: adult fingerstick technique for glucometry and point-of-care testing" },
      { text: "12-lead EKG acquisition: anatomically correct electrode placement on all standard limb (I, II, III, aVR, aVL, aVF) and precordial (V1–V6) positions" },
      { text: "Cardiac rhythm recognition: normal sinus rhythm, common arrhythmias (AFib, PVCs, blocks), ST-segment changes, and artifact identification" },
      { text: "Point-of-care testing: glucometry, urine dipstick analysis, and rapid antigen test administration" },
      { text: "Emergency department patient flow: rapid assessment concepts, fall prevention, patient transport, and triage support protocols" },
      { text: "EHR documentation and HIPAA-compliant verbal and written communication with nursing and physician staff" },
    ],
  },

  {
    slug: "phlebotomy",
    shortName: "Phlebotomy",
    fullName: "Phlebotomy Technician",
    tagline: "A focused 4–6 week course on blood draw techniques and lab processing.",
    description:
      "Our standalone Phlebotomy Technician program is designed for students who want to " +
      "specialize quickly in venipuncture and specimen collection. The curriculum covers blood " +
      "draw techniques across multiple patient populations, specimen handling, lab safety " +
      "protocols, and patient communication — all the competencies required to sit for the " +
      "NHA Certified Phlebotomy Technician (CPT) exam. A lab practicum on a venipuncture " +
      "training arm and live blood draw sessions builds hands-on proficiency before the exam.",
    track: "allied-health",
    grantFunded: true,
    prerequisites: [],
    order: 3,
    schemaUrl: "https://rieducationcenter.org/programs/phlebotomy",
    badges: [
      { label: "100% Grant-Funded", variant: "funded" },
    ],
    details: [
      { label: "Duration",      value: "4–6 Weeks" },
      { label: "Format",        value: "In-Person with lab practicum" },
      { label: "Schedule",      value: "Daytime cohorts" },
      { label: "Credential",    value: "NHA CPT (Certified Phlebotomy Technician)" },
      { label: "Tuition",       value: "$0 — 100% covered for eligible applicants" },
    ],
    outcomes: [
      { text: "Credential: NHA Certified Phlebotomy Technician (CPT) — National Healthcareer Association, upon passing the NHA CPT national exam" },
      { text: "Eligible employers: hospital laboratories, reference laboratories, blood banks, outpatient clinics, dialysis centers, and physician offices" },
      { text: "Estimated RI starting wage: $16–$21/hr" },
      { text: "CPT certification is also a core component of the PCT Triple Certification pathway — graduates can later add CNA and EKG credentials to qualify for hospital PCT positions" },
    ],
    skills: [
      { text: "Venipuncture: vacutainer (evacuated tube system), butterfly (winged infusion set), and syringe techniques for antecubital, hand, and difficult-access sites" },
      { text: "Capillary puncture: adult fingerstick technique and neonatal heel stick procedure" },
      { text: "Specimen integrity: tube additive identification, correct order of draw, mixing requirements, and temperature-sensitive transport" },
      { text: "Blood culture collection: aseptic technique, bottle inoculation procedure, volume requirements, and documentation" },
      { text: "Patient identification: two-identifier protocol, label verification, and requisition matching" },
      { text: "OSHA bloodborne pathogen standards: PPE selection, sharps safety, biohazard disposal, and exposure incident response" },
      { text: "Rejection criteria: hemolysis, clotting, mislabeling, insufficient volume — and the proper recollection process for each" },
    ],
  },

  {
    slug: "ekg",
    shortName: "EKG Technician",
    fullName: "EKG Technician",
    tagline: "Specialized cardiac monitoring training — a targeted 4-week credential.",
    description:
      "Our 4-week EKG Technician program covers everything needed to operate cardiac " +
      "monitoring equipment in hospital and clinical settings. Students learn correct " +
      "12-lead electrode placement, cardiac rhythm interpretation, Holter monitor setup, " +
      "and stress test support. The program prepares graduates to sit for the NHA Certified " +
      "EKG Technician (CET) exam, which is recognized by cardiac care units, emergency " +
      "departments, and outpatient cardiology practices throughout Rhode Island.",
    track: "allied-health",
    grantFunded: true,
    prerequisites: [],
    order: 4,
    schemaUrl: "https://rieducationcenter.org/programs/ekg",
    badges: [
      { label: "100% Grant-Funded", variant: "funded" },
    ],
    details: [
      { label: "Duration",      value: "4 Weeks" },
      { label: "Format",        value: "In-Person" },
      { label: "Schedule",      value: "Daytime cohorts" },
      { label: "Credential",    value: "NHA CET (Certified EKG Technician)" },
      { label: "Tuition",       value: "$0 — 100% covered for eligible applicants" },
    ],
    outcomes: [
      { text: "Credential: NHA Certified EKG Technician (CET) — National Healthcareer Association, upon passing the NHA CET national exam" },
      { text: "Eligible employers: cardiac care units (CCU/PCU), emergency departments, cardiology offices, cardiac catheterization labs, and outpatient stress test centers" },
      { text: "Estimated RI starting wage: $17–$22/hr" },
      { text: "CET certification stacks with the NHA CPT (Phlebotomy) to meet the cardiac monitoring + blood draw requirements for hospital PCT positions" },
    ],
    skills: [
      { text: "12-lead EKG acquisition: anatomically correct electrode placement for all standard limb leads (I, II, III, aVR, aVL, aVF) and precordial leads (V1–V6)" },
      { text: "Normal cardiac rhythm interpretation: sinus rhythm identification, rate calculation, PR interval, QRS duration, QT interval, and axis estimation" },
      { text: "Arrhythmia recognition: atrial fibrillation, atrial flutter, PVCs, PACs, heart blocks (1st, 2nd Mobitz I/II, 3rd degree), and ST-segment changes" },
      { text: "Holter and ambulatory cardiac event monitor: application, patient education, diary instruction, and data transmission/retrieval" },
      { text: "Stress test (exercise tolerance test) support: patient preparation, monitoring during treadmill or pharmacologic stress, and emergency endpoint recognition" },
      { text: "EKG artifact identification: patient movement artifact, poor electrode contact, lead reversal, 60-cycle interference, and corrective troubleshooting" },
      { text: "Cardiac equipment maintenance: gel and paper supply management, machine calibration, device cleaning per infection control standards" },
    ],
  },

  /* ── EMERGENCY MEDICINE TRACK ─────────────────────────────────────────── */

  {
    slug: "emt-basic",
    shortName: "EMT",
    fullName: "Emergency Medical Technician — Basic",
    tagline: "The entry point to a career in emergency services. Evenings and weekends available.",
    description:
      "Our 16-week EMT program prepares students to provide pre-hospital emergency " +
      "care following the National EMS Education Standards (NEMSES). The curriculum covers " +
      "patient assessment, airway management, trauma stabilization, medical emergency response, " +
      "and safe patient transport. Evening and weekend scheduling makes this program accessible " +
      "for working adults. Upon graduation, students are eligible to sit for the NREMT " +
      "cognitive and psychomotor exams and apply for a Rhode Island State EMT license " +
      "through the RIDOH EMS Division.",
    track: "emergency-medicine",
    grantFunded: true,
    prerequisites: [],
    order: 5,
    schemaUrl: "https://rieducationcenter.org/programs/emt-basic",
    badges: [
      { label: "100% Grant-Funded", variant: "funded" },
    ],
    details: [
      { label: "Duration",      value: "Approx. 16 Weeks" },
      { label: "Format",        value: "In-Person" },
      { label: "Schedule",      value: "Evenings & Weekends" },
      { label: "Clinical",      value: "Mandatory ambulance ride-along hours" },
      { label: "Standards",     value: "National EMS Education Standards (NEMSES)" },
      { label: "Credentials",   value: "NREMT EMT + RI State EMT License (RIDOH)" },
      { label: "Tuition",       value: "$0 — 100% covered for eligible applicants" },
    ],
    outcomes: [
      { text: "Credential 1: NREMT EMT certification — National Registry of Emergency Medical Technicians (NREMT), the national standard for EMT licensure" },
      { text: "Credential 2: Rhode Island State EMT License — issued by the Rhode Island Department of Health (RIDOH) EMS Division" },
      { text: "Program follows the National EMS Education Standards (NEMSES), ensuring graduates meet national competency benchmarks" },
      { text: "Eligible employers: private ambulance services, municipal EMS agencies, fire departments (EMT-B level), hospital emergency transport teams, ski patrol, and industrial medicine" },
      { text: "Estimated RI starting wage: $18–$24/hr; higher with fire department appointment or overtime eligibility" },
      { text: "Prerequisite unlocked: NREMT EMT is the required prerequisite for RIEC's Advanced EMT-Cardiac (AEMT-C) program" },
    ],
    skills: [
      { text: "Scene size-up: safety assessment, standard precautions, mechanism of injury or nature of illness analysis, and resource or mutual aid requests" },
      { text: "Primary survey: rapid assessment of airway, breathing, circulation, disability (AVPU and GCS), and exposure — life threats addressed immediately" },
      { text: "Airway management: jaw thrust and head-tilt chin-lift, oropharyngeal and nasopharyngeal airways, bag-valve-mask ventilation, and manual and mechanical suctioning" },
      { text: "Trauma assessment and management: hemorrhage control with direct pressure and tourniquet application, wound packing, splinting, long board and vacuum mattress use, and spinal motion restriction" },
      { text: "Medical emergency management: cardiac arrest CPR and AED use, stroke assessment using the Cincinnati Prehospital Stroke Scale, respiratory distress, diabetic emergencies, and anaphylaxis with epinephrine auto-injector" },
      { text: "Pediatric and obstetric emergencies: pediatric assessment triangle, newborn resuscitation, normal and complicated delivery support, and pediatric AED pads use" },
      { text: "EMT-level pharmacology: oxygen delivery devices (NRB, NC, BVM), aspirin administration, nitroglycerin assist, oral glucose, naloxone (intranasal), and epinephrine auto-injector" },
      { text: "Patient packaging, stretcher and stair chair operation, safe ambulance loading, transport decisions, and hospital radio and radio communication with medical direction" },
    ],
  },

  {
    slug: "aemt-cardiac",
    shortName: "AEMT-Cardiac",
    fullName: "Advanced EMT — Cardiac (Rhode Island Specific)",
    tagline: "RI's unique intermediate licensure — the credential RI fire departments actively seek.",
    description:
      "The Advanced EMT-Cardiac (AEMT-C) is a licensure level unique to Rhode Island, " +
      "administered by the Rhode Island Department of Health (RIDOH) EMS Division. It " +
      "bridges the gap between EMT and Paramedic, significantly expanding scope of " +
      "practice with peripheral IV therapy, advanced airway management, and expanded " +
      "medication administration. AHA ACLS and PALS certifications are included. " +
      "The AEMT-C credential is actively sought by Rhode Island fire departments and " +
      "private ALS ambulance companies and is a critical unlock for fire department " +
      "ALS hiring eligibility in Rhode Island. An active RI EMT license is required.",
    track: "emergency-medicine",
    grantFunded: true,
    prerequisites: ["Active Rhode Island EMT License"],
    order: 6,
    schemaUrl: "https://rieducationcenter.org/programs/aemt-cardiac",
    badges: [
      { label: "RI Exclusive",       variant: "ri" },
      { label: "100% Grant-Funded",  variant: "funded" },
    ],
    details: [
      { label: "Duration",        value: "Approx. 6 Months" },
      { label: "Format",          value: "In-Person" },
      { label: "Schedule",        value: "Evenings & Weekends" },
      { label: "Prerequisite",    value: "Active RI EMT License" },
      { label: "Credentials",     value: "RI AEMT-Cardiac License + AHA ACLS + AHA PALS" },
      { label: "Tuition",         value: "$0 — 100% covered for eligible applicants" },
    ],
    outcomes: [
      { text: "Credential 1: Rhode Island Advanced EMT-Cardiac (AEMT-C) License — issued by the Rhode Island Department of Health (RIDOH) EMS Division; a licensure level unique to Rhode Island" },
      { text: "Credential 2: AHA Advanced Cardiac Life Support (ACLS) Provider certification (2-year) — American Heart Association" },
      { text: "Credential 3: AHA Pediatric Advanced Life Support (PALS) Provider certification (2-year) — American Heart Association" },
      { text: "Eligible employers: Rhode Island fire departments (primary hiring advantage for ALS-level appointments), private ALS ambulance services, hospital-based EMS programs" },
      { text: "Estimated RI starting wage: $22–$30/hr; significantly higher with fire department ALS differential pay" },
    ],
    skills: [
      { text: "Peripheral IV catheter insertion: site selection, catheter sizes, tourniquet technique, successful insertion, and IV securement across difficult-access patients" },
      { text: "IV fluid therapy: normal saline, Lactated Ringer's, D5W; flow rate calculations, drip set use, and fluid bolus indications for shock" },
      { text: "IV medication administration: push dosing techniques, dilution calculations, compatibility checking, and patient monitoring parameters" },
      { text: "Advanced airway management: King LT and i-gel supraglottic airway insertion, direct laryngoscopy for endotracheal intubation, and post-intubation confirmation" },
      { text: "Expanded pharmacology: adenosine, amiodarone, atropine, dopamine, furosemide, glucagon, morphine, midazolam, albuterol, and epinephrine infusion" },
      { text: "12-lead EKG acquisition, basic STEMI recognition, and hospital transmission workflow using cardiac monitor/defibrillators" },
      { text: "AHA ACLS algorithms: cardiac arrest VF/VT and PEA/asystole protocols, tachyarrhythmia and bradyarrhythmia management, post-resuscitation care, STEMI activation" },
      { text: "AHA PALS algorithms: pediatric assessment triangle, systematic approach, recognition and management of respiratory failure, compensated and decompensated shock, and pediatric cardiac arrest" },
    ],
  },

  {
    slug: "paramedic",
    shortName: "Paramedic",
    fullName: "Paramedic Program",
    tagline: "The highest level of pre-hospital care. 12–18 months to the top of the EMS ladder.",
    description:
      "The Paramedic program is the most advanced pre-hospital emergency medicine credential " +
      "available. Students learn to function as the primary medical authority at emergency " +
      "scenes, independently managing complex cardiac, trauma, pediatric, and psychiatric " +
      "presentations with an advanced pharmacology and intervention toolkit. The hybrid " +
      "format combines online didactic coursework with intensive in-person clinical labs, " +
      "hospital rotations in the emergency department, ICU, and OR, and supervised field " +
      "internship hours. Graduates are eligible for the NREMT-Paramedic (NRP) exam and " +
      "Rhode Island Paramedic licensure via the RIDOH EMS Division.",
    track: "emergency-medicine",
    grantFunded: true,
    prerequisites: ["Active Rhode Island EMT License"],
    order: 7,
    schemaUrl: "https://rieducationcenter.org/programs/paramedic",
    badges: [
      { label: "100% Grant-Funded", variant: "funded" },
    ],
    details: [
      { label: "Duration",        value: "12–18 Months" },
      { label: "Format",          value: "Hybrid (Online didactic + In-person clinical labs & field internship)" },
      { label: "Schedule",        value: "Evenings, Weekends & Intensive clinical blocks" },
      { label: "Prerequisite",    value: "Active RI EMT License" },
      { label: "Clinical",        value: "ED, ICU, OR, and supervised field internship rotations" },
      { label: "Credentials",     value: "NREMT-Paramedic (NRP) + RI Paramedic License (RIDOH)" },
      { label: "Tuition",         value: "$0 — 100% covered for eligible applicants" },
    ],
    outcomes: [
      { text: "Credential 1: NREMT-Paramedic (NRP) national certification — National Registry of Emergency Medical Technicians (NREMT)" },
      { text: "Credential 2: Rhode Island Paramedic License — issued by the Rhode Island Department of Health (RIDOH) EMS Division" },
      { text: "Eligible employers: ALS ambulance services, air medical transport programs, critical care interfacility transport, fire/rescue ALS units, mobile integrated health (MIH) programs" },
      { text: "Estimated RI starting wage: $28–$42/hr depending on agency type; ALS differential pay, overtime, and shift differentials frequently add 20–40% on top of base" },
      { text: "Highest scope of practice in pre-hospital medicine — the foundation for EMS supervision, flight paramedicine, critical care transport certification, and PA school bridge programs" },
    ],
    skills: [
      { text: "Advanced 12-lead interpretation: STEMI localization by territory, left and right bundle branch blocks, Wolff-Parkinson-White pattern, posterior MI recognition, and paced rhythms" },
      { text: "Critical care pharmacology: 50+ emergency drugs including vasopressors (norepinephrine, dopamine, epinephrine), antiarrhythmics, sedatives, paralytics, RSI agents (succinylcholine, rocuronium), and IV drip calculations" },
      { text: "Advanced airway: direct and video laryngoscopy for endotracheal intubation, surgical cricothyrotomy, percutaneous needle cricothyrotomy, and post-intubation ventilator management" },
      { text: "Trauma management: traumatic cardiac arrest resuscitation, damage control principles, tension pneumothorax needle decompression and chest tube assist, traumatic brain injury management" },
      { text: "Pediatric and neonatal emergencies: neonatal resuscitation (NRP concepts), PALS protocol integration, weight-based pharmacology dosing (Broselow tape), and pediatric airway management" },
      { text: "Behavioral and psychiatric emergencies: verbal de-escalation techniques, chemical restraint protocols (haloperidol, midazolam, ketamine), excited delirium recognition and management" },
      { text: "Obstetric emergencies: eclampsia recognition and magnesium sulfate administration, precipitous delivery complications, shoulder dystocia maneuvers, and postpartum hemorrhage management" },
      { text: "Medical oversight, quality improvement participation, EMS documentation and legal principles, patient advocacy, and paramedicine ethics and leadership" },
    ],
  },

  /* ── AHA TRAINING ─────────────────────────────────────────────────────── */

  {
    slug: "aha",
    shortName: "AHA Training",
    fullName: "American Heart Association Training Center",
    tagline: "BLS, ACLS, PALS, and Heartsaver CPR/AED — open to the community.",
    description:
      "RIEC operates as a licensed American Heart Association (AHA) Training Center, " +
      "offering the full suite of AHA life support certifications for healthcare providers " +
      "and the general public. All courses are delivered in-person per AHA requirements and " +
      "are instructed by AHA-certified instructors. BLS certification is required for " +
      "enrollment in all RIEC Allied Health and EMS programs. AHA courses are open to " +
      "the entire community and are not restricted by grant eligibility requirements; " +
      "contact RIEC directly for current class schedules and community pricing.",
    track: "aha",
    grantFunded: false,
    prerequisites: [],
    order: 8,
    schemaUrl: "https://rieducationcenter.org/programs/aha",
    badges: [
      { label: "AHA Certified",     variant: "aha" },
      { label: "Open to Community", variant: "community" },
    ],
    details: [
      { label: "BLS",          value: "Basic Life Support — for healthcare providers (4–5 hrs)" },
      { label: "ACLS",         value: "Advanced Cardiac Life Support — critical care teams (8–15 hrs)" },
      { label: "PALS",         value: "Pediatric Advanced Life Support — pediatric providers (8–14 hrs)" },
      { label: "Heartsaver",   value: "CPR/AED — general public, community groups (2–4 hrs)" },
      { label: "Format",       value: "In-Person (required by AHA for all courses)" },
      { label: "Instructors",  value: "AHA-certified RIEC instructors" },
      { label: "Pricing",      value: "Community pricing — contact RIEC for current rates" },
    ],
    outcomes: [
      { text: "AHA BLS Provider card (2-year validity) — required for enrollment in all RIEC Allied Health and EMS programs; recognized by every RI healthcare employer" },
      { text: "AHA ACLS Provider card (2-year validity) — American Heart Association; required for nurses, RTs, PAs, NPs, and physicians working in critical care, the OR, or the ED" },
      { text: "AHA PALS Provider card (2-year validity) — American Heart Association; required for providers working with pediatric patients in acute care settings" },
      { text: "Heartsaver CPR/AED card — for community members, teachers, coaches, parents, and lay rescuers; not a healthcare provider credential, but a life-saving skill" },
      { text: "Note: AHA courses are open to the entire community without income-based eligibility requirements. These courses are not grant-funded. Contact RIEC for current schedule and pricing." },
    ],
    skills: [
      { text: "High-quality chest compressions: correct depth (≥2 inches for adults, ~1.5 inches for infants), rate of 100–120/min, complete chest recoil, and minimizing interruptions to less than 10 seconds" },
      { text: "Infant and child CPR: two-finger (single rescuer) and two-thumb encircling (two-rescuer) techniques for infants; adapted compression depth for children" },
      { text: "AED operation: device setup and power-on, correct adult and pediatric pad placement, hands-clear shock delivery protocol, and immediate post-shock CPR resumption" },
      { text: "Bag-valve-mask (BVM) ventilation: proper face mask seal technique, appropriate tidal volume to produce visible chest rise, and correct ventilation rate to avoid over-ventilation" },
      { text: "Foreign-body airway obstruction management: abdominal thrusts (Heimlich maneuver) for conscious adults and children; back blows and chest thrusts for infants" },
      { text: "ACLS megacode execution: cardiac arrest algorithm (shockable: VF/pulseless VT; non-shockable: PEA/asystole), shock energy selection, antiarrhythmic use, team leader and team member roles, and closed-loop communication" },
      { text: "PALS systematic approach: pediatric assessment triangle (appearance, work of breathing, circulation to skin), recognition of respiratory arrest vs. failure vs. upper/lower airway obstruction, and compensated vs. decompensated shock" },
      { text: "Heartsaver first aid and lay responder skills: scene safety assessment, recognition of life-threatening vs. non-life-threatening emergencies, and hands-only CPR for untrained bystanders" },
    ],
  },

] as const satisfies Program[];

/* ─── HELPERS ────────────────────────────────────────────────────────────── */

/**
 * Get a single program by slug.
 * Returns undefined if slug is not found — callers must handle this.
 * Never use this with user-supplied slugs without validating against
 * VALID_SLUGS first to prevent enumeration attacks.
 */
export function getProgramBySlug(slug: string): Program | undefined {
  return PROGRAMS.find((p) => p.slug === slug);
}

/**
 * Whitelist of valid slugs — use this to validate dynamic route params
 * before calling getProgramBySlug with any external input.
 */
export const VALID_SLUGS = PROGRAMS.map((p) => p.slug) as string[];

/**
 * Get all programs in a given track, sorted by order.
 */
export function getProgramsByTrack(track: Track): Program[] {
  return PROGRAMS.filter((p) => p.track === track).sort(
    (a, b) => a.order - b.order
  );
}

/**
 * Get all grant-funded programs.
 */
export function getGrantFundedPrograms(): Program[] {
  return PROGRAMS.filter((p) => p.grantFunded);
}

/**
 * Track metadata — display names and descriptions for the track sections.
 */
export const TRACKS = {
  "allied-health": {
    title: "Allied Health Track",
    subtitle: "The backbone of patient care.",
    description:
      "Four certification pathways covering patient care, cardiac monitoring, and " +
      "blood collection — the foundational skills required in every Rhode Island hospital, " +
      "nursing home, and clinical setting.",
    icon: "🏥",
    color: "#0C1B4D",
  },
  "emergency-medicine": {
    title: "Emergency Medicine Track",
    subtitle: "The frontline of crisis response.",
    description:
      "Three EMS programs taking students from first-response entry level through the " +
      "highest scope of pre-hospital practice. Evenings and weekends available for working adults.",
    icon: "🚑",
    color: "#1B7A8C",
  },
  aha: {
    title: "AHA Training Center",
    subtitle: "Life-saving certifications for everyone.",
    description:
      "American Heart Association BLS, ACLS, PALS, and Heartsaver courses — open to " +
      "healthcare providers and the general community. No grant eligibility required.",
    icon: "❤️",
    color: "#C0392B",
  },
} as const satisfies Record<Track, { title: string; subtitle: string; description: string; icon: string; color: string }>;
