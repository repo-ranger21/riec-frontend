'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  program: string;
  schedule: string;
  employed: string;
  ri_resident: boolean;
  income_range: string;
  barriers: string[];
  message: string;
}

const INITIAL: FormData = {
  first_name: '', last_name: '', email: '', phone: '',
  program: '', schedule: '', employed: '',
  ri_resident: false, income_range: '', barriers: [], message: '',
};

const PROGRAMS = [
  { value: 'cna',          label: 'Certified Nursing Assistant (CNA)' },
  { value: 'pct',          label: 'Patient Care Technician (PCT)' },
  { value: 'phlebotomy',   label: 'Phlebotomy Technician' },
  { value: 'ekg',          label: 'EKG Technician' },
  { value: 'emt-basic',    label: 'EMT-Basic' },
  { value: 'aemt-cardiac', label: 'Advanced EMT-Cardiac (RI)' },
  { value: 'paramedic',    label: 'Paramedic Program' },
  { value: 'aha',          label: 'AHA BLS / ACLS / PALS' },
  { value: 'unsure',       label: "I'm not sure yet — help me choose" },
];

const SCHEDULES = [
  { value: 'days',    label: 'Days (Mon–Fri)' },
  { value: 'evenings', label: 'Evenings' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'hybrid',  label: 'Hybrid (online + in-person)' },
  { value: 'flexible', label: 'Flexible / No preference' },
];

const EMPLOYMENT = [
  { value: 'unemployed',   label: 'Currently unemployed' },
  { value: 'part-time',    label: 'Working part-time' },
  { value: 'full-time',    label: 'Working full-time' },
  { value: 'transitioning', label: 'Career transitioning' },
  { value: 'student',      label: 'Current student' },
];

const INCOME_RANGES = [
  { value: 'under-25k', label: 'Under $25,000' },
  { value: '25-35k',    label: '$25,000–$35,000' },
  { value: '35-50k',    label: '$35,000–$50,000' },
  { value: '50-65k',    label: '$50,000–$65,000' },
  { value: 'over-65k',  label: 'Over $65,000' },
];

const BARRIERS = [
  { value: 'transportation', label: '🚌 Transportation' },
  { value: 'childcare',      label: '👶 Childcare' },
  { value: 'employment',     label: '💼 Current employment conflict' },
  { value: 'language',       label: '🌐 English not first language' },
  { value: 'tech',           label: '💻 Limited technology access' },
  { value: 'disability',     label: '♿ Disability accommodation needed' },
];

const STEPS = ['Personal Info', 'Program & Schedule', 'Grant Eligibility'];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  border: '1px solid rgba(12,27,77,0.2)',
  fontSize: 14, color: '#2C2C3A',
  background: '#fff', outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: '#0C1B4D', marginBottom: 6, letterSpacing: '0.02em',
};

const errorStyle: React.CSSProperties = {
  fontSize: 12, color: '#C0392B', marginTop: 4,
  display: 'block',
};

export default function ApplyForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const set = useCallback(<K extends keyof FormData>(key: K, val: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: val }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const toggleBarrier = useCallback((val: string) => {
    setData((prev) => ({
      ...prev,
      barriers: prev.barriers.includes(val)
        ? prev.barriers.filter((b) => b !== val)
        : [...prev.barriers, val],
    }));
  }, []);

  function validateStep(s: number): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (s === 0) {
      if (!data.first_name.trim()) errs.first_name = 'First name is required.';
      if (!data.last_name.trim())  errs.last_name  = 'Last name is required.';
      if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) errs.email = 'A valid email address is required.';
      if (!data.phone.trim()) errs.phone = 'Phone number is required.';
    }
    if (s === 1) {
      if (!data.program)  errs.program  = 'Please select a program.';
      if (!data.schedule) errs.schedule = 'Please select a schedule preference.';
    }
    if (s === 2) {
      if (!data.ri_resident) errs.ri_resident = 'You must confirm Rhode Island residency to apply.';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function nextStep() {
    if (validateStep(step)) setStep((s) => s + 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep(2)) return;
    setSubmitting(true);
    setSubmitError('');

    const payload = {
      _subject: `New RIEC Pre-Qualification: ${data.first_name} ${data.last_name}`,
      _replyto: data.email,
      'First Name': data.first_name,
      'Last Name': data.last_name,
      Email: data.email,
      Phone: data.phone,
      Program: data.program,
      'Schedule Preference': data.schedule,
      'Employment Status': data.employed,
      'RI Resident': data.ri_resident ? 'Yes' : 'No',
      'Income Range': data.income_range,
      Barriers: data.barriers.join(', '),
      'Additional Notes': data.message,
    };

    try {
      const res = await fetch('https://formspree.io/f/xrejgzkw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError('Submission failed. Please call us at 401-452-0171 or email chris@rieducationcenter.org.');
      }
    } catch {
      setSubmitError('Network error. Please try again or call 401-452-0171.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <>
        {/* Hero strip */}
        <div style={{
          background: 'linear-gradient(145deg, #08122E 0%, #0C1B4D 100%)',
          padding: '48px 5% 40px',
        }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h1 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 'clamp(24px, 4vw, 42px)',
              fontWeight: 900, color: '#fff', lineHeight: 1.1, margin: 0,
            }}>
              Application Received!
            </h1>
          </div>
        </div>
        <div style={{ background: '#FAF7F2', padding: '64px 5%', minHeight: '50vh' }}>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }} aria-hidden="true">🎉</div>
            <h2 style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              fontSize: 28, fontWeight: 900, color: '#0C1B4D',
              marginBottom: 16, lineHeight: 1.2,
            }}>
              Thank you, {data.first_name}!
            </h2>
            <p style={{ fontSize: 16, color: '#4A4A5A', lineHeight: 1.8, marginBottom: 24 }}>
              Your pre-qualification form was submitted successfully. A member of our team will review your information and reach out within 1–2 business days.
            </p>
            <div style={{
              background: '#fff', border: '1px solid rgba(12,27,77,0.1)',
              borderTop: '4px solid #C8A136',
              padding: '24px 28px', marginBottom: 32, textAlign: 'left',
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#0C1B4D', marginBottom: 12 }}>What happens next:</p>
              {['We review your eligibility for grant funding.', 'We call or email you within 1–2 business days.', 'If approved, you receive your enrollment packet.', 'You pick your start date and begin training.'].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 13, color: '#4A4A5A' }}>
                  <span style={{ color: '#C8A136', fontWeight: 700, flexShrink: 0 }}>0{i + 1}</span> {s}
                </div>
              ))}
            </div>
            <Link href="/" style={{
              display: 'inline-block', background: '#0C1B4D', color: '#fff',
              padding: '12px 32px', fontSize: 14, fontWeight: 700,
              letterSpacing: '0.05em', textDecoration: 'none',
              border: '2px solid #0C1B4D', marginBottom: 20,
            }}>
              ← Back to Home
            </Link>
            <p style={{ fontSize: 13, color: '#6B7094' }}>
              Questions? Call{' '}
              <a href="tel:+14014520171" style={{ color: '#0C1B4D', fontWeight: 600 }}>401-452-0171</a>
              {' or email '}
              <a href="mailto:chris@rieducationcenter.org" style={{ color: '#0C1B4D', fontWeight: 600 }}>chris@rieducationcenter.org</a>
              <br />
              <span style={{ fontSize: 11, color: '#999', marginTop: 4, display: 'block' }}>
                RIEC · 501(c)(3) · EIN 99-3099438 · 75 Commerce Dr., Warwick RI
              </span>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Hero strip */}
      <div style={{
        background: 'linear-gradient(145deg, #08122E 0%, #0C1B4D 100%)',
        padding: '56px 5% 48px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#C8A136', fontWeight: 700, marginBottom: 14,
          }}>
            100% Free to Apply
          </p>
          <h1 style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            fontSize: 'clamp(26px, 4vw, 48px)',
            fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 12, maxWidth: 600,
          }}>
            Start Your Healthcare Career Today
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 480 }}>
            Complete the pre-qualification form below. There is no cost, no commitment, and no obligation.
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid rgba(12,27,77,0.08)', padding: '0 5%' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <ol style={{
            display: 'flex', listStyle: 'none', margin: 0, padding: 0,
          }} aria-label="Application progress">
            {STEPS.map((label, i) => (
              <li key={label} style={{
                flex: 1, textAlign: 'center', padding: '16px 8px',
                borderBottom: i === step
                  ? '3px solid #C8A136'
                  : i < step
                  ? '3px solid #1B7A8C'
                  : '3px solid transparent',
                fontSize: 13, fontWeight: i === step ? 700 : 500,
                color: i === step ? '#0C1B4D' : i < step ? '#1B7A8C' : '#6B7094',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}
                aria-current={i === step ? 'step' : undefined}
              >
                <span style={{
                  width: 22, height: 22,
                  background: i < step ? '#1B7A8C' : i === step ? '#C8A136' : 'rgba(12,27,77,0.1)',
                  color: i < step || i === step ? '#fff' : '#6B7094',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 800, flexShrink: 0,
                }}>
                  {i < step ? '✓' : i + 1}
                </span>
                <span style={{ display: 'none' }}>Step {i + 1}:</span>{label}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Form + sidebar layout */}
      <div style={{ background: '#FAF7F2', padding: '48px 5% 80px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start',
        }}>

          {/* ── FORM ─────────────────────────────────────────────────────── */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            aria-label={`Application step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}
          >
            <div style={{
              background: '#fff',
              border: '1px solid rgba(12,27,77,0.08)',
              borderTop: '4px solid #C8A136',
              padding: '36px 32px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 22, fontWeight: 800, color: '#0C1B4D',
                marginBottom: 28, lineHeight: 1.2,
              }}>
                {step === 0 && 'Step 1 — Personal Information'}
                {step === 1 && 'Step 2 — Program & Schedule'}
                {step === 2 && 'Step 3 — Grant Eligibility'}
              </h2>

              {/* ── STEP 1 ─────────────────────────────────────────────── */}
              {step === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label htmlFor="first_name" style={labelStyle}>First Name <span aria-hidden="true" style={{ color: '#C0392B' }}>*</span></label>
                      <input
                        id="first_name" name="first_name" type="text"
                        value={data.first_name} onChange={(e) => set('first_name', e.target.value)}
                        required aria-required="true"
                        aria-invalid={!!fieldErrors.first_name}
                        aria-describedby={fieldErrors.first_name ? 'err-first_name' : undefined}
                        style={{ ...inputStyle, borderColor: fieldErrors.first_name ? '#C0392B' : undefined }}
                        autoComplete="given-name"
                      />
                      {fieldErrors.first_name && (
                        <span id="err-first_name" style={errorStyle} role="alert">{fieldErrors.first_name}</span>
                      )}
                    </div>
                    <div>
                      <label htmlFor="last_name" style={labelStyle}>Last Name <span aria-hidden="true" style={{ color: '#C0392B' }}>*</span></label>
                      <input
                        id="last_name" name="last_name" type="text"
                        value={data.last_name} onChange={(e) => set('last_name', e.target.value)}
                        required aria-required="true"
                        aria-invalid={!!fieldErrors.last_name}
                        aria-describedby={fieldErrors.last_name ? 'err-last_name' : undefined}
                        style={{ ...inputStyle, borderColor: fieldErrors.last_name ? '#C0392B' : undefined }}
                        autoComplete="family-name"
                      />
                      {fieldErrors.last_name && (
                        <span id="err-last_name" style={errorStyle} role="alert">{fieldErrors.last_name}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" style={labelStyle}>Email Address <span aria-hidden="true" style={{ color: '#C0392B' }}>*</span></label>
                    <input
                      id="email" name="email" type="email"
                      value={data.email} onChange={(e) => set('email', e.target.value)}
                      required aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                      style={{ ...inputStyle, borderColor: fieldErrors.email ? '#C0392B' : undefined }}
                      autoComplete="email"
                    />
                    {fieldErrors.email && (
                      <span id="err-email" style={errorStyle} role="alert">{fieldErrors.email}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" style={labelStyle}>Phone Number <span aria-hidden="true" style={{ color: '#C0392B' }}>*</span></label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={data.phone} onChange={(e) => set('phone', e.target.value)}
                      required aria-required="true"
                      aria-invalid={!!fieldErrors.phone}
                      aria-describedby="phone-hint err-phone"
                      style={{ ...inputStyle, borderColor: fieldErrors.phone ? '#C0392B' : undefined }}
                      autoComplete="tel"
                    />
                    <span id="phone-hint" style={{ fontSize: 12, color: '#6B7094', marginTop: 4, display: 'block' }}>
                      We will use this number to contact you about your application.
                    </span>
                    {fieldErrors.phone && (
                      <span id="err-phone" style={errorStyle} role="alert">{fieldErrors.phone}</span>
                    )}
                  </div>
                </div>
              )}

              {/* ── STEP 2 ─────────────────────────────────────────────── */}
              {step === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{
                    background: 'rgba(200,161,54,0.08)', border: '1px solid rgba(200,161,54,0.25)',
                    padding: '12px 16px', fontSize: 13, color: '#6B4C0A', lineHeight: 1.6,
                  }}>
                    💡 Not sure which program is right for you? Select &ldquo;I&apos;m not sure yet&rdquo; and we will help you choose.
                  </div>

                  <div>
                    <label htmlFor="program" style={labelStyle}>
                      Program of Interest <span aria-hidden="true" style={{ color: '#C0392B' }}>*</span>
                    </label>
                    <select
                      id="program" name="program"
                      value={data.program} onChange={(e) => set('program', e.target.value)}
                      required aria-required="true"
                      aria-invalid={!!fieldErrors.program}
                      aria-describedby={fieldErrors.program ? 'err-program' : undefined}
                      style={{ ...inputStyle, borderColor: fieldErrors.program ? '#C0392B' : undefined }}
                    >
                      <option value="">— Select a program —</option>
                      {PROGRAMS.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                    {fieldErrors.program && (
                      <span id="err-program" style={errorStyle} role="alert">{fieldErrors.program}</span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="schedule" style={labelStyle}>
                      Schedule Preference <span aria-hidden="true" style={{ color: '#C0392B' }}>*</span>
                    </label>
                    <select
                      id="schedule" name="schedule"
                      value={data.schedule} onChange={(e) => set('schedule', e.target.value)}
                      required aria-required="true"
                      aria-invalid={!!fieldErrors.schedule}
                      aria-describedby={fieldErrors.schedule ? 'err-schedule' : undefined}
                      style={{ ...inputStyle, borderColor: fieldErrors.schedule ? '#C0392B' : undefined }}
                    >
                      <option value="">— Select a schedule —</option>
                      {SCHEDULES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                    {fieldErrors.schedule && (
                      <span id="err-schedule" style={errorStyle} role="alert">{fieldErrors.schedule}</span>
                    )}
                  </div>

                  <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
                    <legend style={{ ...labelStyle, marginBottom: 12 }}>Current Employment Status</legend>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {EMPLOYMENT.map((opt) => (
                        <label key={opt.value} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          fontSize: 14, color: '#2C2C3A', cursor: 'pointer',
                        }}>
                          <input
                            type="radio" name="employed"
                            value={opt.value}
                            checked={data.employed === opt.value}
                            onChange={() => set('employed', opt.value)}
                            style={{ flexShrink: 0 }}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {/* ── STEP 3 ─────────────────────────────────────────────── */}
              {step === 2 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(200,161,54,0.1) 0%, rgba(200,161,54,0.05) 100%)',
                    border: '1px solid rgba(200,161,54,0.3)',
                    padding: '20px 24px',
                  }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0C1B4D', marginBottom: 8 }}>
                      💰 About Grant Funding
                    </p>
                    <p style={{ fontSize: 13, color: '#6B7094', lineHeight: 1.7, margin: 0 }}>
                      Rhode Island workforce development grants can cover 100% of tuition and fees for eligible residents.
                      Eligibility is based on RI residency and household income. Answer the questions below so we can confirm your funding eligibility.
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <input
                        type="checkbox" id="ri_resident" name="ri_resident"
                        checked={data.ri_resident}
                        onChange={(e) => set('ri_resident', e.target.checked)}
                        required aria-required="true"
                        aria-invalid={!!fieldErrors.ri_resident}
                        aria-describedby={fieldErrors.ri_resident ? 'err-ri_resident' : undefined}
                        style={{ marginTop: 3, flexShrink: 0, width: 18, height: 18 }}
                      />
                      <label htmlFor="ri_resident" style={{ fontSize: 14, color: '#2C2C3A', lineHeight: 1.6, cursor: 'pointer' }}>
                        <strong>I confirm that I am a current Rhode Island resident.</strong>{' '}
                        <span aria-hidden="true" style={{ color: '#C0392B' }}>*</span>
                      </label>
                    </div>
                    {fieldErrors.ri_resident && (
                      <span id="err-ri_resident" style={errorStyle} role="alert">{fieldErrors.ri_resident}</span>
                    )}
                  </div>

                  <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
                    <legend style={{ ...labelStyle, marginBottom: 12 }}>Household Annual Income</legend>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {INCOME_RANGES.map((opt) => (
                        <label key={opt.value} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          fontSize: 14, color: '#2C2C3A', cursor: 'pointer',
                        }}>
                          <input
                            type="radio" name="income_range"
                            value={opt.value}
                            checked={data.income_range === opt.value}
                            onChange={() => set('income_range', opt.value)}
                            style={{ flexShrink: 0 }}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
                    <legend style={{ ...labelStyle, marginBottom: 6 }}>
                      Potential Barriers (check all that apply)
                    </legend>
                    <p style={{ fontSize: 12, color: '#6B7094', marginBottom: 12 }}>
                      RIEC provides support services to help remove these barriers. This information helps us plan your support.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {BARRIERS.map((b) => (
                        <label key={b.value} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          fontSize: 13, color: '#2C2C3A', cursor: 'pointer',
                          padding: '8px 12px',
                          background: data.barriers.includes(b.value) ? 'rgba(12,27,77,0.06)' : 'transparent',
                          border: '1px solid rgba(12,27,77,0.1)',
                        }}>
                          <input
                            type="checkbox"
                            value={b.value}
                            checked={data.barriers.includes(b.value)}
                            onChange={() => toggleBarrier(b.value)}
                            style={{ flexShrink: 0 }}
                          />
                          {b.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="message" style={labelStyle}>Anything else you&apos;d like us to know? (optional)</label>
                    <textarea
                      id="message" name="message"
                      value={data.message}
                      onChange={(e) => set('message', e.target.value)}
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      placeholder="Questions, special circumstances, etc."
                    />
                  </div>

                  {/* Hidden meta fields */}
                  <input type="hidden" name="_subject" value={`New RIEC Pre-Qualification: ${data.first_name} ${data.last_name}`} />
                  <input type="hidden" name="_replyto" value={data.email} />
                </div>
              )}

              {/* Submit error */}
              {submitError && (
                <div role="alert" aria-live="polite" style={{
                  marginTop: 20, padding: '14px 18px',
                  background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.3)',
                  fontSize: 13, color: '#922B21', lineHeight: 1.6,
                }}>
                  {submitError}
                </div>
              )}

              {/* Navigation buttons */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: 32, gap: 12,
              }}>
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    style={{
                      background: 'transparent', color: '#0C1B4D',
                      padding: '11px 24px', fontSize: 14, fontWeight: 600,
                      letterSpacing: '0.04em', border: '2px solid rgba(12,27,77,0.2)',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    ← Back
                  </button>
                ) : <span />}

                {step < 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    style={{
                      background: '#C8A136', color: '#08122E',
                      padding: '13px 36px', fontSize: 14, fontWeight: 800,
                      letterSpacing: '0.06em', border: '2px solid #C8A136',
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      background: submitting ? '#a08028' : '#C8A136', color: '#08122E',
                      padding: '13px 36px', fontSize: 14, fontWeight: 800,
                      letterSpacing: '0.06em', border: '2px solid #C8A136',
                      cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                    }}
                    aria-busy={submitting}
                  >
                    {submitting ? 'Submitting…' : 'Submit Application →'}
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
          <aside aria-label="Application help and contact information">
            {/* What Happens Next */}
            <div style={{
              background: '#fff', border: '1px solid rgba(12,27,77,0.08)',
              borderTop: '4px solid #1B7A8C',
              padding: '24px 24px', marginBottom: 20,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 16, fontWeight: 800, color: '#0C1B4D', marginBottom: 18,
              }}>
                What Happens Next
              </h3>
              {[
                { icon: '📋', text: 'We review your pre-qualification.' },
                { icon: '📞', text: 'Staff calls within 1–2 business days.' },
                { icon: '✅', text: 'Eligibility confirmed or discussed.' },
                { icon: '📦', text: 'Enrollment packet sent to you.' },
                { icon: '🎓', text: 'You pick your start date and begin.' },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                  <span aria-hidden="true" style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>
                  <span style={{ fontSize: 13, color: '#4A4A5A', lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Prefer to Call */}
            <div style={{
              background: '#FAF7F2', border: '1px solid rgba(12,27,77,0.08)',
              padding: '20px 24px', marginBottom: 20,
            }}>
              <h3 style={{
                fontFamily: 'var(--font-playfair), Georgia, serif',
                fontSize: 15, fontWeight: 800, color: '#0C1B4D', marginBottom: 14,
              }}>
                Prefer to Call?
              </h3>
              <a href="tel:+14014520171" style={{
                display: 'flex', gap: 8, alignItems: 'center',
                fontSize: 16, fontWeight: 700, color: '#0C1B4D',
                textDecoration: 'none', marginBottom: 8,
              }}>
                <span aria-hidden="true">📞</span> 401-452-0171
              </a>
              <a href="mailto:chris@rieducationcenter.org" style={{
                display: 'block', fontSize: 12, color: '#1B7A8C',
                textDecoration: 'none', marginBottom: 8, wordBreak: 'break-all',
              }}>
                chris@rieducationcenter.org
              </a>
              <p style={{ fontSize: 12, color: '#6B7094', margin: 0, lineHeight: 1.5 }}>
                75 Commerce Dr., Warwick, RI 02886
              </p>
            </div>

            {/* Security card */}
            <div style={{
              background: '#0C1B4D', padding: '20px 24px',
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#C8A136', marginBottom: 12, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Safe &amp; Secure
              </p>
              {[
                'Your information is never sold or shared.',
                'This form uses encrypted HTTPS transmission.',
                'Formspree-secured — no server-side storage at RIEC.',
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
                  <span aria-hidden="true" style={{ color: '#C8A136', flexShrink: 0 }}>✓</span> {t}
                </div>
              ))}
              <div style={{
                marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)',
                fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em',
              }}>
                EIN 99-3099438 · 501(c)(3) Nonprofit
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}
