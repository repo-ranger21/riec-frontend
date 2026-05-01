import type { Metadata } from "next";
import RIECHomepage from "@/components/RIECHomepage";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "NGO"],
  "@id": "https://rieducationcenter.org/#organization",
  name: "Rhode Island Education Center for H.O.P.E.",
  alternateName: "RIEC",
  url: "https://rieducationcenter.org",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-401-452-0171",
    contactType: "customer service",
    areaServed: "RI",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "75 Commerce Dr.",
    addressLocality: "Warwick",
    addressRegion: "RI",
    postalCode: "02886",
    addressCountry: "US",
  },
  nonprofitStatus: "Charitable501c3",
  taxID: "99-3099438",
  foundingDate: "2024",
  sameAs: [
    "https://www.facebook.com/rieducationcenter",
    "https://www.instagram.com/rieducationcenter",
    "https://www.linkedin.com/company/rieducationcenter",
  ],
};

export const metadata: Metadata = {
  title: {
    absolute:
      "RIEC — Free Grant-Funded Healthcare Training in Rhode Island",
  },
  description:
    "RIEC offers 100% grant-funded CNA, Phlebotomy, EKG, EMT, and Patient Care " +
    "Tech training for eligible Rhode Islanders. Apply today — $0 tuition for " +
    "qualified applicants. Warwick, RI · 401-452-0171.",
  alternates: {
    canonical: "https://rieducationcenter.org",
  },
  openGraph: {
    title: "RIEC — Free Grant-Funded Healthcare Training in Rhode Island",
    description:
      "100% grant-funded CNA, EMT, Phlebotomy, EKG & PCT certification for " +
      "eligible Rhode Islanders. Apply today — $0 tuition. Warwick, RI.",
    url: "https://rieducationcenter.org",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <RIECHomepage />
    </>
  );
}
