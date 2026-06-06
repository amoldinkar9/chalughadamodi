"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import type { FAQ as FAQType } from "@/lib/types";

interface FAQProps {
  faqs: FAQType[];
}

function formatAnswerHtml(htmlAnswer: string) {
  if (!htmlAnswer) return "";

  // 1. Convert `<font color="xxx">` to inline styles so it isn't overridden by class rules
  let processed = htmlAnswer.replace(/<font\s+([^>]*color=["']([^"']+)["'][^>]*)>/gi, (match, attrs, color) => {
    return `<span style="color: ${color};" ${attrs}>`;
  });
  
  // 2. Convert `<font size="xxx">` to CSS font-size spans
  const sizeMap: Record<string, string> = {
    "1": "12px",
    "2": "14px",
    "3": "16px",
    "4": "18px",
    "5": "20px",
    "6": "24px",
    "7": "30px",
  };
  processed = processed.replace(/<font\s+([^>]*size=["']([^"']+)["'][^>]*)>/gi, (match, attrs, size) => {
    const pxSize = sizeMap[size] || "16px";
    return `<span style="font-size: ${pxSize};" ${attrs}>`;
  });

  // 3. Replace closing </font> tags with </span>
  processed = processed.replace(/<\/font>/gi, "</span>");

  // 4. Ensure any existing <a> tags open in new tab
  processed = processed.replace(/<a(\s[^>]*)?>/gi, (match) => {
    if (match.includes("target=")) return match;
    return match.replace("<a", '<a target="_blank" rel="noopener noreferrer"');
  });

  // 5. Autolink Detection: convert raw URLs to links if they aren't inside an anchor tag
  const tagOrUrlRegex = /(<\/?[a-z][^>]*>)/gi;
  const urlRegex = /(https?:\/\/[^\s<"']+)/gi;
  
  const parts = processed.split(tagOrUrlRegex);
  let inAnchor = false;
  
  const mappedParts = parts.map(part => {
    if (part.startsWith("<")) {
      if (part.toLowerCase().startsWith("<a")) {
        inAnchor = true;
      } else if (part.toLowerCase().startsWith("</a")) {
        inAnchor = false;
      }
      return part;
    } else {
      if (!inAnchor) {
        return part.replace(urlRegex, (url) => {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });
      }
      return part;
    }
  });
  
  return mappedParts.join("");
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (i + 1) % faqs.length;
      document.getElementById(`faq-trigger-${next}`)?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (i - 1 + faqs.length) % faqs.length;
      document.getElementById(`faq-trigger-${prev}`)?.focus();
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]*>/g, ""), // strip HTML for schema
      },
    })),
  };

  return (
    <section ref={sectionRef} id="faq" className="bg-cream py-16 md:py-24">
      {/* FAQPage structured data for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[800px] mx-auto px-6 md:px-12">
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px] font-english">FAQ&apos;s</h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4">तुमचे शंका — आमची उत्तरे</p>
        </div>

        <div
          className={`space-y-4 ${visible ? "animate-fade-in animate-delay-200" : "opacity-0"}`}
          role="region"
          aria-label="वारंवार विचारले जाणारे प्रश्न"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.id}
                className={`group rounded-xl bg-surface border transition-all duration-300 ${
                  isOpen
                    ? "border-gold shadow-md"
                    : "border-border shadow-sm hover:border-gold/50 hover:shadow"
                }`}
              >
                <button
                  id={`faq-trigger-${i}`}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-[16px] md:text-[17px] text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-xl cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-content-${i}`}
                >
                  <span className="pr-4 leading-snug group-hover:text-gold transition-colors duration-200">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-content-${i}`}
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                >
                  <div className="px-6 pb-5 faq-answer-content">
                    <div
                      className="text-muted font-medium text-[15px] leading-relaxed break-words"
                      dangerouslySetInnerHTML={{ __html: formatAnswerHtml(faq.answer) }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`text-center mt-12 p-8 rounded-xl bg-surface border border-border shadow-sm max-w-[600px] mx-auto flex flex-col items-center gap-4 ${
            visible ? "animate-fade-in animate-delay-400" : "opacity-0"
          }`}
        >
          <div className="bg-cream p-3 rounded-full text-gold">
            <MessageCircle size={28} />
          </div>
          <div className="space-y-1">
            <h4 className="text-navy font-bold text-lg">अजून काही प्रश्न आहेत?</h4>
            <p className="text-muted font-medium text-sm">
              तुम्हाला हवी असलेली माहिती मिळाली नसेल, तर आमच्याशी थेट संपर्क साधा.
            </p>
          </div>
          <a
            href="https://wa.me/919579616908"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#1DA851] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            <MessageCircle size={18} fill="currentColor" />
            WhatsApp वर संपर्क करा
          </a>
        </div>
      </div>
    </section>
  );
}

