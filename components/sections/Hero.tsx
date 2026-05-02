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
            <p className="text-gold font-semibold uppercase text-[15px] md:text-[17px] mb-4">
              स्पर्धा परीक्षा विद्यार्थ्यांसाठी
            </p>
            <h1 className="text-navy font-extrabold text-[36px] md:text-[56px] leading-[1.1] tracking-tight mb-6">
              चालू घडामोडी,
              <br />
              आता मराठीत.
            </h1>
            <p className="text-navy-soft font-medium text-lg md:text-xl max-w-[520px] mb-8 leading-relaxed">
              UPSC, MPSC, तलाठी, सरळसेवा — एका जागी. रोज अपडेट. मोफत.
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
            </div>
          </div>

          {/* Hero Image */}
          <div className="animate-fade-in animate-delay-200 flex justify-center md:justify-end">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="चालू घडामोडी हिरो प्रतिमा"
                className="w-full max-w-[400px] rounded-lg object-cover"
                style={{ aspectRatio: "5/6" }}
              />
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
    </section>
  );
}
