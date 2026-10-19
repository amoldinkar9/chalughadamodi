import StickyHeader from "@/components/sections/StickyHeader";
import Hero from "@/components/sections/Hero";
import DailyUpdates from "@/components/sections/DailyUpdates";
import Announcements from "@/components/sections/Announcements";
import Magazine from "@/components/sections/Magazine";
import StaticGS from "@/components/sections/StaticGS";
import Tests from "@/components/sections/Tests";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import { getDb, mapRows } from "@/lib/db";
import type { PublicContent } from "@/lib/types";
import { SectionService } from "@/lib/services/content.service";

// Fallback data in case D1 is not configured yet
const fallbackContent: PublicContent = {
  announcements: [
    { id: "a1", title: "MPSC राज्यसेवा 2026 अधिसूचना", image_url: "", backlink: "/mpsc-chalu-ghadamodi", published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "a2", title: "तलाठी भरती व TCS पॅटर्न चालू घडामोडी", image_url: "", backlink: "/talathi-chalu-ghadamodi", published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "a3", title: "मोफत मासिक चालू घडामोडी PDF डाउनलोड करा", image_url: "", backlink: "/chalu-ghadamodi-2026-pdf", published: true, display_order: 3, created_at: "", updated_at: "" },
  ],
  gallery: [
    { id: "1", name: "महाराष्ट्र पोलीस भरती 2026", image_url: "", start_date: "2026-10-01", last_date: "2026-11-30", link: "/police-bharti-chalu-ghadamodi", apply_link: "https://policerecruitment2026.mahait.org", is_new: true, date_extended: false, published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "2", name: "तलाठी भरती 2026", image_url: "", start_date: "2026-10-10", last_date: "2026-12-15", link: "/talathi-chalu-ghadamodi", apply_link: "https://mahabhumi.gov.in", is_new: true, date_extended: false, published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "3", name: "रेल्वे RRB Group D भरती", image_url: "", start_date: "2026-10-05", last_date: "2026-12-01", link: "/railway-bharti-marathi", apply_link: "https://rrbcdg.gov.in", is_new: false, date_extended: false, published: true, display_order: 3, created_at: "", updated_at: "" },
    { id: "4", name: "SSC GD भरती 2026", image_url: "", start_date: "2026-09-15", last_date: "2026-11-20", link: "/ssc-gd-chalu-ghadamodi-marathi", apply_link: "https://ssc.gov.in", is_new: false, date_extended: true, published: true, display_order: 4, created_at: "", updated_at: "" },
    { id: "5", name: "वनरक्षक भरती 2026", image_url: "", start_date: "2026-10-12", last_date: "2026-12-25", link: "/vanrakshak-bharti-chalu-ghadamodi", apply_link: "https://mahaforest.gov.in", is_new: false, date_extended: false, published: true, display_order: 5, created_at: "", updated_at: "" },
    { id: "6", name: "सरळसेवा व जिल्हा परिषद भरती", image_url: "", start_date: "2026-10-15", last_date: "2026-12-31", link: "/zilha-parishad-bharti", apply_link: "https://rdd.maharashtra.gov.in", is_new: true, date_extended: false, published: true, display_order: 6, created_at: "", updated_at: "" },
  ],
  magazines: [
    { id: "1", month: "ऑक्टोबर 2026", image_url: "", pdf_url: "/chalu-ghadamodi-2026-pdf", published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "2", month: "सप्टेंबर 2026", image_url: "", pdf_url: "/chalu-ghadamodi-2026-pdf", published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "3", month: "ऑगस्ट 2026", image_url: "", pdf_url: "/chalu-ghadamodi-2026-pdf", published: true, display_order: 3, created_at: "", updated_at: "" },
    { id: "4", month: "जुलै 2026", image_url: "", pdf_url: "/chalu-ghadamodi-2026-pdf", published: true, display_order: 4, created_at: "", updated_at: "" },
    { id: "5", month: "जून 2026", image_url: "", pdf_url: "/chalu-ghadamodi-2026-pdf", published: true, display_order: 5, created_at: "", updated_at: "" },
    { id: "6", month: "मे 2026", image_url: "", pdf_url: "/chalu-ghadamodi-2026-pdf", published: true, display_order: 6, created_at: "", updated_at: "" },
  ],
  tests: [
    { id: "1", title: "आजची चालू घडामोडी टेस्ट", href: "https://www.tcs9.in/mr/test-series", image_url: "", description: "आजच्या ताज्या चालू घडामोडींवर आधारित 20 सराव प्रश्न. लगेच निकाल आणि विश्लेषण.", published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "2", title: "या आठवड्याची वीकली टेस्ट", href: "https://www.tcs9.in/mr/test-series", image_url: "", description: "संपूर्ण आठवड्याच्या घडामोडींवर आधारित 50 प्रश्नांची सराव परीक्षा.", published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "3", title: "मागील महिना रिव्हिजन टेस्ट", href: "https://www.tcs9.in/mr/test-series", image_url: "", description: "महिन्याच्या चालू घडामोडींवर आधारित विशेष मेगा टेस्ट.", published: true, display_order: 3, created_at: "", updated_at: "" },
  ],
  testimonials: [
    { id: "1", initials: "प्रि", name: "प्रिया देशमुख", exam: "तलाठी, 2025", quote: "Static GS शी प्रत्येक बातमीची जोडणी मला खूप आवडली. Revision सोपी झाली.", published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "2", initials: "सं", name: "संदीप पाटील", exam: "महाराष्ट्र पोलीस, 2025", quote: "मराठीत स्पष्टीकरण असल्यामुळे current affairs कधीच कठीण वाटले नाहीत.", published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "3", initials: "रो", name: "रोहित जाधव", exam: "रेल्वे RRB, 2025", quote: "मोफत मासिक PDF मुळे मला coaching ची गरज पडली नाही. प्रामाणिक platform.", published: true, display_order: 3, created_at: "", updated_at: "" },
  ],
  faqs: [
    { id: "1", question: "हे website मोफत आहे का?", answer: "होय, संपूर्णपणे मोफत. कुठलेही शुल्क नाही, login नाही.", published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "2", question: "मासिक PDF download करता येते का?", answer: "होय. प्रत्येक मासिकाच्या पानावर PDF download बटण आहे.", published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "3", question: "टेस्ट किती कठीण आहे?", answer: "MPSC, तलाठी, पोलीस भरती च्या प्रत्यक्ष परीक्षेसारखीच पातळी. सरावासाठी योग्य.", published: true, display_order: 3, created_at: "", updated_at: "" },
    { id: "4", question: "MPSC आणि तलाठी दोन्हीसाठी useful आहे का?", answer: "होय. आम्ही प्रत्येक चालू घडामोडी सर्व प्रमुख परीक्षांच्या syllabus नुसार tag करतो.", published: true, display_order: 4, created_at: "", updated_at: "" },
    { id: "5", question: "Content रोज update होते का?", answer: "होय. आठवड्यातील 6 दिवस ताज्या चालू घडामोडी. मासिक एकदा PDF स्वरूपात.", published: true, display_order: 5, created_at: "", updated_at: "" },
    { id: "6", question: "मराठीतच सर्व content आहे का?", answer: "होय. 100% मराठी. कठीण इंग्रजी संज्ञा असल्यास त्यांचा मराठीत अर्थ देखील दिला जातो.", published: true, display_order: 6, created_at: "", updated_at: "" },
    { id: "7", question: "अजून प्रश्न असतील तर?", answer: "खाली WhatsApp बटणावर click करा. आम्हाला थेट संपर्क करा.", published: true, display_order: 7, created_at: "", updated_at: "" },
  ],
};

async function getHeroImageUrls(): Promise<{ imageUrl: string; mobileImageUrl: string; imageLink: string; mobileImageLink: string }> {
  try {
    const db = await getDb();
    const rows = await db.prepare("SELECT key, value FROM site_settings WHERE key IN (?, ?, ?, ?)")
      .bind("hero_image_url", "hero_mobile_image_url", "hero_image_link", "hero_mobile_image_link")
      .all<{ key: string; value: string }>();
    
    const desktop = rows.results.find(r => r.key === "hero_image_url")?.value || "";
    const mobile = rows.results.find(r => r.key === "hero_mobile_image_url")?.value || "";
    const desktopLink = rows.results.find(r => r.key === "hero_image_link")?.value || "";
    const mobileLink = rows.results.find(r => r.key === "hero_mobile_image_link")?.value || "";
    return { imageUrl: desktop, mobileImageUrl: mobile, imageLink: desktopLink, mobileImageLink: mobileLink };
  } catch {
    return { imageUrl: "", mobileImageUrl: "", imageLink: "", mobileImageLink: "" };
  }
}

async function getContent(): Promise<PublicContent> {
  try {
    const db = await getDb();
    const [announcements, gallery, magazines, tests, testimonials, faqs] = await Promise.all([
      db.prepare("SELECT * FROM announcements WHERE published = 1 ORDER BY display_order").all(),
      db.prepare("SELECT * FROM gallery WHERE published = 1 ORDER BY display_order").all(),
      db.prepare("SELECT * FROM magazines WHERE published = 1 ORDER BY display_order").all(),
      db.prepare("SELECT * FROM tests WHERE published = 1 ORDER BY display_order").all(),
      db.prepare("SELECT * FROM testimonials WHERE published = 1 ORDER BY display_order").all(),
      db.prepare("SELECT * FROM faqs WHERE published = 1 ORDER BY display_order").all(),
    ]);

    return {
      announcements: announcements.results.length ? mapRows(announcements.results) : fallbackContent.announcements,
      gallery: gallery.results.length ? mapRows(gallery.results) : fallbackContent.gallery,
      magazines: magazines.results.length ? mapRows(magazines.results) : fallbackContent.magazines,
      tests: tests.results.length ? mapRows(tests.results) : fallbackContent.tests,
      testimonials: testimonials.results.length ? mapRows(testimonials.results) : fallbackContent.testimonials,
      faqs: faqs.results.length ? mapRows(faqs.results) : fallbackContent.faqs,
    };
  } catch {
    return fallbackContent;
  }
}

export const dynamic = "force-dynamic";

function getCategoryDetails(slug?: string) {
  if (!slug) return { category: "general", label: "चालू घडामोडी", keywords: [] };
  const s = slug.toLowerCase();
  if (s.includes("mpsc") || s.includes("rajyaseva") || s.includes("combine")) {
    return { category: "mpsc", label: "MPSC चालू घडामोडी", keywords: ["mpsc", "राज्यसेवा", "कंबाइन", "combine"] };
  }
  if (s.includes("talathi") || s.includes("tcs") || s.includes("ibps")) {
    return { category: "talathi", label: "तलाठी भरती चालू घडामोडी", keywords: ["तलाठी", "talathi", "tcs", "ibps"] };
  }
  if (s.includes("police")) {
    return { category: "police", label: "पोलीस भरती चालू घडामोडी", keywords: ["पोलीस", "police", "constable", "शिपाई"] };
  }
  if (s.includes("railway") || s.includes("rrb")) {
    return { category: "railway", label: "रेल्वे भरती चालू घडामोडी", keywords: ["रेल्वे", "railway", "rrb", "group d"] };
  }
  if (s.includes("ssc")) {
    return { category: "ssc", label: "SSC GD चालू घडामोडी", keywords: ["ssc", "gd"] };
  }
  if (s.includes("vanrakshak")) {
    return { category: "vanrakshak", label: "वनरक्षक भरती चालू घडामोडी", keywords: ["वनरक्षक", "vanrakshak"] };
  }
  if (s.includes("saralseva")) {
    return { category: "saralseva", label: "सरळसेवा भरती चालू घडामोडी", keywords: ["सरळसेवा", "saralseva"] };
  }
  if (s.includes("zilha") || s.includes("zp")) {
    return { category: "zilha", label: "जिल्हा परिषद भरती चालू घडामोडी", keywords: ["जिल्हा परिषद", "zilha parishad", "zp"] };
  }
  if (s.includes("agniveer")) {
    return { category: "agniveer", label: "अग्निवीर चालू घडामोडी", keywords: ["अग्निवीर", "agniveer"] };
  }
  return { category: "general", label: "चालू घडामोडी", keywords: [] };
}

export default async function Home({ heroTitle, keywordSlug }: { heroTitle?: string; keywordSlug?: string }) {
  const [content, heroImages, sections] = await Promise.all([
    getContent(),
    getHeroImageUrls(),
    SectionService.getSections(),
  ]);

  const catDetails = getCategoryDetails(keywordSlug);
  const keywords = catDetails.keywords;

  // 1. Sort/Filter Announcements
  const announcements = [...content.announcements];
  if (keywords.length > 0) {
    announcements.sort((a, b) => {
      const aMatch = keywords.some(k => a.title.toLowerCase().includes(k));
      const bMatch = keywords.some(k => b.title.toLowerCase().includes(k));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return (a.display_order || 0) - (b.display_order || 0);
    });
  }

  // 2. Sort/Filter Gallery (Jobs)
  const gallery = content.gallery.map(post => {
    const isMatch = keywords.some(k => post.name.toLowerCase().includes(k));
    return {
      ...post,
      display_order: isMatch ? (post.display_order || 0) - 100 : (post.display_order || 0)
    };
  });

  // 3. Sort/Filter Testimonials
  const testimonials = [...content.testimonials];
  if (keywords.length > 0) {
    testimonials.sort((a, b) => {
      const aMatch = keywords.some(k => a.exam.toLowerCase().includes(k) || a.quote.toLowerCase().includes(k));
      const bMatch = keywords.some(k => b.exam.toLowerCase().includes(k) || b.quote.toLowerCase().includes(k));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return (a.display_order || 0) - (b.display_order || 0);
    });
  }

  // 4. Sort/Filter FAQs
  const faqs = [...content.faqs];
  if (keywords.length > 0) {
    faqs.sort((a, b) => {
      const aMatch = keywords.some(k => a.question.toLowerCase().includes(k) || a.answer.toLowerCase().includes(k));
      const bMatch = keywords.some(k => b.question.toLowerCase().includes(k) || b.answer.toLowerCase().includes(k));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return (a.display_order || 0) - (b.display_order || 0);
    });
  }

  const staticGSTitle = keywordSlug ? `${catDetails.label} + Static GS एकत्र` : undefined;
  const faqTitle = keywordSlug ? `${catDetails.label} FAQs` : undefined;
  const faqSubtitle = keywordSlug ? `${catDetails.label} बद्दल वारंवार विचारले जाणारे प्रश्न` : undefined;

  return (
    <>
      <StickyHeader />
      <main>
        {sections
          .filter((s) => s.enabled)
          .map((s) => {
            switch (s.id) {
              case "hero":
                return (
                  <Hero
                    key="hero"
                    imageUrl={heroImages.imageUrl}
                    mobileImageUrl={heroImages.mobileImageUrl}
                    customTitle={heroTitle}
                    imageLink={heroImages.imageLink}
                    mobileImageLink={heroImages.mobileImageLink}
                  />
                );
              case "daily_updates":
                return <DailyUpdates key="daily_updates" />;
              case "announcements":
                return <Announcements key="announcements" announcements={announcements} />;
              case "magazine":
                return <Magazine key="magazine" magazines={content.magazines} />;
              case "static_gs":
                return <StaticGS key="static_gs" customTitle={staticGSTitle} />;
              case "tests":
                return <Tests key="tests" tests={content.tests} />;
              case "gallery":
                return <Gallery key="gallery" posts={gallery} />;
              case "testimonials":
                return <Testimonials key="testimonials" testimonials={testimonials} />;
              case "faq":
                return <FAQ key="faq" faqs={faqs} customTitle={faqTitle} customSubtitle={faqSubtitle} />;
              case "final_cta":
                return <FinalCTA key="final_cta" />;
              default:
                return null;
            }
          })}
      </main>
      <Footer />
    </>
  );
}
