"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Current Affairs Magazine", href: "#magazine" },
  { label: "Tests", href: "#tests" },
  { label: "Contact", href: "#faq" },
];

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
          ? "bg-surface shadow-sm border-b border-transparent"
          : "bg-cream border-b border-border"
          }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <a
            href="#hero"
            className="text-navy font-bold text-[22px] md:text-[26px] leading-tight"
          >
            चालू घडामोडी
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="मुख्य नेव्हिगेशन">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-navy font-medium text-[15px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.tcs9.in/mr/test-series"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-4 py-2 rounded-md font-semibold text-sm"
            >
              Start Test
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 text-navy"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "मेनू बंद करा" : "मेनू उघडा"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          className="absolute top-5 right-6 p-2 text-navy"
          onClick={() => setMenuOpen(false)}
          aria-label="मेनू बंद करा"
        >
          <X size={28} />
        </button>
        <nav className="flex flex-col items-left gap-8" aria-label="मोबाईल नेव्हिगेशन">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-navy font-semibold text-2xl"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.tcs9.in/mr/test-series"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-8 py-3 rounded-md font-semibold text-lg mt-4"
          >
            Start Test
          </a>
        </nav>
      </div>
    </>
  );
}
