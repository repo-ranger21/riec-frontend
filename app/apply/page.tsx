import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";

export const metadata: Metadata = {
  title: "Apply for Free Healthcare Training",
  description: "Pre-qualify for 100% grant-funded healthcare certification programs at RIEC.",
};

export default function ApplyPage() {
  return <ApplyForm />;
}
