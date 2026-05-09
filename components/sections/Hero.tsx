import Image from "next/image";

interface HeroProps {
  imageUrl?: string;
}

export default function Hero({ imageUrl }: HeroProps) {
  return (
    <section
      id="hero"
      className="bg-cream pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text */}
          <div className="animate-fade-in">
            <h1 className="text-red font-bold uppercase text-[80px] md:text-[40px] mb-2">
              2026 ची मेगा भरती
            </h1>
            <h3 className="text-navy font-bold text-[25px] md:text-[25px] leading-[1.3] tracking-tight mb-6">
              हजारो विद्यार्थी दररोज सराव करत आहेत.
              <br />
              तुम्ही मागे तर राहत नाही आहात ना?
            </h3>
            <h3 className="text-navy font-extrabold text-[32px] md:text-[36px] leading-[1.3] tracking-tight mb-6">
              <br />
              चालू घडामोडी, आता मराठीत.
            </h3>


            <p className="text-navy-soft font-medium text-lg md:text-xl max-w-[520px] mb-8 leading-relaxed">
              UPSC, MPSC, तलाठी, सरळसेवा — एका जागी. रोज अपडेट. मोफत.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#tests"
                className="btn-primary px-6 py-3 rounded-md font-semibold text-base font-english"
              >
                Start Test
              </a>
              <a
                href="#magazine"
                className="btn-outline px-6 py-3 rounded-md font-semibold text-base font-english"
              >
                Read Magazine
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted font-semibold text-sm">
              <span className="font-english">Current + Static GS</span>
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
          <div className="animate-fade-in animate-delay-200 flex justify-center md:justify-end">
            {imageUrl ? (
              <div className="relative w-full max-w-[400px]" style={{ aspectRatio: "5/6" }}>
                <Image
                  src={imageUrl}
                  alt="चालू घडामोडी हिरो प्रतिमा"
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 80vw, 400px"
                  priority
                />
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
    </section >
  );
}
