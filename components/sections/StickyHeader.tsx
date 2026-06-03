"use client";
import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "Current Affairs Magazine", href: "/#magazine" },
  { label: "Tests", href: "/#tests" },
  { label: "Contact", href: "/#faq" },
];

export default function StickyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

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

  // Read login state and parse URL query parameters
  useEffect(() => {
    const getCookie = (name: string) => {
      if (typeof document === "undefined") return "";
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || "");
      return "";
    };

    const storedUser = getCookie("tcs9_username") || localStorage.getItem("tcs9_username") || "";
    if (storedUser) {
      setUsername(storedUser);
    }

    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("username") || params.get("name");
    if (nameParam) {
      document.cookie = `tcs9_username=${encodeURIComponent(nameParam)}; path=/; max-age=31536000; SameSite=Lax; Secure`;
      localStorage.setItem("tcs9_username", nameParam);
      setUsername(nameParam);

      // Clean query parameters from URL
      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const handleLoginClick = () => {
    const getCookie = (name: string) => {
      if (typeof document === "undefined") return "";
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift() || "";
      return "";
    };

    const hasSignedUp = getCookie("tcs9_has_signed_up") || localStorage.getItem("tcs9_has_signed_up");
    const targetUrl = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" 
      ? window.location.origin 
      : "https://chalughadamodi.in";
    const redirectParam = encodeURIComponent(targetUrl);

    const loginUrl = hasSignedUp
      ? `https://www.tcs9.in/mr/login?redirect=${redirectParam}`
      : `https://www.tcs9.in/mr/sign-up?redirect=${redirectParam}`;

    if (!hasSignedUp) {
      document.cookie = "tcs9_has_signed_up=true; path=/; max-age=31536000; SameSite=Lax; Secure";
      localStorage.setItem("tcs9_has_signed_up", "true");
    }

    // Direct browser redirect (no popups, no iframes)
    window.location.href = loginUrl;
  };

  const handleLogout = () => {
    document.cookie = "tcs9_username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("tcs9_username");
    setUsername("");
  };

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
          <Link
            href="/#hero"
            className="text-navy font-bold text-[22px] md:text-[26px] leading-tight"
          >
            चालू घडामोडी
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="मुख्य नेव्हिगेशन">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-navy font-medium text-[15px] font-english"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/#tests"
              className="btn-primary px-4 py-2 rounded-md font-semibold text-sm font-english"
              aria-label="Start Test — मोफत टेस्ट सुरू करा"
            >
              Start Test
            </Link>

            {/* Login / Profile Button */}
            {username ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-navy font-semibold text-sm bg-gold/10 border border-gold/30 px-3 py-2 rounded-md flex items-center gap-1.5 max-w-[150px] truncate" title={username}>
                  <User size={14} className="text-gold" />
                  <span className="truncate">{username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-muted hover:text-urgent font-medium underline cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="hidden md:block btn-outline px-4 py-2 rounded-md font-semibold text-sm font-english cursor-pointer"
              >
                Login
              </button>
            )}

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
        inert={!menuOpen ? true : undefined}
      >
        <button
          className="absolute top-5 right-6 p-2 text-navy"
          onClick={() => setMenuOpen(false)}
          aria-label="मेनू बंद करा"
          tabIndex={menuOpen ? 0 : -1}
        >
          <X size={28} />
        </button>
        <nav className="flex flex-col items-left gap-8" aria-label="मोबाईल नेव्हिगेशन">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-navy font-semibold text-2xl font-english"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#tests"
            className="btn-primary px-8 py-3 rounded-md font-semibold text-lg mt-4 font-english text-center"
            tabIndex={menuOpen ? 0 : -1}
            aria-label="Start Test — मोफत टेस्ट सुरू करा"
            onClick={() => setMenuOpen(false)}
          >
            Start Test
          </Link>

          {/* Mobile Login / Profile */}
          {username ? (
            <div className="flex flex-col gap-2 mt-4" tabIndex={menuOpen ? 0 : -1}>
              <span className="text-navy font-semibold text-xl bg-gold/10 border border-gold/30 px-4 py-3 rounded-md flex items-center gap-2 max-w-[280px] truncate" title={username}>
                <User size={18} className="text-gold" />
                <span className="truncate">{username}</span>
              </span>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="text-left text-sm text-urgent font-semibold underline px-2 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { handleLoginClick(); setMenuOpen(false); }}
              className="btn-outline px-8 py-3 rounded-md font-semibold text-lg mt-4 font-english text-center cursor-pointer"
              tabIndex={menuOpen ? 0 : -1}
            >
              Login
            </button>
          )}
        </nav>
      </div>


    </>
  );
}
