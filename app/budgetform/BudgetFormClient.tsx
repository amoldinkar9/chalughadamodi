"use client";

import { useState } from "react";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import StickyHeader from "@/components/sections/StickyHeader";
import Footer from "@/components/sections/Footer";

export default function BudgetFormClient() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <StickyHeader />
      
      <main className="min-h-screen pt-[72px] md:pt-[88px] bg-cream">
        {/* Hero Section */}
        <section className="bg-navy text-cream py-12 md:py-16 border-b border-gold/20">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gold hover:text-gold-soft transition-colors mb-6 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              मुख्य पानावर परत जा (Back to Home)
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-[700px]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/30 text-xs font-semibold uppercase tracking-wider mb-3">
                  <FileText size={12} />
                  चालू घडामोडी उपक्रम
                </span>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight font-heading">
                  अंदाजपत्रक फॉर्म (Budget Form)
                </h1>
                <p className="text-gold-soft font-medium text-sm md:text-base mt-3 leading-relaxed">
                  कृपया खालील फॉर्ममध्ये विचारलेली माहिती अचूकपणे भरा. आपल्या मौल्यवान प्रतिक्रिया आमच्यासाठी अत्यंत महत्त्वाच्या आहेत.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfhsmLYW6e5BIxDTOPuIrfl2z45qb0-_41Nl7N3MPzhXEcDjw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-navy px-5 py-3 rounded-md font-semibold text-sm hover:bg-[#C4922C] transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  <ExternalLink size={16} />
                  नवीन विंडोमध्ये उघडा
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            
            {/* Top Action Bar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted text-xs md:text-sm font-medium">
                अडचण येत असल्यास खालील लिंक वापरू शकता.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfhsmLYW6e5BIxDTOPuIrfl2z45qb0-_41Nl7N3MPzhXEcDjw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm font-semibold text-gold hover:text-gold-text flex items-center gap-1.5 transition-colors underline decoration-gold/40 hover:decoration-gold"
              >
                <ExternalLink size={14} />
                थेट गुगल फॉर्म उघडा
              </a>
            </div>

            {/* Premium Form Embed Wrapper */}
            <div className="relative w-full overflow-hidden rounded-xl bg-white border border-border shadow-lg md:shadow-xl">
              
              {/* Premium Skeleton Loader */}
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 px-8 md:px-12 bg-white z-10 min-h-[600px]">
                  <div className="w-full max-w-[600px] space-y-8 animate-pulse">
                    {/* Header skeleton */}
                    <div className="space-y-3">
                      <div className="h-8 bg-slate-100 rounded-md w-3/4"></div>
                      <div className="h-4 bg-slate-100 rounded-md w-1/2"></div>
                    </div>
                    
                    {/* Section line */}
                    <div className="h-[1px] bg-slate-100 w-full my-6"></div>
                    
                    {/* Input skeletons */}
                    <div className="space-y-4">
                      <div className="h-4 bg-slate-100 rounded-md w-1/3"></div>
                      <div className="h-11 bg-slate-50 border border-slate-100 rounded-md"></div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="h-4 bg-slate-100 rounded-md w-1/4"></div>
                      <div className="h-11 bg-slate-50 border border-slate-100 rounded-md"></div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="h-4 bg-slate-100 rounded-md w-2/5"></div>
                      <div className="h-32 bg-slate-50 border border-slate-100 rounded-md"></div>
                    </div>
                    
                    <div className="pt-4 flex gap-4">
                      <div className="h-11 bg-slate-200 rounded-md w-28"></div>
                      <div className="h-11 bg-slate-100 rounded-md w-24"></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center mt-12 gap-3">
                    <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-navy font-medium text-sm animate-pulse text-center">
                      गुगल फॉर्म सुरक्षितपणे लोड होत आहे, कृपया प्रतीक्षा करा...
                    </p>
                  </div>
                </div>
              )}

              {/* The Iframe */}
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfhsmLYW6e5BIxDTOPuIrfl2z45qb0-_41Nl7N3MPzhXEcDjw/viewform?embedded=true"
                width="100%"
                height="3166"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                className="w-full transition-opacity duration-700 ease-in-out"
                style={{ 
                  opacity: loaded ? 1 : 0,
                  display: "block",
                }}
                onLoad={() => setLoaded(true)}
              >
                Loading…
              </iframe>
            </div>

            {/* Secure Note */}
            <div className="mt-8 text-center bg-white/45 border border-border/65 rounded-lg p-5">
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                हा फॉर्म थेट गुगल फॉर्म्स (Google Forms) वर सुरक्षितपणे सबमिट केला जातो. तुमची माहिती पूर्णपणे सुरक्षित आहे आणि ती कोणत्याही तिसऱ्या पक्षाला विकली किंवा शेअर केली जात नाही.
              </p>
            </div>
            
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
