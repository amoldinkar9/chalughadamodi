import Image from "next/image";

interface HeroProps {
  imageUrl?: string;
  mobileImageUrl?: string;
  customTitle?: string;
  customSubtitle?: string;
  customDescription?: string;
  imageLink?: string;
  mobileImageLink?: string;
}

export default function Hero({
  imageUrl,
  mobileImageUrl,
  customTitle,
  customSubtitle,
  customDescription,
  imageLink,
  mobileImageLink,
}: HeroProps) {
  const mobileImg = mobileImageUrl || imageUrl;
  const desktopImg = imageUrl || mobileImageUrl;

  return (
    <section
      id="hero"
      className="bg-cream pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* LCP element — priority + fetchpriority for fastest paint */}
          <div className="animate-fade-in">
            <h1 className="text-red-500 font-extrabold leading-[1.3] tracking-tight mb-6 w-full whitespace-nowrap"
              style={{ fontSize: 'clamp(36px, 10.5vw, 75px)' }}>
              {customTitle || "चालू घडामोडी 2026"}
            </h1>
            <p className="text-navy font-bold text-[30px] md:text-[40px] leading-[1.3] tracking-tight mb-6">
              {customSubtitle || (
                <>
                  हजारो विद्यार्थी दररोज सराव करत आहेत.
                  <br />
                  तुम्ही मागे तर राहत नाही ना?
                </>
              )}
            </p>

            <p className="text-navy-soft font-bold text-lg md:text-xl max-w-[520px] mb-8 leading-relaxed">
              {customDescription || (
                <>
                  चालू घडामोडी, आता मराठीत. <br />
                  UPSC, MPSC, तलाठी, सरळसेवा — एका जागी. रोज अपडेट. मोफत.
                </>
              )}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#tests"
                className="btn-primary px-6 py-3 rounded-md font-semibold text-base"
              >
                Start Test
              </a>
              <a
                href="#magazine"
                className="btn-outline px-6 py-3 rounded-md font-semibold text-base"
              >
                Read Magazine
              </a>
              <a
                href="#gallery"
                className="btn-outline px-6 py-3 rounded-md font-semibold text-base"
              >
                Job Recruitment
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted font-semibold text-sm">
              <span>Current + Static GS</span>
              <span className="text-gold">•</span>
              <span>100% मोफत</span>
              <span className="text-gold">•</span>
              <span>मराठीत स्पष्टीकरण</span>
              <span className="text-gold">•</span>
              <span>Static GS शी जोडलेले</span>
              <span className="text-gold">•</span>
              <span>सविस्तर विश्लेषण</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-fade-in animate-delay-200 flex flex-col items-center md:items-end w-full">
            {/* Mobile View Image (16:9) */}
            <div className="w-full flex justify-center md:hidden">
              {mobileImg ? (
                <div className="relative w-full max-w-[500px]" style={{ aspectRatio: "16/9" }}>
                  {mobileImageLink ? (
                    <a href={mobileImageLink} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={mobileImg}
                        alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 90vw, 500px"
                        priority
                        fetchPriority="high"
                      />
                    </a>
                  ) : (
                    <Image
                      src={mobileImg}
                      alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 90vw, 500px"
                      priority
                      fetchPriority="high"
                    />
                  )}
                </div>
              ) : (
                <div
                  className="w-full max-w-[500px] border border-navy rounded-lg bg-cream flex items-center justify-center text-navy font-medium text-lg"
                  style={{ aspectRatio: "16/9" }}
                  role="img"
                  aria-label="चालू घडामोडी हिरो प्रतिमा"
                >
                  हिरो प्रतिमा
                </div>
              )}
            </div>

            {/* Desktop View Image (5:6) */}
            <div className="w-full hidden md:flex md:justify-end">
              {desktopImg ? (
                <div className="relative w-full max-w-[400px]" style={{ aspectRatio: "5/6" }}>
                  {imageLink ? (
                    <a href={imageLink} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={desktopImg}
                        alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                        fill
                        className="rounded-lg object-cover"
                        sizes="400px"
                        priority
                        fetchPriority="high"
                      />
                    </a>
                  ) : (
                    <Image
                      src={desktopImg}
                      alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                      fill
                      className="rounded-lg object-cover"
                      sizes="400px"
                      priority
                      fetchPriority="high"
                    />
                  )}
                </div>
              ) : (
                <div
                  className="w-full max-w-[400px] border border-navy rounded-lg bg-cream flex items-center justify-center text-navy font-medium text-lg"
                  style={{ aspectRatio: "5/6" }}
                  role="img"
                  aria-label="चालू घडामोडी हिरो प्रतिमा"
                >
                  हिरो प्रतिमा
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
