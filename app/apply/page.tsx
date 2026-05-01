import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";

export const metadata: Metadata = {
  title: "Apply for Free Healthcare Training",
  description:
    "Start your healthcare career in 3 minutes. Complete RIEC's free pre-qualification form — no cost, no commitment. CNA, EMT, PCT, Phlebotomy, EKG, and Paramedic programs in Warwick, RI.",
  alternates: { canonical: 'https://rieducationcenter.org/apply' },
  openGraph: {
    title: "Apply for Free Healthcare Training | RIEC — Free Healthcare Training Rhode Island",
    description:
      "Complete the 3-step pre-qualification form in under 3 minutes. 100% grant-funded healthcare training for eligible Rhode Islanders. No tuition. No commitment.",
    url: 'https://rieducationcenter.org/apply',
    type: 'website',
  },
};

export default function ApplyPage() {
  return <ApplyForm />;
}
