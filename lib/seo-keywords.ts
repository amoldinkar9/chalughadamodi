// This file contains all high-value canonical SEO keywords for landing pages and search engine indexing.
// Near-duplicate queries, doorway pages, and expired year variants have been consolidated with 301 redirects in next.config.ts.

export interface SeoKeyword {
  slug: string;
  title: string;
  lastmod?: string;
}

export const SEO_KEYWORDS: SeoKeyword[] = [
  // ── Core Current Affairs 2026 & Daily Hubs ──────────────────────────────
  { slug: "chalu-ghadamodi-2026", title: "चालू घडामोडी 2026", lastmod: "2026-10-19" },
  { slug: "chalu-ghadamodi-2026-pdf", title: "चालू घडामोडी 2026 PDF", lastmod: "2026-10-19" },
  { slug: "chalu-ghadamodi-2026-prashn-uttar", title: "चालू घडामोडी 2026 प्रश्न उत्तर मराठी", lastmod: "2026-10-18" },
  { slug: "today-current-affairs-in-marathi", title: "आजच्या चालू घडामोडी", lastmod: "2026-10-19" },
  { slug: "chalu-ghadamodi-general-knowledge-2026", title: "चालू घडामोडी जनरल नॉलेज 2026", lastmod: "2026-10-15" },
  { slug: "chalu-ghadamodi-maharashtra-2026", title: "महाराष्ट्र चालू घडामोडी 2026", lastmod: "2026-10-18" },
  { slug: "dinvishesh", title: "दिनविशेष व चालू घडामोडी", lastmod: "2026-10-19" },
  { slug: "jagtik-ghadamodi", title: "जागतिक चालू घडामोडी", lastmod: "2026-10-15" },
  { slug: "gk-today-marathi-pdf", title: "GK Today मराठी PDF", lastmod: "2026-10-14" },

  // ── MPSC Core & Rajyaseva ────────────────────────────────────────────────
  { slug: "mpsc-chalu-ghadamodi", title: "MPSC चालू घडामोडी 2026", lastmod: "2026-10-19" },
  { slug: "mpsc-chalu-ghadamodi-pdf", title: "MPSC चालू घडामोडी PDF", lastmod: "2026-10-17" },
  { slug: "mpsc-rajyaseva", title: "MPSC राज्यसेवा चालू घडामोडी", lastmod: "2026-10-16" },
  { slug: "mpsc-rajyaseva-2026", title: "MPSC राज्यसेवा 2026", lastmod: "2026-10-16" },
  { slug: "combine-pariksha", title: "MPSC कंबाईन परीक्षा चालू घडामोडी", lastmod: "2026-10-15" },
  { slug: "chalu-ghadamodi-for-combine", title: "Combine साठी चालू घडामोडी", lastmod: "2026-10-15" },
  { slug: "mpsc-syllabus-2026", title: "MPSC Syllabus 2026 Marathi", lastmod: "2026-09-20" },
  { slug: "mpsc-rajyaseva-syllabus", title: "MPSC राज्यसेवा Syllabus", lastmod: "2026-09-20" },
  { slug: "mpsc-combine-syllabus-in-marathi", title: "MPSC Combine Syllabus in Marathi", lastmod: "2026-09-20" },
  { slug: "mpsc-psi-syllabus-in-marathi", title: "MPSC PSI Syllabus Marathi", lastmod: "2026-09-20" },
  { slug: "mpsc-sti-syllabus-in-marathi", title: "MPSC STI Syllabus Marathi", lastmod: "2026-09-20" },
  { slug: "mpsc-aso-syllabus-in-marathi", title: "MPSC ASO Syllabus Marathi", lastmod: "2026-09-20" },
  { slug: "mpsc-previous-year-question-paper", title: "MPSC Previous Year Question Paper", lastmod: "2026-09-15" },
  { slug: "mpsc-mock-test-free", title: "MPSC Mock Test Free", lastmod: "2026-10-10" },

  // ── Talathi Bharti & TCS Pattern ─────────────────────────────────────────
  { slug: "talathi-chalu-ghadamodi", title: "तलाठी भरती चालू घडामोडी 2026", lastmod: "2026-10-19" },
  { slug: "talathi-syllabus", title: "तलाठी भरती Syllabus", lastmod: "2026-09-20" },
  { slug: "talathi-cutoff", title: "तलाठी भरती Cutoff", lastmod: "2026-09-20" },
  { slug: "tcs-talathi", title: "TCS पॅटर्न तलाठी भरती", lastmod: "2026-10-12" },
  { slug: "tcs-pattern", title: "TCS पॅटर्न चालू घडामोडी", lastmod: "2026-10-12" },
  { slug: "tcs-mock-test", title: "TCS पॅटर्न सराव टेस्ट", lastmod: "2026-10-12" },
  { slug: "talathi-bharti-previous-year-question-paper", title: "तलाठी भरती मागील प्रश्नपत्रिका", lastmod: "2026-09-15" },

  // ── Police Bharti & Physical ─────────────────────────────────────────────
  { slug: "police-bharti-chalu-ghadamodi", title: "पोलीस भरती चालू घडामोडी 2026", lastmod: "2026-10-19" },
  { slug: "police-bharti-syllabus", title: "पोलीस भरती Syllabus", lastmod: "2026-09-20" },
  { slug: "police-bharti-prashnasanch", title: "पोलीस भरती प्रश्नसंच", lastmod: "2026-10-14" },
  { slug: "police-bharti-question-paper", title: "पोलीस भरती प्रश्नपत्रिका", lastmod: "2026-09-15" },
  { slug: "1600-meter-police-bharti-time", title: "1600 Meter Police Bharti Time", lastmod: "2026-09-10" },
  { slug: "police-bharti-ground-marks", title: "पोलीस भरती ग्राउंड मार्क्स", lastmod: "2026-09-10" },

  // ── Railway, SSC, Vanrakshak, Saralseva & Other Exams ────────────────────
  { slug: "railway-bharti-marathi", title: "रेल्वे भरती मराठी चालू घडामोडी", lastmod: "2026-10-16" },
  { slug: "rrb-group-d-chalu-ghadamodi", title: "RRB Group D चालू घडामोडी", lastmod: "2026-10-16" },
  { slug: "rrb-group-d-syllabus", title: "RRB Group D Syllabus Marathi", lastmod: "2026-09-20" },
  { slug: "ssc-gd-chalu-ghadamodi-marathi", title: "SSC GD चालू घडामोडी", lastmod: "2026-10-15" },
  { slug: "ssc-gd-question-papers", title: "SSC GD प्रश्नपत्रिका", lastmod: "2026-09-15" },
  { slug: "vanrakshak-bharti-chalu-ghadamodi", title: "वनरक्षक भरती चालू घडामोडी", lastmod: "2026-10-15" },
  { slug: "saralseva-exam", title: "सरळसेवा भरती चालू घडामोडी", lastmod: "2026-10-15" },
  { slug: "zilha-parishad-bharti", title: "जिल्हा परिषद भरती चालू घडामोडी", lastmod: "2026-10-14" },
  { slug: "gram-sevak-bharti-2026-online-form-date", title: "ग्रामसेवक भरती 2026", lastmod: "2026-10-10" },
  { slug: "gram-sevak-syllabus-2026-pdf", title: "ग्रामसेवक Syllabus 2026 PDF", lastmod: "2026-09-20" },
  { slug: "arogya-vibhag-bharti-syllabus-pdf", title: "आरोग्य विभाग भरती Syllabus PDF", lastmod: "2026-09-20" },
  { slug: "agniveer-bharti-chalu-ghadamodi", title: "अग्निवीर चालू घडामोडी", lastmod: "2026-10-10" },
  { slug: "anganwadi-bharti-online-form", title: "अंगणवाडी भरती Online Form", lastmod: "2026-10-05" },
  { slug: "krushi-sevak-bharti-online-form", title: "कृषी सेवक भरती Online Form", lastmod: "2026-10-05" },
];
