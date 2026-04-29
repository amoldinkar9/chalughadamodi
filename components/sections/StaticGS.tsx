"use client";

import { useRef, useEffect, useState } from "react";

const steps = [
  { number: "१", label: "बातमी", heading: "प्रोजेक्ट HANUMAN", sub: "आंध्र प्रदेश सरकारचा वन्यजीव संरक्षण उपक्रम" },
  { number: "२", label: "Static GS topic", heading: "GS - पर्यावरण, सरकारी योजना", sub: "" },
  { number: "३", label: "परीक्षेसाठी", heading: "वनरक्षक, MPSC, तलाठी साठी संभाव्य प्रश्न", sub: "" },
];

export default function StaticGS() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="static-gs" className="bg-cream py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px]">चालू घडामोडी + Static GS एकत्र</h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4 max-w-[640px] mx-auto leading-relaxed">
            एखादी बातमी आली, तर ती कुठल्या syllabus topic ला जोडलेली आहे — हे आम्ही सांगतो. म्हणून तुम्हाला दोन्ही एकत्र समजते. एकाच वेळी revision.
          </p>
        </div>

        {/* Desktop horizontal */}
        <div className={`hidden md:flex items-start justify-center gap-0 ${visible ? "animate-fade-in animate-delay-200" : "opacity-0"}`}>
          {steps.map((step, i) => (
            <div key={i} className="contents">
              <div className="flex flex-col items-center text-center w-[260px]">
                <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mb-3">{step.number}</div>
                <p className="text-gold font-semibold uppercase tracking-widest text-[12px] mb-2">{step.label}</p>
                <h3 className="text-navy font-bold text-lg mb-1">{step.heading}</h3>
                {step.sub && <p className="text-muted font-medium text-sm leading-snug">{step.sub}</p>}
              </div>
              {i < steps.length - 1 && (
                <div className="flex items-center px-4 mt-6"><div className="step-connector-h w-16" /></div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className={`md:hidden flex flex-col items-center ${visible ? "animate-fade-in animate-delay-200" : "opacity-0"}`}>
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="flex flex-col items-center text-center max-w-[280px]">
                <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center text-gold font-bold text-xl mb-3">{step.number}</div>
                <p className="text-gold font-semibold uppercase tracking-widest text-[12px] mb-2">{step.label}</p>
                <h3 className="text-navy font-bold text-lg mb-1">{step.heading}</h3>
                {step.sub && <p className="text-muted font-medium text-sm leading-snug">{step.sub}</p>}
              </div>
              {i < steps.length - 1 && <div className="step-connector-v my-2" />}
            </div>
          ))}
        </div>

        <p className={`text-center text-muted text-sm mt-10 ${visible ? "animate-fade-in animate-delay-400" : "opacity-0"}`}>
          अशा प्रकारे प्रत्येक चालू घडामोडी आमच्या मासिकात जोडलेली असते.
        </p>
      </div>
    </section>
  );
}
