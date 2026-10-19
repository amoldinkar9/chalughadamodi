import { MessageCircle } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { label: "मुख्यपान", href: "/#hero" },
  { label: "ताज्या घडामोडी", href: "/#daily-updates" },
  { label: "मासिके", href: "/#magazine" },
  { label: "टेस्ट", href: "/#tests" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
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

export default function Footer() {
  return (
    <footer id="footer" className="bg-cream pt-16 pb-6">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Col 1 */}
          <div>
            <p className="text-navy font-bold text-xl mb-2">चालू घडामोडी</p>
            <p className="text-muted font-medium text-sm leading-relaxed">
              मराठी विद्यार्थ्यांचा विश्वासार्ह चालू घडामोडी स्रोत
            </p>
          </div>
          {/* Col 2 */}
          <div>
            <p className="text-navy font-bold text-base mb-4">उपयुक्त links</p>
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
          {/* Col 3 */}
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
          {/* Col 4 */}
          <div>
            <p className="text-navy font-bold text-base mb-4">आमच्याशी जोडले रहा</p>
            <div className="flex items-center gap-4">
              {socialIcons.map(({ icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy hover:text-gold transition-colors duration-200"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="border-t border-gold pt-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-muted font-medium text-[13px]">
            © 2026 चालू घडामोडी. सर्व हक्क राखीव.
          </p>
          <p className="text-muted/60 font-medium text-[12px]">
            एक चालू घडामोडी उपक्रम
          </p>
        </div>
      </div>
    </footer>
  );
}
