"use client";

import { useMemo } from "react";
import type { GalleryPost } from "@/lib/types";

interface GalleryProps {
  posts: GalleryPost[];
}

function parseDateParts(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.trim().split(/[-/]/);
  if (parts.length === 3) {
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      return new Date(y, m, d);
    } else if (parts[2].length === 4) {
      // DD-MM-YYYY
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const y = parseInt(parts[2], 10);
      return new Date(y, m, d);
    }
  }
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function daysUntil(dateStr: string): number {
  const target = parseDateParts(dateStr);
  if (!target) return Infinity;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

const MARATHI_MONTHS = [
  "जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून",
  "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"
];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = parseDateParts(dateStr);
  if (!d) return "";
  return `${d.getDate()} ${MARATHI_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export default function Gallery({ posts }: GalleryProps) {
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

  if (!posts || posts.length === 0) return null;

  return (
    <section id="gallery" className="bg-cream py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-navy font-bold text-2xl md:text-[32px]">
            भरती जाहिराती — Job Recruitments
          </h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4">
            महाराष्ट्रातील ताज्या शासकीय नोकरी संधी — एक नजर
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => {
            const hasLastDate = Boolean(post.last_date);
            const remaining = hasLastDate ? daysUntil(post.last_date) : Infinity;
            const isExpired = hasLastDate && remaining < 0;
            const isUrgent = !isExpired && remaining >= 0 && remaining <= 5;

            const borderClass = isExpired
              ? "border-red-400 bg-red-50/20"
              : isUrgent
                ? "border-amber-500 shadow-md shadow-amber-100"
                : "border-border";

            return (
              <div
                key={post.id}
                className={`card-hover bg-surface border rounded-lg overflow-hidden flex flex-col justify-between h-full p-5 ${borderClass}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/10 text-navy">
                      सरकारी भरती
                    </span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {isExpired && (
                        <span className="bg-red-700 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded font-english">
                          मुदत संपली (Expired)
                        </span>
                      )}
                      {!isExpired && post.is_new && (
                        <span className="bg-emerald-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded font-english">
                          New
                        </span>
                      )}
                      {!isExpired && post.date_extended && (
                        <span className="bg-amber-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded font-english">
                          Date Extended
                        </span>
                      )}
                      {isUrgent && (
                        <span className="bg-red-600 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded font-english">
                          शेवटचे {remaining === 0 ? "आज" : `${remaining} दिवस`}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className={`font-bold text-lg leading-snug mb-3 ${isExpired ? "text-muted" : "text-navy"}`}>
                    {post.name}
                  </h3>

                  <div className="space-y-1.5 text-sm mb-5 text-muted">
                    {post.start_date && (
                      <p className="flex justify-between">
                        <span>अर्ज सुरू:</span>
                        <strong className="text-navy">{formatDate(post.start_date)}</strong>
                      </p>
                    )}
                    {hasLastDate && (
                      <p className="flex justify-between">
                        <span>अंतिम तारीख:</span>
                        <strong className={isExpired ? "text-red-700 font-bold" : isUrgent ? "text-red-600 font-bold" : "text-navy font-bold"}>
                          {formatDate(post.last_date)}
                        </strong>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-border mt-auto flex gap-3">
                  {post.link && post.link !== "#" ? (
                    <a
                      href={post.link}
                      className="text-center text-navy border border-navy/30 hover:border-navy font-semibold text-xs md:text-sm px-3 py-2 rounded-md hover:bg-navy hover:text-white transition-colors duration-200 flex-1"
                    >
                      सविस्तर माहिती
                    </a>
                  ) : null}
                  {post.apply_link && post.apply_link !== "#" ? (
                    <a
                      href={post.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center bg-gold hover:bg-gold/90 text-navy font-bold text-xs md:text-sm px-3 py-2 rounded-md transition-opacity duration-200 font-english flex-1"
                    >
                      Online Apply
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
