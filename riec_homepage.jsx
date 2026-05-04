import { useState, useEffect, useRef } from "react";
 
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');`;
 
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --navy: #0C1B4D;
    --navy-light: #162260;
    --navy-deep: #08122E;
    --gold: #C8A136;
    --gold-light: #E8BE50;
    --gold-pale: #F5E9C0;
    --cream: #FAF7F2;
    --cream-dark: #F0EBE1;
    --teal: #1B7A8C;
    --teal-light: #22A5BD;
    --body: #2C2C3A;
    --muted: #6B7094;
    --white: #FFFFFF;
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--body); overflow-x: hidden; }
  
  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    transition: all 0.4s ease;
    padding: 0 5%;
  }
  .nav.scrolled {
    background: var(--navy-deep);
    box-shadow: 0 2px 32px rgba(12,27,77,0.4);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    max-width: 1200px; margin: 0 auto; padding: 18px 0;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
  .nav-logo-text { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--white); letter-spacing: 0.02em; }
  .nav-logo-text span { color: var(--gold); }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  .nav-link { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; font-weight: 500; letter-spacing: 0.05em; transition: color 0.2s; }
  .nav-link:hover { color: var(--gold); }
  .nav-cta { background: var(--gold); color: var(--navy-deep); padding: 10px 22px; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-decoration: none; transition: all 0.2s; border: 2px solid var(--gold); }
  .nav-cta:hover { background: transparent; color: var(--gold); }
  .nav-cta.outline { background: transparent; color: var(--white); border-color: rgba(255,255,255,0.4); margin-right: 0; }
  .nav-cta.outline:hover { border-color: var(--gold); color: var(--gold); }
 
  /* HERO */
  .hero {
    min-height: 100vh;
    background: linear-gradient(160deg, var(--navy-deep) 0%, var(--navy) 50%, #1A2E7A 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    position: relative; overflow: hidden; padding: 120px 5% 80px;
  }
  .hero-bg-stars {
    position: absolute; inset: 0; pointer-events: none;
  }
  .hero-anchor-bg {
    position: absolute; right: -80px; top: 50%; transform: translateY(-50%);
    width: 600px; height: 600px; opacity: 0.04;
    pointer-events: none;
  }
  .hero-content {
    position: relative; z-index: 2;
    max-width: 900px; margin: 0 auto; text-align: center;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(200,161,54,0.15); border: 1px solid rgba(200,161,54,0.4);
    color: var(--gold-light); padding: 6px 16px;
    font-size: 11px; letter-spacing: 0.15em; font-weight: 600; text-transform: uppercase;
    margin-bottom: 28px;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(42px, 6vw, 78px);
    font-weight: 900; color: var(--white);
    line-height: 1.08; margin-bottom: 12px;
    letter-spacing: -0.01em;
  }
  .hero-title .gold { color: var(--gold); }
  .hero-title .italic { font-style: italic; }
  .hero-subtitle {
    font-size: clamp(16px, 2vw, 20px); color: rgba(255,255,255,0.65);
    font-weight: 300; max-width: 620px; margin: 0 auto 40px;
    line-height: 1.7;
  }
  .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 60px; }
  .btn-primary {
    background: var(--gold); color: var(--navy-deep);
    padding: 16px 36px; font-size: 15px; font-weight: 700;
    letter-spacing: 0.04em; text-decoration: none; border: 2px solid var(--gold);
    transition: all 0.25s; display: inline-block;
  }
  .btn-primary:hover { background: var(--gold-light); border-color: var(--gold-light); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(200,161,54,0.4); }
  .btn-outline {
    background: transparent; color: var(--white);
    padding: 16px 36px; font-size: 15px; font-weight: 600;
    letter-spacing: 0.04em; text-decoration: none; border: 2px solid rgba(255,255,255,0.35);
    transition: all 0.25s; display: inline-block;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
  .hero-stats {
    display: flex; gap: 48px; justify-content: center; flex-wrap: wrap;
    border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px;
  }
  .hero-stat { text-align: center; }
  .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--gold); display: block; }
  .hero-stat-label { font-size: 12px; color: rgba(255,255,255,0.5); letter-spacing: 0.12em; text-transform: uppercase; }
  .hero-scroll {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 2;
  }
  .scroll-line {
    width: 1px; height: 48px;
    background: linear-gradient(to bottom, rgba(200,161,54,0.6), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
  
  /* HOPE SECTION */
  .hope-section {
    background: var(--cream); padding: 100px 5%;
    position: relative;
  }
  .hope-section::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(to right, var(--navy), var(--gold), var(--teal), var(--navy));
  }
  .section-label {
    font-size: 11px; letter-spacing: 0.2em; font-weight: 600; text-transform: uppercase;
    color: var(--teal); margin-bottom: 12px; display: block;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 52px); font-weight: 800;
    color: var(--navy); margin-bottom: 16px; line-height: 1.15;
  }
  .section-desc {
    font-size: 17px; color: var(--muted); max-width: 560px; line-height: 1.75;
    font-weight: 300;
  }
  .hope-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px; margin-top: 56px; max-width: 1200px; margin-left: auto; margin-right: auto;
  }
  .hope-card {
    background: var(--white); border: 1px solid rgba(12,27,77,0.08);
    padding: 40px 32px; position: relative; overflow: hidden;
    transition: all 0.3s ease; cursor: default;
  }
  .hope-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 3px; background: var(--gold);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s ease;
  }
  .hope-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(12,27,77,0.12); }
  .hope-card:hover::after { transform: scaleX(1); }
  .hope-letter {
    font-family: 'Playfair Display', serif;
    font-size: 72px; font-weight: 900; color: var(--gold-pale);
    line-height: 1; margin-bottom: 12px; display: block;
    position: absolute; top: 16px; right: 20px;
    transition: color 0.3s;
  }
  .hope-card:hover .hope-letter { color: rgba(200,161,54,0.25); }
  .hope-word {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700; color: var(--navy);
    margin-bottom: 10px; position: relative; z-index: 1;
  }
  .hope-desc { font-size: 14px; color: var(--muted); line-height: 1.7; position: relative; z-index: 1; }
 
  /* MISSION STRIPE */
  .mission-stripe {
    background: var(--navy);
    padding: 72px 5%;
    position: relative; overflow: hidden;
  }
  .mission-stripe-inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
  }
  .mission-quote {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3.5vw, 44px); font-weight: 700;
    color: var(--white); line-height: 1.25;
  }
  .mission-quote .accent { color: var(--gold); font-style: italic; }
  .mission-tagline {
    font-size: 13px; color: rgba(255,255,255,0.4); letter-spacing: 0.12em;
    text-transform: uppercase; margin-top: 20px;
  }
  .mission-pillars { display: flex; flex-direction: column; gap: 20px; }
  .pillar {
    display: flex; gap: 16px; align-items: flex-start;
    padding: 20px; border: 1px solid rgba(255,255,255,0.08);
    transition: border-color 0.25s;
  }
  .pillar:hover { border-color: rgba(200,161,54,0.4); }
  .pillar-icon {
    width: 40px; height: 40px; flex-shrink: 0;
    background: rgba(200,161,54,0.15); border: 1px solid rgba(200,161,54,0.3);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
  .pillar-title { font-size: 15px; font-weight: 600; color: var(--white); margin-bottom: 4px; }
  .pillar-desc { font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6; }
 
  /* PROGRAMS */
  .programs-section { padding: 100px 5%; background: var(--cream-dark); }
  .programs-inner { max-width: 1200px; margin: 0 auto; }
  .programs-header { text-align: center; margin-bottom: 64px; }
  .tracks { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px; }
  .track { background: var(--white); border: 1px solid rgba(12,27,77,0.08); overflow: hidden; }
  .track-header {
    padding: 28px 32px; display: flex; align-items: center; gap: 16px;
    cursor: pointer;
  }
  .track-header.allied { background: var(--navy); }
  .track-header.ems { background: var(--teal); }
  .track-icon { font-size: 28px; }
  .track-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--white); }
  .track-sub { font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 2px; letter-spacing: 0.06em; }
  .track-programs { padding: 8px 0; }
  .program-item {
    padding: 20px 32px; border-bottom: 1px solid rgba(12,27,77,0.06);
    transition: background 0.2s; cursor: pointer;
    display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
  }
  .program-item:last-child { border-bottom: none; }
  .program-item:hover { background: rgba(12,27,77,0.03); }
  .program-name { font-size: 15px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
  .program-detail { font-size: 13px; color: var(--muted); line-height: 1.5; }
  .program-badge {
    flex-shrink: 0; font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    padding: 4px 10px; text-transform: uppercase; white-space: nowrap;
  }
  .badge-funded { background: rgba(200,161,54,0.15); color: #8B6A10; border: 1px solid rgba(200,161,54,0.3); }
  .badge-ri { background: rgba(27,122,140,0.15); color: #0E5D6E; border: 1px solid rgba(27,122,140,0.3); }
  .badge-triple { background: rgba(12,27,77,0.1); color: var(--navy); border: 1px solid rgba(12,27,77,0.2); }
  .aha-banner {
    background: linear-gradient(135deg, #C41E3A 0%, #8B0000 100%);
    padding: 28px 32px; display: flex; align-items: center; gap: 24px;
  }
  .aha-content { flex: 1; }
  .aha-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--white); margin-bottom: 6px; }
  .aha-certs { font-size: 13px; color: rgba(255,255,255,0.75); }
 
  /* HOW IT WORKS */
  .how-section { padding: 100px 5%; background: var(--cream); }
  .how-inner { max-width: 1200px; margin: 0 auto; }
  .how-header { text-align: center; margin-bottom: 64px; }
  .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; position: relative; }
  .steps::before {
    content: ''; position: absolute;
    top: 36px; left: calc(16.666% + 36px); right: calc(16.666% + 36px);
    height: 2px; background: linear-gradient(to right, var(--gold), var(--teal));
    z-index: 0;
  }
  .step { text-align: center; padding: 0 24px; position: relative; z-index: 1; }
  .step-num {
    width: 72px; height: 72px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
    font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900;
  }
  .step-num.s1 { background: var(--navy); color: var(--gold); border: 3px solid var(--gold); }
  .step-num.s2 { background: var(--gold); color: var(--navy); border: 3px solid var(--gold); }
  .step-num.s3 { background: var(--teal); color: var(--white); border: 3px solid var(--teal); }
  .step-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--navy); margin-bottom: 12px; }
  .step-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }
 
  /* SERVE */
  .serve-section { padding: 80px 5%; background: var(--navy); }
  .serve-inner { max-width: 1200px; margin: 0 auto; }
  .serve-header { text-align: center; margin-bottom: 56px; }
  .serve-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .serve-card {
    border: 1px solid rgba(255,255,255,0.1); padding: 40px 32px;
    transition: all 0.3s; position: relative; overflow: hidden;
  }
  .serve-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  }
  .serve-card.sc1::before { background: var(--gold); }
  .serve-card.sc2::before { background: var(--teal-light); }
  .serve-card.sc3::before { background: #E8605A; }
  .serve-card:hover { background: rgba(255,255,255,0.04); transform: translateY(-4px); }
  .serve-icon { font-size: 40px; margin-bottom: 20px; display: block; }
  .serve-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--white); margin-bottom: 12px; }
  .serve-desc { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.7; }
  .serve-link { display: inline-flex; align-items: center; gap: 6px; margin-top: 20px; font-size: 13px; font-weight: 600; letter-spacing: 0.06em; text-decoration: none; transition: gap 0.2s; }
  .serve-link.gold { color: var(--gold); }
  .serve-link.teal { color: var(--teal-light); }
  .serve-link.red { color: #E8605A; }
  .serve-link:hover { gap: 12px; }
 
  /* APPLY CTA */
  .apply-section {
    padding: 100px 5%;
    background: linear-gradient(135deg, #0C1B4D 0%, #08122E 100%);
    text-align: center; position: relative; overflow: hidden;
  }
  .apply-section::before {
    content: 'H.O.P.E.';
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
    font-family: 'Playfair Display', serif; font-size: 200px; font-weight: 900;
    color: rgba(255,255,255,0.02); white-space: nowrap; pointer-events: none;
    letter-spacing: 0.1em;
  }
  .apply-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
  .apply-title { font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 60px); font-weight: 900; color: var(--white); line-height: 1.1; margin-bottom: 20px; }
  .apply-title .gold { color: var(--gold); }
  .apply-desc { font-size: 18px; color: rgba(255,255,255,0.6); margin-bottom: 40px; font-weight: 300; line-height: 1.7; }
  .apply-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 32px; }
  .apply-note { font-size: 13px; color: rgba(255,255,255,0.35); letter-spacing: 0.04em; }
 
  /* FAQ */
  .faq-section { padding: 100px 5%; background: var(--cream-dark); }
  .faq-inner { max-width: 800px; margin: 0 auto; }
  .faq-header { text-align: center; margin-bottom: 56px; }
  .faq-item { border-bottom: 1px solid rgba(12,27,77,0.1); }
  .faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    text-align: left; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; gap: 16px;
    font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 600; color: var(--navy);
    transition: color 0.2s;
  }
  .faq-q:hover { color: var(--teal); }
  .faq-arrow { font-size: 20px; flex-shrink: 0; transition: transform 0.3s; color: var(--gold); }
  .faq-arrow.open { transform: rotate(180deg); }
  .faq-a { font-size: 15px; color: var(--muted); line-height: 1.75; padding-bottom: 24px; }
 
  /* FOOTER */
  .footer { background: var(--navy-deep); padding: 64px 5% 32px; }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  .footer-brand-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--white); margin-bottom: 12px; }
  .footer-brand-title span { color: var(--gold); }
  .footer-tagline { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7; margin-bottom: 20px; }
  .footer-contact-item { font-size: 13px; color: rgba(255,255,255,0.55); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
  .footer-contact-item a { color: rgba(255,255,255,0.55); text-decoration: none; }
  .footer-contact-item a:hover { color: var(--gold); }
  .footer-col-title { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); font-weight: 700; margin-bottom: 18px; }
  .footer-link { display: block; font-size: 13px; color: rgba(255,255,255,0.45); text-decoration: none; margin-bottom: 10px; transition: color 0.2s; }
  .footer-link:hover { color: var(--white); }
  .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .footer-ein { font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 0.04em; }
  .footer-legal { font-size: 11px; color: rgba(255,255,255,0.25); }
 
  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes starFloat {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(15deg); }
  }
  .anim-1 { animation: fadeUp 0.7s ease 0.1s both; }
  .anim-2 { animation: fadeUp 0.7s ease 0.3s both; }
  .anim-3 { animation: fadeUp 0.7s ease 0.5s both; }
  .anim-4 { animation: fadeUp 0.7s ease 0.7s both; }
  .anim-5 { animation: fadeUp 0.7s ease 0.9s both; }
 
  /* RESPONSIVE */
  @media (max-width: 900px) {
    .tracks { grid-template-columns: 1fr; }
    .mission-stripe-inner { grid-template-columns: 1fr; gap: 40px; }
    .steps { grid-template-columns: 1fr; gap: 40px; }
    .steps::before { display: none; }
    .serve-cards { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .nav-links { display: none; }
    .hope-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .hope-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr; }
  }
 
  /* STAR decorations */
  .star { position: absolute; color: var(--gold); font-size: 14px; animation: starFloat linear infinite; }
`;
 
const AnchorSVG = ({ size = 120, color = "#C8A136", opacity = 1 }) => (
  <svg width={size} height={size} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
    <circle cx="50" cy="18" r="10" stroke={color} strokeWidth="4" fill="none"/>
    <line x1="50" y1="28" x2="50" y2="95" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    <line x1="22" y1="52" x2="78" y2="52" stroke={color} strokeWidth="4" strokeLinecap="round"/>
    <path d="M22 52 C22 80 14 88 14 88" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M78 52 C78 80 86 88 86 88" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M14 88 C14 88 32 95 50 95" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <path d="M86 88 C86 88 68 95 50 95" stroke={color} strokeWidth="4" strokeLinecap="round" fill="none"/>
    <circle cx="50" cy="18" r="5" fill={color}/>
  </svg>
);
 
const StarRing = ({ size = 300, count = 13 }) => {
  const stars = Array.from({ length: count }, (_, i) => {
    const angle = (i * 360) / count - 90;
    const rad = (angle * Math.PI) / 180;
    const r = size / 2 - 16;
    const x = size / 2 + r * Math.cos(rad);
    const y = size / 2 + r * Math.sin(rad);
    return { x, y };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
      {stars.map((s, i) => (
        <polygon key={i} points={`${s.x},${s.y - 7} ${s.x + 2.6},${s.y - 1} ${s.x + 7},${s.y - 1} ${s.x + 3.2},${s.y + 2.5} ${s.x + 4.3},${s.y + 7} ${s.x},${s.y + 4} ${s.x - 4.3},${s.y + 7} ${s.x - 3.2},${s.y + 2.5} ${s.x - 7},${s.y - 1} ${s.x - 2.6},${s.y - 1}`}
          fill="rgba(200,161,54,0.7)" />
      ))}
    </svg>
  );
};
 
const FAQS = [
  { q: "Who is eligible for grant-funded training?", a: "Eligibility is determined through Rhode Island workforce development grant programs. Requirements typically include Rhode Island residency and meeting specific income or employment criteria. Submit a pre-qualification application to determine your eligibility status — it's free and takes only a few minutes." },
  { q: "What certifications do I earn?", a: "We offer CNA, Patient Care Technician (Triple Certification: CNA + Phlebotomy + EKG), standalone Phlebotomy Technician, EKG Technician, EMT, Advanced EMT-Cardiac (RI-specific), and Paramedic certifications. All lead directly to Rhode Island state licensure or nationally recognized certification exams." },
  { q: "How long are the programs?", a: "CNA is 8 weeks. Phlebotomy is 4–6 weeks. EMT spans several months with evening and weekend options for working students. The Paramedic program is 12–18 months. All programs include mandatory clinical rotations at partnered facilities." },
  { q: "Do you help graduates find jobs?", a: "Yes — job placement is central to our mission, not an afterthought. We actively partner with hospitals, nursing homes, fire departments, and private practices throughout Providence and Rhode Island to ensure graduates transition seamlessly from certification to employment." },
  { q: "Is RIEC accredited?", a: "All programs are state-approved and lead directly to Rhode Island state licensure or national certification exams. We maintain partnerships with the Rhode Island Department of Health and follow American Heart Association standards for all life support training." },
  { q: "Are donations tax-deductible?", a: "Yes. The Rhode Island Education Center for H.O.P.E. is a registered 501(c)(3) non-profit organization (EIN: 99-3099438). All contributions are tax-deductible to the full extent permitted by law, and you will receive a formal acknowledgment letter for your records." },
];
 
export default function RIECHomepage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
 
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = FONTS + CSS;
    document.head.appendChild(style);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => { window.removeEventListener("scroll", handleScroll); document.head.removeChild(style); };
  }, []);
 
  return (
    <div>
      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <AnchorSVG size={32} color="#C8A136" />
            <span className="nav-logo-text">RI Education Center <span>for H.O.P.E.</span></span>
          </a>
          <div className="nav-links">
            <a href="#programs" className="nav-link">Programs</a>
            <a href="#how" className="nav-link">How It Works</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#apply" className="nav-link nav-cta outline">Donate</a>
            <a href="#apply" className="nav-link nav-cta">Apply Now</a>
          </div>
        </div>
      </nav>
 
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-stars">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="star" style={{
              left: `${5 + (i * 4.7) % 90}%`,
              top: `${10 + (i * 7.3) % 75}%`,
              fontSize: `${8 + (i % 3) * 4}px`,
              animationDuration: `${4 + (i % 5)}s`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.2 + (i % 4) * 0.12,
            }}>★</span>
          ))}
        </div>
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", opacity: 0.06, pointerEvents: "none" }}>
          <div style={{ position: "relative", width: 480, height: 480 }}>
            <StarRing size={480} count={13} />
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
              <AnchorSVG size={220} color="#C8A136" opacity={1} />
            </div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-badge anim-1">
            <span>⚓</span>
            <span>Rhode Island Education Center for H.O.P.E. · 501(c)(3) · Warwick, RI</span>
          </div>
          <h1 className="hero-title anim-2">
            Building a <span className="italic gold">Healthier</span><br />
            Future, One Student<br />
            at a Time.
          </h1>
          <p className="hero-subtitle anim-3">
            100% grant-funded healthcare training for eligible Rhode Islanders.
            CNA, EMT, Phlebotomy, EKG, and more — fully certified, fully placed.
          </p>
          <div className="hero-btns anim-4">
            <a href="#apply" className="btn-primary">Apply for Free Training →</a>
            <a href="#programs" className="btn-outline">View All Programs</a>
          </div>
          <div className="hero-stats anim-5">
            {[
              { num: "100%", label: "Grant-Funded Tuition" },
              { num: "8+", label: "Certification Programs" },
              { num: "3", label: "Educational Tracks" },
              { num: "RI", label: "State Approved" },
            ].map((s, i) => (
              <div className="hero-stat" key={i}>
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
        </div>
      </section>
 
      {/* HOPE */}
      <section className="hope-section">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 0 }}>
            <span className="section-label">Our Promise to You</span>
            <h2 className="section-title">What Does <em style={{ color: "var(--gold)" }}>H.O.P.E.</em> Stand For?</h2>
            <p className="section-desc" style={{ margin: "0 auto" }}>
              Our name is not just an acronym — it's the architecture of everything we do.
            </p>
          </div>
          <div className="hope-grid">
            {[
              { letter: "H", word: "Healthcare", desc: "We exist at the intersection of urgent community healthcare need and available, motivated talent. Every program we run fills a real vacancy in Rhode Island's medical system." },
              { letter: "O", word: "Opportunities", desc: "We demolish the financial barriers that stop driven people from entering healthcare. Grant funding, scholarships, and wraparound support mean your income doesn't determine your future." },
              { letter: "P", word: "Programs", desc: "Rigorous, state-approved curricula across Allied Health and Emergency Medicine tracks. From 8-week CNA certification to 18-month Paramedic programs — every pathway leads directly to employment." },
              { letter: "E", word: "Experiences", desc: "A certificate is only the beginning. Mandatory clinical rotations, hands-on skills labs, and active employer partnerships ensure graduates walk into their first shift ready — not just licensed." },
            ].map((h, i) => (
              <div className="hope-card" key={i}>
                <span className="hope-letter">{h.letter}</span>
                <div className="hope-word">{h.word}</div>
                <p className="hope-desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* MISSION STRIPE */}
      <section className="mission-stripe">
        <div className="mission-stripe-inner">
          <div>
            <span className="section-label" style={{ color: "rgba(200,161,54,0.7)" }}>Our Mission</span>
            <div className="mission-quote">
              To <span className="accent">Educate</span>,<br />
              <span className="accent">Certify</span>,<br />
              and <span className="accent">Place</span>.
            </div>
            <div className="mission-tagline">— The RIEC Commitment</div>
          </div>
          <div className="mission-pillars">
            {[
              { icon: "🚌", title: "Transportation Support", desc: "Bus passes and transit assistance so geography is never a barrier to class attendance." },
              { icon: "👶", title: "Childcare Support", desc: "Because a parent's career shouldn't come at the cost of their children's care." },
              { icon: "📚", title: "Full Scholarship Funding", desc: "100% tuition, books, and supplies covered through RI workforce development grants." },
              { icon: "🤝", title: "Case Management", desc: "Wraparound services connecting students to housing, food, and social support resources." },
            ].map((p, i) => (
              <div className="pillar" key={i}>
                <div className="pillar-icon">{p.icon}</div>
                <div>
                  <div className="pillar-title">{p.title}</div>
                  <div className="pillar-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* PROGRAMS */}
      <section className="programs-section" id="programs">
        <div className="programs-inner">
          <div className="programs-header">
            <span className="section-label">Curriculum</span>
            <h2 className="section-title">Two Tracks. One Destination:</h2>
            <h2 className="section-title" style={{ color: "var(--teal)", marginTop: "-8px", marginBottom: 16 }}>A Healthcare Career.</h2>
            <p className="section-desc" style={{ margin: "0 auto", textAlign: "center" }}>
              All programs are state-approved, clinically immersive, and designed to place graduates directly into Rhode Island's healthcare workforce.
            </p>
          </div>
          <div className="tracks">
            {/* ALLIED HEALTH */}
            <div className="track">
              <div className="track-header allied">
                <span className="track-icon">🏥</span>
                <div>
                  <div className="track-title">Allied Health Track</div>
                  <div className="track-sub">The backbone of patient care</div>
                </div>
              </div>
              <div className="track-programs">
                {[
                  { name: "Certified Nursing Assistant (CNA)", detail: "8 Weeks · In-Person (Mon–Thu) or Hybrid · RI State License Exam Eligibility", badge: "badge-funded", label: "100% Funded" },
                  { name: "Patient Care Technician (PCT)", detail: "Triple Certification: CNA + Phlebotomy + EKG · Ideal for ER & ICU placement", badge: "badge-triple", label: "Triple Cert" },
                  { name: "Phlebotomy Technician", detail: "4–6 Weeks · Venipuncture, specimen collection & lab safety · NHA Certification", badge: "badge-funded", label: "100% Funded" },
                  { name: "EKG Technician", detail: "Standalone · 12-lead EKG setup, monitoring & cardiac rhythm interpretation", badge: "badge-funded", label: "100% Funded" },
                  { name: "Medical Assisting", detail: "Clinical & administrative skills for high-demand outpatient settings", badge: "badge-funded", label: "100% Funded" },
                ].map((p, i) => (
                  <div className="program-item" key={i}>
                    <div>
                      <div className="program-name">{p.name}</div>
                      <div className="program-detail">{p.detail}</div>
                    </div>
                    <span className={`program-badge ${p.badge}`}>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* EMS */}
            <div className="track">
              <div className="track-header ems">
                <span className="track-icon">🚑</span>
                <div>
                  <div className="track-title">Emergency Medicine Track</div>
                  <div className="track-sub">The frontline of crisis response</div>
                </div>
              </div>
              <div className="track-programs">
                {[
                  { name: "EMT", detail: "Evenings & Weekends · CPR, airway mgmt, trauma · NREMT Exam Eligible", badge: "badge-funded", label: "100% Funded" },
                  { name: "Advanced EMT-Cardiac (RI Specific)", detail: "Req: Active EMT License · IV therapy, intubation, ACLS & PALS · Highly sought by RI fire departments", badge: "badge-ri", label: "RI Exclusive" },
                  { name: "Paramedic Program", detail: "12–18 Months · Hybrid · Cardiology, pharmacology, advanced trauma support", badge: "badge-funded", label: "100% Funded" },
                ].map((p, i) => (
                  <div className="program-item" key={i}>
                    <div>
                      <div className="program-name">{p.name}</div>
                      <div className="program-detail">{p.detail}</div>
                    </div>
                    <span className={`program-badge ${p.badge}`}>{p.label}</span>
                  </div>
                ))}
              </div>
              {/* AHA */}
              <div className="aha-banner">
                <span style={{ fontSize: 36 }}>❤️</span>
                <div className="aha-content">
                  <div className="aha-title">AHA Training Center</div>
                  <div className="aha-certs">BLS · ACLS · PALS · Heartsaver CPR/AED — Open to the Community</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="how-inner">
          <div className="how-header">
            <span className="section-label">The Process</span>
            <h2 className="section-title">From Application to<br /><em style={{ color: "var(--gold)" }}>Day One on the Job</em></h2>
            <p className="section-desc" style={{ margin: "16px auto 0", textAlign: "center" }}>
              Three steps stand between you and a certified healthcare career. We walk with you through every one.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num s1">1</div>
              <div className="step-title">Pre-Qualify Online</div>
              <p className="step-desc">Submit a short pre-qualification form at rieducationcenter.org/apply. We assess your eligibility for Rhode Island workforce development grant funding — typically same-week response. No cost, no commitment.</p>
            </div>
            <div className="step">
              <div className="step-num s2">2</div>
              <div className="step-title">Enroll & Train</div>
              <p className="step-desc">Once qualified, complete enrollment paperwork and schedule your cohort start date. Receive your grant-funded tuition, books, and supplies. Attend class, complete your clinical rotation, and earn your certification.</p>
            </div>
            <div className="step">
              <div className="step-num s3">3</div>
              <div className="step-title">Get Placed & Hired</div>
              <p className="step-desc">Our employer partnerships across Providence and greater RI put certified graduates directly in front of hiring managers. We don't just hand you a certificate — we help you walk through the door.</p>
            </div>
          </div>
        </div>
      </section>
 
      {/* WHO WE SERVE */}
      <section className="serve-section">
        <div className="serve-inner">
          <div className="serve-header">
            <span className="section-label" style={{ color: "rgba(200,161,54,0.7)" }}>Who We Serve</span>
            <h2 className="section-title" style={{ color: "var(--white)" }}>There Is a Place<br /><em style={{ color: "var(--gold)" }}>for You Here.</em></h2>
          </div>
          <div className="serve-cards">
            <div className="serve-card sc1">
              <span className="serve-icon">🎓</span>
              <div className="serve-title">Aspiring Students</div>
              <p className="serve-desc">You have the drive to care for others. Financial barriers shouldn't determine whether you get the chance to. Grant-funded tuition means your ambition — not your bank account — is what we look at.</p>
              <a href="#apply" className="serve-link gold">Start Your Application →</a>
            </div>
            <div className="serve-card sc2">
              <span className="serve-icon">🔄</span>
              <div className="serve-title">Career Changers</div>
              <p className="serve-desc">Already in the workforce but ready for something that matters more? Our evening and hybrid options are designed for adults who can't quit their day job to start a new career. Yet.</p>
              <a href="#programs" className="serve-link teal">See Flexible Schedules →</a>
            </div>
            <div className="serve-card sc3">
              <span className="serve-icon">🏨</span>
              <div className="serve-title">Healthcare Partners</div>
              <p className="serve-desc">Hospitals, nursing homes, fire departments, and private practices — if you need reliable, certified, work-ready staff, partner with us. Our graduates are trained to your standards from day one.</p>
              <a href="mailto:chris@rieducationcenter.org" className="serve-link red">Partner With Us →</a>
            </div>
          </div>
        </div>
      </section>
 
      {/* APPLY CTA */}
      <section className="apply-section" id="apply">
        <div className="apply-inner">
          <h2 className="apply-title">
            Your Healthcare Career<br />Starts <span className="gold">Free</span>.
          </h2>
          <p className="apply-desc">
            Eligible Rhode Islanders pay $0 for tuition, books, and supplies.
            The only thing we ask is your commitment. We'll handle the rest.
          </p>
          <div className="apply-btns">
            <a href="https://rieducationcenter.org/apply" className="btn-primary" style={{ fontSize: 16, padding: "18px 44px" }}>
              Apply for Free Training →
            </a>
            <a href="https://rieducationcenter.org/donate" className="btn-outline" style={{ fontSize: 16, padding: "18px 44px" }}>
              Donate to Fund a Student ♡
            </a>
          </div>
          <p className="apply-note">
            Questions? Call us at 401-452-0171 · chris@rieducationcenter.org
          </p>
        </div>
      </section>
 
      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <div className="faq-header">
            <span className="section-label">Got Questions</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          {FAQS.map((faq, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span className={`faq-arrow${openFaq === i ? " open" : ""}`}>⌄</span>
              </button>
              {openFaq === i && <p className="faq-a">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>
 
      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <AnchorSVG size={28} color="#C8A136" />
                <div className="footer-brand-title">Rhode Island Education Center <span>for H.O.P.E.</span></div>
              </div>
              <p className="footer-tagline">Building a Healthier Future,<br />One Student at a Time.<br /><br />A 501(c)(3) nonprofit organization serving low-income and BIPOC Rhode Islanders through grant-funded healthcare workforce training.</p>
              <div className="footer-contact-item">📍 75 Commerce Dr., Warwick, RI 02886</div>
              <div className="footer-contact-item">📞 <a href="tel:4014520171">401-452-0171</a></div>
              <div className="footer-contact-item">✉️ <a href="mailto:chris@rieducationcenter.org">chris@rieducationcenter.org</a></div>
              <div className="footer-contact-item">🌐 <a href="https://rieducationcenter.org">rieducationcenter.org</a></div>
            </div>
            <div>
              <div className="footer-col-title">Programs</div>
              {["CNA (8 Weeks)", "Patient Care Technician", "Phlebotomy", "EKG Technician", "EMT", "Advanced EMT-Cardiac", "Paramedic", "AHA / BLS / ACLS"].map(p => (
                <a href="#programs" className="footer-link" key={p}>{p}</a>
              ))}
            </div>
            <div>
              <div className="footer-col-title">Organization</div>
              {["About H.O.P.E.", "Our Mission", "Who We Serve", "Job Placement", "Partner With Us", "Donate", "Contact"].map(p => (
                <a href="#" className="footer-link" key={p}>{p}</a>
              ))}
            </div>
            <div>
              <div className="footer-col-title">Resources</div>
              {["Apply Now", "Pre-Qualification Form", "FAQ", "Grant Eligibility Info", "AHA Certification Info", "Privacy Policy", "Terms of Use"].map(p => (
                <a href="#" className="footer-link" key={p}>{p}</a>
              ))}
              <div style={{ marginTop: 24 }}>
                <div className="footer-col-title">Connect</div>
                <div style={{ display: "flex", gap: 12 }}>
                  {["📘", "📸", "💼"].map((icon, i) => (
                    <a key={i} href="#" style={{ fontSize: 22, textDecoration: "none", opacity: 0.5, transition: "opacity 0.2s" }}
                      onMouseEnter={e => e.target.style.opacity = 1}
                      onMouseLeave={e => e.target.style.opacity = 0.5}>{icon}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-ein">
              EIN: 99-3099438 · 501(c)(3) Tax-Exempt · All donations are tax-deductible to the full extent permitted by law.
            </div>
            <div className="footer-legal">
              © 2026 Rhode Island Education Center for H.O.P.E. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
