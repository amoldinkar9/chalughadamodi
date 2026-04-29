"use client";

import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    initials: "प्रि",
    name: "प्रिया देशमुख",
    exam: "तलाठी, २०२५",
    quote: "Static GS शी प्रत्येक बातमीची जोडणी मला खूप आवडली. Revision सोपी झाली.",
  },
  {
    initials: "सं",
    name: "संदीप पाटील",
    exam: "महाराष्ट्र पोलीस, २०२५",
    quote: "मराठीत स्पष्टीकरण असल्यामुळे current affairs कधीच कठीण वाटले नाहीत.",
  },
  {
    initials: "रो",
    name: "रोहित जाधव",
    exam: "रेल्वे RRB, २०२५",
    quote: "मोफत मासिक PDF मुळे मला coaching ची गरज पडली नाही. प्रामाणिक platform.",
  },
];

export default function Testimonials() {
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
    <section ref={sectionRef} id="testimonials" className="bg-cream py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px]">विद्यार्थी काय म्हणतात</h2>
          <span className="section-underline" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-surface border border-border rounded-md p-6 md:p-8 ${visible ? `animate-fade-in animate-delay-${(i + 1) * 100}` : "opacity-0"}`}
            >
              <span className="text-gold text-4xl font-bold leading-none block mb-3">&ldquo;</span>
              <p className="text-navy font-medium text-base leading-relaxed mb-5">{t.quote}</p>
              <div className="w-10 h-[1px] bg-gold mb-5" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-cream font-semibold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="text-navy font-bold text-sm">{t.name}</p>
                  <p className="text-muted font-medium text-[13px]">{t.exam}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
