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
      const aExpired = aDays < 0;
      const bExpired = bDays < 0;
      const aUrgent = !aExpired && aDays >= 0 && aDays <= 5;
      const bUrgent = !bExpired && bDays >= 0 && bDays <= 5;
      if (aExpired && !bExpired) return 1;
      if (!aExpired && bExpired) return -1;
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
            const isExpired = remaining < 0;
            const isUrgent = !isExpired && remaining >= 0 && remaining <= 5;

            const borderClass = isExpired
              ? "border-red-600 border-2 opacity-75"
              : isUrgent
                ? "border-red-500 border-2 shadow-lg shadow-red-100"
                : "border-border";

            return (
              <div
                key={post.id}
                className={`card-hover bg-surface border rounded-md overflow-hidden flex flex-col h-full ${borderClass} ${visible ? `animate-fade-in animate-delay-${(i % 4 + 1) * 100}` : "opacity-0"}`}
              >
                <div className="relative">
                  {post.image_url ? (
                    <img
                      src={post.image_url}
                      alt={`${post.name} जाहिरात प्रतिमा`}
                      className={`w-full bg-cream border-b border-navy/20 object-cover ${isExpired ? "grayscale" : ""}`}
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
                    {isExpired && (
                      <span className="bg-red-700 text-white text-[11px] font-semibold px-2 py-0.5 rounded font-english">Expired</span>
                    )}
                    {!isExpired && post.is_new && (
                      <span className="bg-success text-white text-[11px] font-semibold px-2 py-0.5 rounded font-english">New</span>
                    )}
                    {!isExpired && post.date_extended && (
                      <span className="bg-orange-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded font-english">Date Extended</span>
                    )}
                    {isUrgent && (
                      <span className="bg-red-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded font-english">Last Date</span>
                    )}
                  </div>
                </div>
                <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-bold text-[14px] md:text-base leading-snug mb-1 ${isExpired ? "text-red-700" : "text-navy"}`}>{post.name}</h3>
                    {post.start_date && (
                      <p className="text-muted font-medium text-[13px]">सुरुवात: {formatDate(post.start_date)}</p>
                    )}
                    <p className={`font-medium text-[13px] mb-3 ${isExpired ? "text-red-700 font-bold" : isUrgent ? "text-red-600 font-bold" : "text-muted"}`}>
                      अंतिम तारीख: {formatDate(post.last_date)}
                    </p>
                  </div>
                  {isExpired ? (
                    <span className="text-red-600 font-semibold text-[13px] font-english">Expired</span>
                  ) : (
                    <div className="flex flex-col md:flex-row gap-2 w-full mt-auto">
                      {post.link && (
                        <a href={post.link} target="_blank" rel="noopener noreferrer" className="block text-center text-navy border border-navy font-semibold text-xs md:text-sm px-2 py-2 md:py-2.5 rounded hover:bg-navy hover:text-white transition-colors duration-200 md:flex-1">अधिक माहिती</a>
                      )}
                      {post.apply_link && (
                        <a href={post.apply_link} target="_blank" rel="noopener noreferrer" className="block text-center bg-gold text-navy font-bold text-xs md:text-sm px-2 py-2 md:py-2.5 rounded hover:opacity-90 transition-opacity duration-200 font-english md:flex-1">Apply Now</a>
                      )}
                    </div>
                  )}
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
