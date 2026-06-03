"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/#hero" },
  { label: "Current Affairs Magazine", href: "/#magazine" },
  { label: "Tests", href: "/#tests" },
  { label: "Contact", href: "/#faq" },
];

// ── cookie helpers ────────────────────────────────────────────────────────────
function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  return "";
}
function setCookie(name: string, val: string, maxAge = 31536000) {
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(val)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}
// ─────────────────────────────────────────────────────────────────────────────

// Try to fetch the user's name directly from tcs9.in/mr/profile.
// The browser already holds the tcs9.in session cookie, so fetching with
// credentials:include may return the authenticated profile page.
async function fetchTcs9Name(): Promise<string> {
  try {
    const res = await fetch("https://www.tcs9.in/mr/profile", {
      credentials: "include",
      mode: "cors",
      headers: { Accept: "text/html" },
    });
    if (!res.ok) return "";
    const html = await res.text();

    // Try several common patterns a profile page might use for the name
    const patterns: RegExp[] = [
      // JSON in page: "name":"Amol"
      /"(?:name|fullName|full_name|userName|username|displayName)"\s*:\s*"([^"]{2,60})"/i,
      // <meta name="author" content="Amol">
      /<meta[^>]+name=["'](?:author|user)[^>]+content=["']([^"']{2,60})["']/i,
      // data-username="Amol" or data-name="Amol"
      /data-(?:name|username|user)=["']([^"']{2,60})["']/i,
      // class containing "name" with inner text
      /class="[^"]*\bname\b[^"]*"[^>]*>([^<]{2,60})</i,
      // <title>Amol | TCS9</title>  (take the first segment before | or –)
      /<title>([^<|–-]{2,60})[\s|–-]/i,
    ];

    for (const pattern of patterns) {
      const m = html.match(pattern);
      if (m?.[1]) {
        const name = m[1].trim();
        // Basic sanity: not a URL, not pure digits, not an HTML tag remnant
        if (name && !/https?:|^\d+$|[<>{}]/.test(name)) return name;
      }
    }
  } catch {
    // CORS blocked or network error — silent fallback
  }
  return "";
}

// ─────────────────────────────────────────────────────────────────────────────

export default function StickyHeader() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [username, setUsername]   = useState("");   // actual name when known
  const [loggedIn, setLoggedIn]   = useState(false); // true as soon as modal closes after login
  const [modalOpen, setModalOpen] = useState(false);
  const [loginSrc, setLoginSrc]   = useState("");

  const iframeRef       = useRef<HTMLIFrameElement>(null);
  const hasLoadedOnce   = useRef(false);
  const profileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalOpenRef    = useRef(false);

  useEffect(() => { modalOpenRef.current = modalOpen; }, [modalOpen]);

  // ── scroll shadow ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── scroll lock ───────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen || modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, modalOpen]);

  // ── restore session on mount ──────────────────────────────────────────────
  useEffect(() => {
    // 1. username in URL (tcs9 redirect with ?username=)
    const params    = new URLSearchParams(window.location.search);
    const nameParam = params.get("username") || params.get("name");
    if (nameParam) {
      setCookie("tcs9_username", nameParam);
      localStorage.setItem("tcs9_username", nameParam);
      setUsername(nameParam);
      setLoggedIn(true);
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      return;
    }

    // 2. Stored in cookie / localStorage
    const fromCookie = getCookie("tcs9_username");
    const fromLS     = localStorage.getItem("tcs9_username") || "";
    const stored     = fromCookie || fromLS;
    if (stored) {
      if (!fromCookie) setCookie("tcs9_username", stored);
      if (!fromLS)     localStorage.setItem("tcs9_username", stored);
      setUsername(stored);
      setLoggedIn(true);
      return;
    }

    // 3. loggedIn flag only (name was never captured)
    const wasLoggedIn = getCookie("tcs9_logged_in") || localStorage.getItem("tcs9_logged_in");
    if (wasLoggedIn) {
      setLoggedIn(true);
      // Try to fetch the name in the background
      fetchTcs9Name().then((name) => {
        if (name) {
          setCookie("tcs9_username", name);
          localStorage.setItem("tcs9_username", name);
          setUsername(name);
        }
      });
    }
  }, []);

  // ── storage event: catches username written by the iframe ─────────────────
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "tcs9_username" && e.newValue) {
        const name = decodeURIComponent(e.newValue);
        setCookie("tcs9_username", name);
        setUsername(name);
        setLoggedIn(true);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // ── Escape key ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && modalOpen) closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  // ── cleanup timer ─────────────────────────────────────────────────────────
  useEffect(() => () => { if (profileTimerRef.current) clearTimeout(profileTimerRef.current); }, []);

  // ── build login URL ───────────────────────────────────────────────────────
  const buildLoginUrl = useCallback(() => {
    const hasSignedUp   = getCookie("tcs9_has_signed_up") || localStorage.getItem("tcs9_has_signed_up");
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

  // ── open modal ────────────────────────────────────────────────────────────
  const openModal = () => {
    hasLoadedOnce.current = false;
    if (profileTimerRef.current) { clearTimeout(profileTimerRef.current); profileTimerRef.current = null; }
    setLoginSrc(buildLoginUrl());
    setModalOpen(true);
    setMenuOpen(false);
  };

  // ── close modal + mark logged in ─────────────────────────────────────────
  const closeModal = useCallback((afterLogin = false) => {
    if (profileTimerRef.current) { clearTimeout(profileTimerRef.current); profileTimerRef.current = null; }
    setModalOpen(false);
    setLoginSrc("");

    if (!afterLogin) return;

    // Mark as logged in regardless of whether we have the name
    setLoggedIn(true);
    setCookie("tcs9_logged_in", "true");
    localStorage.setItem("tcs9_logged_in", "true");

    // Check if name already arrived in storage
    const stored = getCookie("tcs9_username") || localStorage.getItem("tcs9_username") || "";
    if (stored) {
      setUsername(stored);
      return;
    }

    // Try to fetch name from tcs9 profile page
    fetchTcs9Name().then((name) => {
      if (name) {
        setCookie("tcs9_username", name);
        localStorage.setItem("tcs9_username", name);
        setUsername(name);
      }
    });
  }, []);

  // ── iframe load handler ───────────────────────────────────────────────────
  const handleIframeLoad = useCallback(() => {
    if (!iframeRef.current) return;
    try {
      // ── SAME-ORIGIN: tcs9 redirected iframe back to our domain ───────────
      const iframeUrl    = iframeRef.current.contentWindow?.location.href || "";
      const iframeParams = new URLSearchParams(iframeRef.current.contentWindow?.location.search || "");
      const nameParam    = iframeParams.get("username") || iframeParams.get("name");

      if (nameParam) {
        if (profileTimerRef.current) { clearTimeout(profileTimerRef.current); profileTimerRef.current = null; }
        setCookie("tcs9_username", nameParam);
        localStorage.setItem("tcs9_username", nameParam);
        setUsername(nameParam);
        closeModal(true);
        return;
      }

      if (iframeUrl.startsWith(window.location.origin)) {
        if (profileTimerRef.current) { clearTimeout(profileTimerRef.current); profileTimerRef.current = null; }
        closeModal(true);
      }
    } catch {
      // ── CROSS-ORIGIN: still on tcs9.in ──────────────────────────────────
      if (!hasLoadedOnce.current) {
        // 1st load = login page rendered — mark and wait
        hasLoadedOnce.current = true;
      } else {
        // 2nd+ load = profile page after login
        // Wait 3 s for possible redirect back to our domain, then close
        if (profileTimerRef.current) clearTimeout(profileTimerRef.current);
        profileTimerRef.current = setTimeout(() => {
          if (modalOpenRef.current) closeModal(true);
        }, 3000);
      }
    }
  }, [closeModal]);

  // ─────────────────────────────────────────────────────────────────────────
  // Display helpers
  const displayName = username || (loggedIn ? "Logged In ✓" : "");

  return (
    <>
      {/* ── Header bar ──────────────────────────────────────────────────── */}
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-surface shadow-sm border-b border-transparent" : "bg-cream border-b border-border"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-[72px]">
          <Link href="/#hero" className="text-navy font-bold text-[22px] md:text-[26px] leading-tight">
            चालू घडामोडी
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="मुख्य नेव्हिगेशन">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-navy font-medium text-[15px] font-english">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#tests"
              className="btn-primary px-4 py-2 rounded-md font-semibold text-sm font-english"
              aria-label="Start Test — मोफत टेस्ट सुरू करा"
            >
              Start Test
            </Link>

            {displayName ? (
              <span
                className="hidden md:flex text-navy font-semibold text-sm bg-gold/10 border border-gold/30 px-3 py-2 rounded-md items-center gap-1.5 max-w-[160px] truncate"
                title={displayName}
              >
                <User size={14} className="text-gold shrink-0" />
                <span className="truncate">{displayName}</span>
              </span>
            ) : (
              <button
                onClick={openModal}
                className="hidden md:block btn-outline px-4 py-2 rounded-md font-semibold text-sm font-english cursor-pointer"
              >
                Login
              </button>
            )}

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

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      <div
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <button className="absolute top-5 right-6 p-2 text-navy" onClick={() => setMenuOpen(false)} aria-label="मेनू बंद करा" tabIndex={menuOpen ? 0 : -1}>
          <X size={28} />
        </button>
        <nav className="flex flex-col items-left gap-8" aria-label="मोबाईल नेव्हिगेशन">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-navy font-semibold text-2xl font-english" onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>
              {link.label}
            </Link>
          ))}
          <Link href="/#tests" className="btn-primary px-8 py-3 rounded-md font-semibold text-lg mt-4 font-english text-center" tabIndex={menuOpen ? 0 : -1} aria-label="Start Test" onClick={() => setMenuOpen(false)}>
            Start Test
          </Link>

          {displayName ? (
            <span className="text-navy font-semibold text-xl bg-gold/10 border border-gold/30 px-4 py-3 rounded-md flex items-center gap-2 max-w-[280px] truncate mt-4" title={displayName}>
              <User size={18} className="text-gold shrink-0" />
              <span className="truncate">{displayName}</span>
            </span>
          ) : (
            <button onClick={openModal} className="btn-outline px-8 py-3 rounded-md font-semibold text-lg mt-4 font-english text-center cursor-pointer" tabIndex={menuOpen ? 0 : -1}>
              Login
            </button>
          )}
        </nav>
      </div>

      {/* ── Login Modal — full-screen ────────────────────────────────────── */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="TCS9 Login"
          className="fixed inset-0 z-50 bg-white"
          style={{ animation: "cgModalFadeIn 0.18s ease" }}
        >
          {/* Loading shimmer shown while iframe initialises */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cream pointer-events-none">
            <div className="w-10 h-10 rounded-full border-4 border-gold/30 border-t-gold animate-spin" />
            <p className="text-navy text-sm font-english">Loading…</p>
          </div>

          {/* Full-screen iframe */}
          {loginSrc && (
            <iframe
              ref={iframeRef}
              src={loginSrc}
              onLoad={handleIframeLoad}
              title="TCS9 Login"
              className="absolute inset-0 w-full h-full border-0"
              allow="forms"
              sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation"
            />
          )}

          {/* Floating close button — top-right corner */}
          <button
            onClick={() => closeModal(false)}
            aria-label="बंद करा"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-navy/80 hover:bg-navy flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          >
            <X size={18} className="text-white" strokeWidth={2.5} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes cgModalFadeIn { from { opacity:0 } to { opacity:1 } }
      `}</style>
    </>
  );
}
