/**
 * app/apply/page.tsx
 * Pre-qualification application page — Server Component wrapper.
 *
 * Architecture:
 *  - This file: thin server component, exports metadata, renders <ApplyForm />
 *  - components/ApplyForm.tsx: client component with all form state + Formspree
 *
 * SEO targets:
 *  "apply for free CNA training Rhode Island"
 *  "free healthcare training application RI"
 *  "RIEC grant application Warwick RI"
 */

import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";

export const runtime = 'edge';

/* ─── METADATA ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Apply for Free Healthcare Training",
  description:
    "Apply for 100% grant-funded CNA, EMT, Phlebotomy, EKG, and Patient Care Tech " +
    "training at RIEC. Pre-qualify online in under 5 minutes. $0 tuition for eligible " +
    "Rhode Island residents.",
  alternates: {
    canonical: "https://rieducationcenter.org/apply",
  },
  openGraph: {
    title: "Apply for Free Healthcare Training | RIEC Rhode Island",
    description:
      "Pre-qualify for 100% grant-funded healthcare certification programs. " +
      "CNA, EMT, Phlebotomy, EKG, PCT — $0 tuition for eligible RI residents.",
    url: "https://rieducationcenter.org/apply",
  },
  /* Prevent the thank-you / success state from being indexed */
  robots: {
    index: true,
    follow: true,
  },
};

/* ─── PAGE COMPONENT ─────────────────────────────────────────────────────── */
export default function ApplyPage() {
  return <ApplyForm />;
}