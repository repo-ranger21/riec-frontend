import type { Metadata } from "next";
import RIECHomepage from "@/components/RIECHomepage";

export const metadata: Metadata = {
  title: "Grant-Funded Healthcare Training Programs | RIEC Rhode Island",
  description: "RIEC offers 100% grant-funded CNA, Phlebotomy, EKG, EMT, and Patient Care Tech training for eligible Rhode Islanders.",
};

export default function HomePage() {
  return <RIECHomepage />;
}


