"use client";

import { useRef, useEffect, useState } from "react";

const magazines = [
  { month: "एप्रिल २०२६", questions: "१५०", pages: "८०" },
  { month: "मार्च २०२६", questions: "१५०", pages: "८०" },
  { month: "फेब्रुवारी २०२६", questions: "१५०", pages: "८०" },
  { month: "जानेवारी २०२६", questions: "१५०", pages: "८०" },
  { month: "डिसेंबर २०२५", questions: "१५०", pages: "८०" },
  { month: "नोव्हेंबर २०२५", questions: "१५०", pages: "८०" },
];

export default function Magazine() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="magazine"
      className="bg-cream py-16 md:py-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Title */}
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px]">
            मासिक चालू घडामोडी मासिके
          </h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4 max-w-xl mx-auto">
            महिन्याची संपूर्ण चालू घडामोडी — एका PDF मध्ये. मोफत वाचा.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {magazines.map((mag, i) => (
            <div
              key={i}
              className={`card-hover bg-surface border border-border rounded-md overflow-hidden ${
                visible ? `animate-fade-in animate-delay-${(i % 3 + 1) * 100}` : "opacity-0"
              }`}
            >
              {/* Cover */}
              <div
                className="w-full bg-cream border-b border-navy/20 flex items-center justify-center text-navy/50 font-medium text-sm"
                style={{ aspectRatio: "3/4" }}
                role="img"
                aria-label={`${mag.month} मासिक मुखपृष्ठ`}
              >
                मासिक मुखपृष्ठ
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-navy font-bold text-lg md:text-[22px] mb-1">
                  {mag.month}
                </h3>
                <p className="text-gold font-medium text-[13px] mb-4">
                  {mag.questions} + प्रश्न | {mag.pages} पाने
                </p>
                <a
                  href="#"
                  className="btn-primary block text-center px-4 py-2.5 rounded-md font-semibold text-sm"
                >
                  वाचा
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Link */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="text-gold font-medium text-sm hover:underline transition-all duration-200"
          >
            जुनी मासिके पहा →
          </a>
        </div>
      </div>
    </section>
  );
}
