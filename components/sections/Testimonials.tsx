"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/types";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollLeft, clientWidth, scrollWidth } = container;

      // Find which card is closest to the scroll view start
      const children = Array.from(container.children) as HTMLElement[];
      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const childLeft = child.offsetLeft - container.offsetLeft;
        const distance = Math.abs(childLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      // Initial check
      handleScroll();
      // Handle resize
      window.addEventListener("resize", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleScroll);
    };
  }, [testimonials]);

  const handleScrollPrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth + 24 // card width + gap
        : container.clientWidth;
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const handleScrollNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild
        ? (container.firstElementChild as HTMLElement).offsetWidth + 24 // card width + gap
        : container.clientWidth;
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} id="testimonials" className="bg-cream py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative group">
        <div className={`text-center mb-12 ${visible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-navy font-bold text-2xl md:text-[32px] font-english">Testimonials</h2>
          <span className="section-underline" />
        </div>

        <div className="relative">
          {/* Left Arrow Button */}
          {canScrollLeft && (
            <button
              onClick={handleScrollPrev}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface border border-border text-navy hover:bg-cream hover:text-gold transition-all shadow-md cursor-pointer focus:outline-none"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Right Arrow Button */}
          {canScrollRight && (
            <button
              onClick={handleScrollNext}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface border border-border text-navy hover:bg-cream hover:text-gold transition-all shadow-md cursor-pointer focus:outline-none"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none py-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={`w-[85vw] sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)] flex-shrink-0 bg-surface border border-border rounded-md p-6 md:p-8 snap-align-start card-hover ${
                  visible ? `animate-fade-in animate-delay-${(i + 1) * 100}` : "opacity-0"
                }`}
              >
                <span className="text-gold text-4xl font-bold leading-none block mb-3">&ldquo;</span>
                <p className="text-navy font-medium text-base leading-relaxed mb-5">{t.quote}</p>
                <div className="w-10 h-[1px] bg-gold mb-5" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-cream font-semibold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-navy font-bold text-sm">{t.name}</p>
                    <p className="text-muted font-medium text-[13px]">{t.exam}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    const cardElement = container.children[index] as HTMLElement;
                    if (cardElement) {
                      container.scrollTo({
                        left: cardElement.offsetLeft - container.offsetLeft,
                        behavior: "smooth",
                      });
                    }
                  }
                }}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  activeIndex === index
                    ? "bg-gold w-6"
                    : "bg-border w-2.5 hover:bg-gold-soft"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
