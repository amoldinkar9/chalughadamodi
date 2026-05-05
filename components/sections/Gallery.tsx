"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import type { GalleryPost } from "@/lib/types";

interface GalleryProps {
  posts: GalleryPost[];
}

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

const MARATHI_MONTHS = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getDate()} ${MARATHI_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function Gallery({ posts }: GalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      const aDays = a.last_date ? daysUntil(a.last_date) : Infinity;
      const bDays = b.last_date ? daysUntil(b.last_date) : Infinity;
      const aUrgent = aDays >= 0 && aDays <= 5;
      const bUrgent = bDays >= 0 && bDays <= 5;
      if (aUrgent && !bUrgent) return -1;
      if (!aUrgent && bUrgent) return 1;
      return (a.display_order || 0) - (b.display_order || 0);
    });
  }, [posts]);

  return (
    <section ref={sectionRef} id="gallery" className="bg-cream py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px]">भरती जाहिराती - Job Recruitments</h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4">ताज्या नोकरी संधी — एक नजर</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedPosts.map((post, i) => {
            const remaining = post.last_date ? daysUntil(post.last_date) : Infinity;
            const isUrgent = remaining >= 0 && remaining <= 5;

            return (
              <div
                key={post.id}
                className={`card-hover bg-surface border rounded-md overflow-hidden ${isUrgent ? "border-red-500 border-2 shadow-lg shadow-red-100" : "border-border"
                  } ${visible ? `animate-fade-in animate-delay-${(i % 4 + 1) * 100}` : "opacity-0"}`}
              >
                <div className="relative">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={`${post.name} जाहिरात प्रतिमा`}
                      className="w-full bg-cream border-b border-navy/20 object-cover"
                      style={{ aspectRatio: "4/3" }}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full bg-cream border-b border-navy/20 flex items-center justify-center text-navy/50 font-medium text-sm"
                      style={{ aspectRatio: "4/3" }}
                      role="img"
                      aria-label={`${post.name} जाहिरात प्रतिमा`}
                    >
                      जाहिरात प्रतिमा
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    {post.is_new && (
                      <span className="bg-success text-white text-[11px] font-semibold px-2 py-0.5 rounded">New</span>
                    )}
                    {post.date_extended && (
                      <span className="bg-orange-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded">Date Extended</span>
                    )}
                    {isUrgent && (
                      <span className="bg-red-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded">Last Date</span>
                    )}
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-navy font-bold text-[14px] md:text-base leading-snug mb-1">{post.name}</h3>
                  {post.start_date && (
                    <p className="text-muted font-medium text-[13px]">सुरुवात: {formatDate(post.start_date)}</p>
                  )}
                  <p className={`font-medium text-[13px] mb-3 ${isUrgent ? "text-red-600 font-bold" : "text-muted"}`}>
                    अंतिम तारीख: {formatDate(post.last_date)}
                  </p>
                  <a href={post.link || "#"} className="text-navy font-medium text-[13px] hover:text-gold transition-colors duration-200">अधिक माहिती →</a>
                </div>
              </div>
            );
          })}
        </div>

        {/*
        <div className="text-center mt-10">
          <a href="#" className="btn-outline inline-block px-6 py-3 rounded-md font-semibold text-sm">सर्व जाहिराती पहा</a>
        </div>
        */}
      </div>
    </section>
  );
}
