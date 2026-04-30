"use client";

import { useRef, useEffect, useState } from "react";
import type { GalleryPost } from "@/lib/types";

interface GalleryProps {
  posts: GalleryPost[];
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

  return (
    <section ref={sectionRef} id="gallery" className="bg-cream py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px]">भरती जाहिराती - Job Recruitments</h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4">ताज्या नोकरी संधी — एक नजर</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className={`card-hover bg-surface border border-border rounded-md overflow-hidden ${
                visible ? `animate-fade-in animate-delay-${(i % 4 + 1) * 100}` : "opacity-0"
              }`}
            >
              <div className="relative">
                <div
                  className="w-full bg-cream border-b border-navy/20 flex items-center justify-center text-navy/50 font-medium text-sm"
                  style={{ aspectRatio: "4/3" }}
                  role="img"
                  aria-label={`${post.name} जाहिरात प्रतिमा`}
                >
                  जाहिरात प्रतिमा
                </div>
                {post.is_new && (
                  <span className="absolute top-2 right-2 bg-success text-white text-[11px] font-semibold px-2 py-0.5 rounded">नवीन</span>
                )}
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-navy font-bold text-[14px] md:text-base leading-snug mb-1">{post.name}</h3>
                <p className="text-muted font-medium text-[13px] mb-3">अंतिम तारीख: {post.date}</p>
                <a href={post.link || "#"} className="text-navy font-medium text-[13px] hover:text-gold transition-colors duration-200">अधिक माहिती →</a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="btn-outline inline-block px-6 py-3 rounded-md font-semibold text-sm">सर्व जाहिराती पहा</a>
        </div>
      </div>
    </section>
  );
}
