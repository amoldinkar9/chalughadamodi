"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, User, BookOpen } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "Current Affairs Magazine", href: "/#magazine" },
  { label: "Tests", href: "/#tests" },
  { label: "Contact", href: "/#faq" },
];

// ── cookie helpers ───────────────────────────────────────────────────────────
function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  return "";
}
function setCookie(name: string, val: string, maxAge = 31536000) {
  document.cookie = `${name}=${encodeURIComponent(val)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}
// ────────────────────────────────────────────────────────────────────────────

export default function StickyHeader() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [username, setUsername]       = useState("");
  const [modalOpen, setModalOpen]     = useState(false);
  const [loginSrc, setLoginSrc]       = useState("");
  const iframeRef                     = useRef<HTMLIFrameElement>(null);

  // ── scroll shadow ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── scroll lock while modal / menu is open ────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen || modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, modalOpen]);

  // ── restore username from cookie / localStorage on mount ─────────────────
  useEffect(() => {
    // username returned as query param after tcs9 redirect
    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("username") || params.get("name");
    if (nameParam) {
      setCookie("tcs9_username", nameParam);
      localStorage.setItem("tcs9_username", nameParam);
      setUsername(nameParam);
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      return;
    }
    const stored = getCookie("tcs9_username") || localStorage.getItem("tcs9_username") || "";
    if (stored) setUsername(stored);
  }, []);

  // ── Escape key closes modal ────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  // ── build tcs9 login URL ───────────────────────────────────────────────────
  const buildLoginUrl = useCallback(() => {
    const hasSignedUp = getCookie("tcs9_has_signed_up") || localStorage.getItem("tcs9_has_signed_up");
    const redirectParam = encodeURIComponent(window.location.origin);
    const url = hasSignedUp
      ? `https://www.tcs9.in/mr/login?redirect=${redirectParam}`
      : `https://www.tcs9.in/mr/sign-up?redirect=${redirectParam}`;
    if (!hasSignedUp) {
      setCookie("tcs9_has_signed_up", "true");
      localStorage.setItem("tcs9_has_signed_up", "true");
    }
    return url;
  }, []);

  // ── open modal ─────────────────────────────────────────────────────────────
  const openModal = () => {
    setLoginSrc(buildLoginUrl());
    setModalOpen(true);
    setMenuOpen(false);
  };

  // ── close modal ────────────────────────────────────────────────────────────
  const closeModal = () => {
    setModalOpen(false);
    setLoginSrc("");
  };

  // ── iframe load handler: detect when tcs9 redirects back to our domain ─────
  const handleIframeLoad = () => {
    if (!iframeRef.current) return;
    try {
      // This will succeed only when the iframe is on the SAME origin (our domain)
      const iframeUrl = iframeRef.current.contentWindow?.location.href || "";
      const iframeParams = new URLSearchParams(
        iframeRef.current.contentWindow?.location.search || ""
      );
      const nameParam = iframeParams.get("username") || iframeParams.get("name");

      if (nameParam) {
        setCookie("tcs9_username", nameParam);
        localStorage.setItem("tcs9_username", nameParam);
        setUsername(nameParam);
        closeModal();
        return;
      }

      // If iframe landed on our origin but no name param, check if profile was fetched
      if (iframeUrl.startsWith(window.location.origin) && iframeUrl !== window.location.origin + "/") {
        const stored = getCookie("tcs9_username") || localStorage.getItem("tcs9_username") || "";
        if (stored) { setUsername(stored); closeModal(); }
      }
    } catch {
      // still cross-origin (tcs9.in) — normal, do nothing
    }
  };

  // ── logout ─────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    document.cookie = "tcs9_username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("tcs9_username");
    setUsername("");
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Header bar ────────────────────────────────────────────────────── */}
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-surface shadow-sm border-b border-transparent" : "bg-cream border-b border-border"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/#hero" className="text-navy font-bold text-[22px] md:text-[26px] leading-tight">
            चालू घडामोडी
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="मुख्य नेव्हिगेशन">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-navy font-medium text-[15px] font-english">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/#tests"
              className="btn-primary px-4 py-2 rounded-md font-semibold text-sm font-english"
              aria-label="Start Test — मोफत टेस्ट सुरू करा"
            >
              Start Test
            </Link>

            {username ? (
              <div className="hidden md:flex items-center gap-2">
                <span
                  className="text-navy font-semibold text-sm bg-gold/10 border border-gold/30 px-3 py-2 rounded-md flex items-center gap-1.5 max-w-[150px] truncate"
                  title={username}
                >
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
                onClick={openModal}
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

      {/* ── Mobile Menu ────────────────────────────────────────────────────── */}
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

          {username ? (
            <div className="flex flex-col gap-2 mt-4" tabIndex={menuOpen ? 0 : -1}>
              <span
                className="text-navy font-semibold text-xl bg-gold/10 border border-gold/30 px-4 py-3 rounded-md flex items-center gap-2 max-w-[280px] truncate"
                title={username}
              >
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
              onClick={openModal}
              className="btn-outline px-8 py-3 rounded-md font-semibold text-lg mt-4 font-english text-center cursor-pointer"
              tabIndex={menuOpen ? 0 : -1}
            >
              Login
            </button>
          )}
        </nav>
      </div>

      {/* ── Login Modal Dialog ─────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TCS9 Login"
          className="fixed inset-0 z-50 flex flex-col"
          style={{ animation: "cgModalFadeIn 0.2s ease" }}
        >
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-navy/60 backdrop-blur-md"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal container — centered, responsive */}
          <div
            className="relative m-auto w-full max-w-2xl flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-border"
            style={{
              height: "min(88vh, 780px)",
              animation: "cgModalSlideUp 0.28s cubic-bezier(0.34,1.5,0.64,1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Modal header bar ── */}
            <div className="flex items-center justify-between px-5 py-3 bg-navy shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                  <BookOpen size={16} className="text-gold" />
                </div>
                <span className="text-white font-bold text-base leading-tight font-english tracking-wide">
                  चालू घडामोडी &mdash; Login
                </span>
              </div>

              {/* Traffic-light style dots + close */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-white/20" />
                <span className="w-3 h-3 rounded-full bg-white/20" />
                <button
                  onClick={closeModal}
                  aria-label="बंद करा"
                  className="w-7 h-7 rounded-full bg-urgent/80 hover:bg-urgent flex items-center justify-center transition-colors cursor-pointer ml-1"
                >
                  <X size={13} className="text-white" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* ── Gold accent line ── */}
            <div className="h-0.5 w-full bg-gradient-to-r from-navy via-gold to-navy shrink-0" />

            {/* ── iframe fills remaining space ── */}
            <div className="flex-1 bg-white relative overflow-hidden">
              {/* Loading shimmer shown behind iframe */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cream">
                <div className="w-10 h-10 rounded-full border-4 border-gold/30 border-t-gold animate-spin" />
                <p className="text-navy text-sm font-english">Loading tcs9.in…</p>
              </div>

              {loginSrc && (
                <iframe
                  ref={iframeRef}
                  src={loginSrc}
                  onLoad={handleIframeLoad}
                  title="TCS9 Login"
                  className="absolute inset-0 w-full h-full border-0 bg-white"
                  allow="forms"
                  sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
                />
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cgModalFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cgModalSlideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </>
  );
}
