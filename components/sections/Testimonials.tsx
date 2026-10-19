"use client";

import type { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-cream py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-10 text-center">
        <h2 className="text-navy font-bold text-2xl md:text-[32px]">
          विद्यार्थ्यांचे अनुभव — Testimonials
        </h2>
        <span className="section-underline" />
        <p className="text-muted font-medium text-base mt-4 max-w-xl mx-auto">
          चालू घडामोडींचा नियमित सराव करून स्पर्धा परीक्षांमध्ये यशस्वी ठरलेल्या विद्यार्थ्यांचे मनोगत
        </p>
      </div>

      {/* Testimonials Track */}
      <div className="w-full overflow-hidden">
        <div className="animate-marquee-slow flex gap-6 w-max">
          {/* Main set */}
          {testimonials.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="w-[280px] md:w-[350px] shrink-0 bg-surface border border-border rounded-lg p-6 md:p-8 shadow-sm card-hover flex flex-col justify-between"
            >
              <div>
                <span className="text-gold text-4xl font-bold leading-none block mb-2">&ldquo;</span>
                <p className="text-navy font-medium text-sm md:text-base leading-relaxed mb-5">
                  {t.quote}
                </p>
              </div>
              <div>
                <div className="w-10 h-[1px] bg-gold mb-4" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-cream font-semibold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-navy font-bold text-sm">{t.name}</p>
                    <p className="text-muted font-medium text-[13px]">{t.exam}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Seamless duplicate loop for marquee */}
          {testimonials.map((t, i) => (
            <div
              key={`${t.id}-dup-${i}`}
              className="w-[280px] md:w-[350px] shrink-0 bg-surface border border-border rounded-lg p-6 md:p-8 shadow-sm card-hover flex flex-col justify-between"
              aria-hidden="true"
            >
              <div>
                <span className="text-gold text-4xl font-bold leading-none block mb-2">&ldquo;</span>
                <p className="text-navy font-medium text-sm md:text-base leading-relaxed mb-5">
                  {t.quote}
                </p>
              </div>
              <div>
                <div className="w-10 h-[1px] bg-gold mb-4" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-cream font-semibold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-navy font-bold text-sm">{t.name}</p>
                    <p className="text-muted font-medium text-[13px]">{t.exam}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

