"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import type { Announcement } from "@/lib/types";

interface AnnouncementsProps {
  announcements: Announcement[];
}

export default function Announcements({ announcements }: AnnouncementsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  useEffect(() => {
    if (!scrollRef.current) return;
    const child = scrollRef.current.children[current] as HTMLElement | undefined;
    if (child) {
      scrollRef.current.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    }
  }, [current]);

  if (announcements.length === 0) return null;

  return (
    <section ref={sectionRef} id="announcements" className="bg-cream py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className={`text-center mb-8 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px]">सूचना</h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4">ताज्या घोषणा आणि अपडेट्स</p>
        </div>

        <div className={`relative ${visible ? "animate-fade-in animate-delay-200" : "opacity-0"}`}>
          {/* Scrollable banner strip */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {announcements.map((item, idx) => {
              const linkUrl = item.backlink && item.backlink !== "#" ? item.backlink : "/today-current-affairs-in-marathi";
              return (
                <a
                  key={item.id}
                  href={linkUrl}
                  target={linkUrl.startsWith("http") ? "_blank" : undefined}
                  rel={linkUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex-shrink-0 w-full snap-center group block rounded-lg overflow-hidden border border-border card-hover shadow-sm"
                >
                  <div className="relative w-full bg-gradient-to-r from-navy via-navy/90 to-navy-soft flex items-center justify-between p-6 md:p-8" style={{ minHeight: "120px" }}>
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 1152px"
                        priority={idx === 0}
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    ) : (
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
                        <div>
                          <span className="text-gold text-xs font-bold uppercase tracking-wider block mb-1">
                            महत्त्वाची सूचना (Notice)
                          </span>
                          <h3 className="text-white font-bold text-lg md:text-2xl leading-snug">
                            {item.title}
                          </h3>
                        </div>
                        <span className="btn-primary text-xs md:text-sm px-5 py-2.5 rounded-md whitespace-nowrap">
                          अधिक माहिती पहा →
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/10 transition-colors duration-300 pointer-events-none" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Dot indicators */}
          {announcements.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {announcements.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${i === current ? "bg-gold" : "bg-navy/20 hover:bg-navy/40"
                    }`}
                  aria-label={`सूचना ${i + 1} पहा`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
