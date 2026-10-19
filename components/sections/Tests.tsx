"use client";

import { useState } from "react";
import type { Test } from "@/lib/types";

interface TestsProps {
  tests: Test[];
}

const ITEMS_PER_LOAD = 6;

export default function Tests({ tests }: TestsProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const displayedTests = tests.slice(0, visibleCount);
  const hasMore = visibleCount < tests.length;

  return (
    <section id="tests" className="bg-brown py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-white font-bold text-2xl md:text-[32px]">टेस्ट - Test</h2>
          <span className="section-underline" />
          <p className="text-cream font-medium text-base mt-4">Weekly Test. 30 प्रश्न. 30 मिनिट. <br />लगेच निकाल, सविस्तर विश्लेषण आणि स्पष्टीकरण.</p>
        </div>

        <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6">
          {displayedTests.map((test) => {
            const testUrl = test.href && !test.href.startsWith("#") ? test.href : "https://www.tcs9.in/mr/test-series";
            return (
              <div key={test.id} className="w-full md:w-[calc((100%-3rem)/3)] bg-surface rounded-md overflow-hidden text-center shadow-sm card-hover flex flex-col justify-between">
                {test.image_url && (
                  <div className="w-full aspect-video overflow-hidden">
                    <img
                      src={test.image_url}
                      alt={test.title}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 100vw, 352px"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-navy font-bold text-xl md:text-2xl mb-3">{test.title}</h3>
                    {test.description && (
                      <p className="text-muted font-medium text-sm mb-6 whitespace-pre-wrap">
                        {test.description}
                      </p>
                    )}
                  </div>
                  <a
                    href={testUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-block px-6 py-3 rounded-md font-semibold text-sm font-english"
                    aria-label={`Start Test — ${test.title}`}
                  >
                    Start Test
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
              className="btn-primary px-6 py-4 rounded-md font-semibold text-sm" style={{ backgroundColor: "#1B7340", color: "#ffffff" }}>
              अजून टेस्ट द्या
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
