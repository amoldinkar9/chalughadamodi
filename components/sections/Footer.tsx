import { Send, MessageCircle } from "lucide-react";

const footerLinks = [
  { label: "मुख्यपान", href: "#hero" },
  { label: "मासिके", href: "#magazine" },
  { label: "टेस्ट", href: "#tests" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#faq" },
  { label: "Privacy Policy", href: "#" },
];

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

type SocialItem = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

const socialIcons: SocialItem[] = [
  { icon: <InstagramIcon />, href: "#", label: "Instagram" },
  { icon: <FacebookIcon />, href: "#", label: "Facebook" },
  { icon: <Send size={20} />, href: "#", label: "Telegram" },
  { icon: <MessageCircle size={20} />, href: "https://wa.me/919579616908", label: "WhatsApp" },
  { icon: <YoutubeIcon />, href: "#", label: "Youtube" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-cream pt-16 pb-6">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">
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
                  <a href={link.href} className="text-muted font-medium text-sm hover:text-gold transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Col 3 */}
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
