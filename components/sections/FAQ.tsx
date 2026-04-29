"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react";

const faqs = [
  { q: "हे website मोफत आहे का?", a: "होय, संपूर्णपणे मोफत. कुठलेही शुल्क नाही, login नाही." },
  { q: "मासिक PDF download करता येते का?", a: "होय. प्रत्येक मासिकाच्या पानावर PDF download बटण आहे." },
  { q: "टेस्ट किती कठीण आहे?", a: "MPSC, तलाठी, पोलीस भरती च्या प्रत्यक्ष परीक्षेसारखीच पातळी. सरावासाठी योग्य." },
  { q: "MPSC आणि तलाठी दोन्हीसाठी useful आहे का?", a: "होय. आम्ही प्रत्येक चालू घडामोडी सर्व प्रमुख परीक्षांच्या syllabus नुसार tag करतो." },
  { q: "Content रोज update होते का?", a: "होय. आठवड्यातील ६ दिवस ताज्या चालू घडामोडी. मासिक एकदा PDF स्वरूपात." },
  { q: "मराठीतच सर्व content आहे का?", a: "होय. १००% मराठी. कठीण इंग्रजी संज्ञा असल्यास त्यांचा मराठीत अर्थ देखील दिला जातो." },
  { q: "अजून प्रश्न असतील तर?", a: "खाली WhatsApp बटणावर click करा. आम्हाला थेट संपर्क करा." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown") { e.preventDefault(); const next = (i + 1) % faqs.length; document.getElementById(`faq-trigger-${next}`)?.focus(); }
    if (e.key === "ArrowUp") { e.preventDefault(); const prev = (i - 1 + faqs.length) % faqs.length; document.getElementById(`faq-trigger-${prev}`)?.focus(); }
  };

  return (
    <section ref={sectionRef} id="faq" className="bg-cream py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px]">तुमचे प्रश्न</h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4">तुमचे शंका — आमची उत्तरे</p>
        </div>

        <div className={`${visible ? "animate-fade-in animate-delay-200" : "opacity-0"}`} role="region" aria-label="वारंवार विचारले जाणारे प्रश्न">
          {faqs.map((faq, i) => (
            <div key={i} className="accordion-item">
              <button
                id={`faq-trigger-${i}`}
                className="accordion-trigger"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-content-${i}`}
              >
                <span className="pr-4">{faq.q}</span>
                <span className="accordion-icon">{openIndex === i ? "−" : "+"}</span>
              </button>
              <div
                id={`faq-content-${i}`}
                className={`accordion-content ${openIndex === i ? "open" : ""}`}
                role="region"
                aria-labelledby={`faq-trigger-${i}`}
              >
                <p className="text-muted font-medium text-[15px] pb-5 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 flex flex-col items-center gap-3 ${visible ? "animate-fade-in animate-delay-400" : "opacity-0"}`}>
          <p className="text-navy font-medium text-base">अजून प्रश्न आहेत?</p>
          <a
            href="https://wa.me/919579616908"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-[#1DA851] transition-colors duration-200"
          >
            <MessageCircle size={18} />
            WhatsApp करा
          </a>
        </div>
      </div>
    </section>
  );
}
