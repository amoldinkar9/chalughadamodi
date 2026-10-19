import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "गोपनीयता धोरण (Privacy Policy) | चालू घडामोडी",
  description: "चालू घडामोडी (chalughadamodi.in) चे गोपनीयता धोरण (Privacy Policy). विद्यार्थ्यांच्या गोपनीयतेचे संपूर्ण रक्षण.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-cream min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-[800px] mx-auto bg-surface p-8 md:p-12 rounded-xl border border-border shadow-sm">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-gold transition-colors duration-200">
                मुख्यपान
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted/40">›</li>
            <li className="text-navy font-semibold">गोपनीयता धोरण</li>
          </ol>
        </nav>

        <h1 className="text-2xl md:text-4xl font-bold text-navy mb-6">
          गोपनीयता धोरण (Privacy Policy)
        </h1>
        <p className="text-muted text-sm mb-8">
          अंतिम अपडेट: 19 ऑक्टोबर 2026
        </p>

        <div className="space-y-6 text-navy/90 leading-relaxed text-base">
          <section>
            <h2 className="text-xl font-bold text-navy mb-2">1. प्रस्तावना</h2>
            <p>
              &ldquo;चालू घडामोडी&rdquo; (chalughadamodi.in) वर आम्ही तुमच्या गोपनीयतेचा आदर करतो. हे व्यासपीठ सर्व स्पर्धा परीक्षा विद्यार्थ्यांसाठी मोफत चालू घडामोडी आणि शैक्षणिक साहित्य उपलब्ध करून देण्यासाठी तयार केले आहे.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">2. आम्ही कोणती माहिती गोळा करतो?</h2>
            <p>
              आमच्या वेबसाईटवरील चालू घडामोडी, मासिके आणि माहिती वाचण्यासाठी कोणत्याही नोंदणीची (Login) आवश्यकता नाही. आम्ही कोणत्याही वापरकर्त्याचा वैयक्तिक डेटा विनाकारण संकलित किंवा विक्री करत नाही.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">3. कुकीज (Cookies) आणि Analytics</h2>
            <p>
              वेबसाईटचा वापर सुधारण्यासाठी आणि तांत्रिक त्रुटी तपासण्यासाठी आम्ही Google Analytics आणि आवश्यक कुकीजचा वापर करतो. हे केवळ एकूण ट्रॅफिक विश्लेषण आणि वापरकर्ता अनुभव सुधारण्यासाठी वापरले जातात.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">4. बाह्य दुवे (External Links)</h2>
            <p>
              आमच्या वेबसाईटवर अधिकृत सरकारी परीक्षा पोर्टल, जाहिराती किंवा अधिकृत सूचनांचे दुवे असू शकतात. त्या बाह्य वेबसाईट्सच्या धोरणांसाठी आम्ही जबाबदार नाही.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-navy mb-2">5. संपर्क</h2>
            <p>
              गोपनीयता धोरणाबद्दल काही प्रश्न असल्यास आपण आमच्याशी WhatsApp वर थेट संपर्क साधू शकता:{" "}
              <a href="https://wa.me/919579616908" target="_blank" rel="noopener noreferrer" className="text-gold font-bold hover:underline">
                +91 9579616908
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
          <Link href="/" className="btn-primary px-6 py-2.5 rounded-md font-semibold text-sm">
            ← मुख्यपानावर परत जा
          </Link>
        </div>
      </div>
    </main>
  );
}
