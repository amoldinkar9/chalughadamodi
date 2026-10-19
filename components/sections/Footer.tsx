import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { SEO_KEYWORDS } from "@/lib/seo-keywords";

const footerLinks = [
  { label: "मुख्यपान", href: "/#hero" },
  { label: "ताज्या घडामोडी", href: "/#daily-updates" },
  { label: "मासिके", href: "/#magazine" },
  { label: "टेस्ट", href: "/#tests" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "साइटमॅप (Sitemap)", href: "/sitemap.xml" },
];

const popularKeywordLinks = [
  { label: "चालू घडामोडी 2026", href: "/chalu-ghadamodi-2026" },
  { label: "चालू घडामोडी 2026 PDF", href: "/chalu-ghadamodi-2026-pdf" },
  { label: "आजच्या चालू घडामोडी", href: "/today-current-affairs-in-marathi" },
  { label: "MPSC चालू घडामोडी", href: "/mpsc-chalu-ghadamodi" },
  { label: "तलाठी भरती चालू घडामोडी", href: "/talathi-chalu-ghadamodi" },
  { label: "पोलीस भरती चालू घडामोडी", href: "/police-bharti-chalu-ghadamodi" },
  { label: "रेल्वे भरती मराठी", href: "/railway-bharti-marathi" },
];

type SocialItem = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

const socialIcons: SocialItem[] = [
  { icon: <MessageCircle size={20} />, href: "https://wa.me/919579616908", label: "WhatsApp वर संपर्क करा" },
];

interface FooterProps {
  currentKeyword?: string;
}

export default function Footer({ currentKeyword }: FooterProps) {
  const activeKeywordObj = currentKeyword
    ? SEO_KEYWORDS.find((k) => k.slug === currentKeyword)
    : undefined;

  const seoTitle = activeKeywordObj
    ? `${activeKeywordObj.title} — चालू घडामोडी व स्पर्धा परीक्षा तयारी 2026`
    : "चालू घडामोडी 2026 — मराठी स्पर्धा परीक्षा सराव व अभ्यास मंच";

  const seoDescription = activeKeywordObj
    ? `${activeKeywordObj.title} साठी दर्जेदार मराठी चालू घडामोडी, महत्त्वाचे प्रश्न-उत्तर, Static GS नोट्स आणि ऑनलाइन सराव चाचण्या. MPSC, तलाठी, पोलीस भरती व सरळसेवा परीक्षांची तयारी करणाऱ्या विद्यार्थ्यांसाठी अद्ययावत मार्गदर्शन.`
    : "MPSC राज्यसेवा, कंबाईन गट ब व गट क, तलाठी भरती, महाराष्ट्र पोलीस भरती, रेल्वे भरती आणि इतर सर्व स्पर्धा परीक्षांसाठी दररोजच्या ताज्या चालू घडामोडी, डिजिटल मासिके, ऑनलाइन टेस्ट सिरीज व Static GS सराव.";

  return (
    <footer id="footer" className="bg-cream pt-16 pb-6">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Col 1: Brand & Overview */}
          <div>
            <p className="text-navy font-bold text-xl mb-2">चालू घडामोडी</p>
            <p className="text-muted font-medium text-sm leading-relaxed mb-4">
              मराठी विद्यार्थ्यांचा विश्वासार्ह चालू घडामोडी आणि स्पर्धा परीक्षा सराव मंच.
            </p>
            <p className="text-xs text-muted/80">
              MPSC, तलाठी, पोलीस भरती, रेल्वे व सर्व स्पर्धा परीक्षांसाठी दररोज मोफत सराव.
            </p>
          </div>

          {/* Col 2: Important Links */}
          <div>
            <p className="text-navy font-bold text-base mb-4">महत्त्वाच्या लिंक्स (Important Links)</p>
            <ul className="space-y-2">
              {footerLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-muted font-medium text-sm hover:text-gold transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Updates */}
          <div>
            <p className="text-navy font-bold text-base mb-4">लोकप्रिय चालू घडामोडी</p>
            <ul className="space-y-2">
              {popularKeywordLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-muted font-medium text-sm hover:text-gold transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <p className="text-navy font-bold text-base mb-4">आमच्याशी जोडले रहा</p>
            <p className="text-muted text-xs mb-3">
              काही शंका असल्यास WhatsApp वर थेट संपर्क करा:
            </p>
            <div className="flex items-center gap-3">
              {socialIcons.map(({ icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-navy/5 text-navy hover:text-gold hover:bg-navy/10 transition-colors text-sm font-semibold"
                  aria-label={label}
                >
                  {icon}
                  <span>WhatsApp Chat</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SEO / GEO / AIO / AEO Semantic H1 Entity Card */}
        <div className="border-t border-gold/30 pt-8 pb-8">
          <div className="bg-navy/5 border border-border/70 rounded-xl p-5 md:p-7">
            <h1 className="text-navy font-bold text-base md:text-xl leading-snug mb-2">
              {seoTitle}
            </h1>
            <p className="text-muted font-medium text-xs md:text-sm leading-relaxed mb-4">
              {seoDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-border/60 text-xs">
              <div>
                <span className="font-bold text-navy block mb-0.5">🎯 परीक्षा कव्हरेज:</span>
                <span className="text-muted">MPSC राज्यसेवा, तलाठी, पोलीस भरती, RRB, SSC GD</span>
              </div>
              <div>
                <span className="font-bold text-navy block mb-0.5">📅 अपडेट वारंवारता:</span>
                <span className="text-muted">दैनिक ताज्या घडामोडी व सराव टेस्ट</span>
              </div>
              <div>
                <span className="font-bold text-navy block mb-0.5">🌐 भाषा व माध्यम:</span>
                <span className="text-muted">100% शुद्ध मराठी विश्लेषण व मासिक सराव संच</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-gold pt-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-muted font-medium text-[13px]">
            © 2026 चालू घडामोडी. सर्व हक्क राखीव.
          </p>
          <p className="text-muted/60 font-medium text-[12px]">
            एक चालू घडामोडी उपक्रम • सराव चाचण्या व मोफत अभ्यास मंच
          </p>
        </div>
      </div>
    </footer>
  );
}
