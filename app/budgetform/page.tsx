import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "अंदाजपत्रक फॉर्म (Budget Form) | चालू घडामोडी",
  description: "चालू घडामोडी अंदाजपत्रक फॉर्म",
  alternates: {
    canonical: "/budgetform",
  },
};

export default function BudgetFormPage() {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfhsmLYW6e5BIxDTOPuIrfl2z45qb0-_41Nl7N3MPzhXEcDjw/viewform?embedded=true"
        width="100%"
        height="3166"
        style={{ border: 0, maxWidth: "640px" }}
        className="w-full min-h-screen"
        marginHeight={0}
        marginWidth={0}
      >
        Loading…
      </iframe>
    </div>
  );
}
