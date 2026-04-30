"use client";

import { useRef, useEffect, useState } from "react";
import type { Test } from "@/lib/types";

interface TestsProps {
  tests: Test[];
}

export default function Tests({ tests }: TestsProps) {
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
    <section ref={sectionRef} id="tests" className="bg-navy py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-white font-bold text-2xl md:text-[32px]">टेस्ट - Test</h2>
          <span className="section-underline" />
          <p className="text-cream font-medium text-base mt-4">रोजची टेस्ट. 10 प्रश्न. 5 मिनिट. लगेच निकाल.</p>
          <p className="text-gold font-medium text-sm mt-3 italic">आज 542 विद्यार्थ्यांनी टेस्ट दिली</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tests.map((test, i) => (
            <div key={test.id} className={`bg-surface rounded-md p-6 md:p-8 text-center ${visible ? `animate-fade-in animate-delay-${(i + 1) * 100}` : "opacity-0"}`}>
              <h3 className="text-navy font-bold text-xl md:text-2xl mb-3">{test.title}</h3>
              <div className="flex items-center justify-center gap-3 text-muted font-medium text-sm mb-6">
                <span>{test.questions} प्रश्न</span>
                <span className="text-gold">•</span>
                <span>{test.duration}</span>
              </div>
              <a href={test.href} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block px-6 py-3 rounded-md font-semibold text-sm">टेस्ट सुरू करा</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
