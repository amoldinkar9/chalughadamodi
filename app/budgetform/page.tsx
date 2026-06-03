import type { Metadata } from "next";
import BudgetFormClient from "./BudgetFormClient";

export const metadata: Metadata = {
  title: "अंदाजपत्रक फॉर्म (Budget Form) | चालू घडामोडी",
  description: "चालू घडामोडी अंदाजपत्रक फॉर्म भरा. आपल्या प्रतिक्रिया आणि माहिती आमच्यापर्यंत पोहोचवा.",
  alternates: {
    canonical: "/budgetform",
  },
};

export default function BudgetFormPage() {
  return <BudgetFormClient />;
}
