"use client";

import { useRef, useEffect, useState } from "react";
import type { Magazine as MagazineType } from "@/lib/types";

interface MagazineProps {
  magazines: MagazineType[];
}

const ITEMS_PER_LOAD = 6;

export default function Magazine({ magazines }: MagazineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const displayedMagazines = magazines.slice(0, visibleCount);
  const hasMore = visibleCount < magazines.length;

  return (
    <section ref={sectionRef} id="magazine" className="bg-cream py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px]">मासिके - Magazines</h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4 max-w-xl mx-auto">महिन्याची संपूर्ण चालू घडामोडी — एका PDF मध्ये. मोफत वाचा.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {displayedMagazines.map((mag, i) => (
            <a key={mag.id} href={mag.pdf_url || "#"} target="_blank" rel="noopener noreferrer" className={`card-hover bg-surface border border-border rounded-md overflow-hidden block ${visible ? `animate-fade-in animate-delay-${(i % 3 + 1) * 100}` : "opacity-0"}`}>
              {mag.image_url ? (
                <img
                  src={mag.image_url}
                  alt={`${mag.month} मासिक मुखपृष्ठ`}
                  className="w-full bg-cream border-b border-navy/20 object-cover"
                  style={{ aspectRatio: "4/3" }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  loading="lazy"
                />
              ) : (
                <div className="w-full bg-cream border-b border-navy/20 flex items-center justify-center text-navy/50 font-medium text-sm" style={{ aspectRatio: "4/5" }} role="img" aria-label={`${mag.month} मासिक मुखपृष्ठ`}>मासिक मुखपृष्ठ</div>
              )}
              <div className="p-4">
                <h3 className="text-navy font-bold text-lg md:text-[25px] mb-3">{mag.month}</h3>
                <span className="block text-center px-6 py-4 rounded-md font-semibold text-sm" style={{ backgroundColor: "#c20101ff", color: "#ffffff" }}>वाचा</span>
              </div>
            </a>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
              className="btn-primary px-6 py-4 rounded-md font-semibold text-sm" style={{ backgroundColor: "#1B7340", color: "#ffffff" }}>
              अजून मासिके पहा →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
