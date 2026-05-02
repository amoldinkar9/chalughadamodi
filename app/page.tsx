import StickyHeader from "@/components/sections/StickyHeader";
import Hero from "@/components/sections/Hero";
import Announcements from "@/components/sections/Announcements";
import Gallery from "@/components/sections/Gallery";
import Magazine from "@/components/sections/Magazine";
import Tests from "@/components/sections/Tests";
import StaticGS from "@/components/sections/StaticGS";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/lib/supabase";
import type { PublicContent } from "@/lib/types";

// Fallback data in case Supabase is not configured yet
const fallbackContent: PublicContent = {
  announcements: [
    { id: "a1", title: "MPSC राज्यसेवा 2026 अधिसूचना", image_url: "https://placehold.co/1280x360/0A2540/D4A24C?text=MPSC+राज्यसेवा+2026", backlink: "https://www.tcs9.in/mr/test-series", published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "a2", title: "तलाठी भरती अपडेट", image_url: "https://placehold.co/1280x360/163A5F/FAF7F2?text=तलाठी+भरती+अपडेट", backlink: "https://www.tcs9.in/mr/test-series", published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "a3", title: "मोफत मासिक PDF डाउनलोड करा", image_url: "https://placehold.co/1280x360/D4A24C/0A2540?text=मोफत+मासिक+PDF", backlink: "#magazine", published: true, display_order: 3, created_at: "", updated_at: "" },
  ],
  gallery: [
    { id: "1", name: "महाराष्ट्र पोलीस भरती 2026", image_url: "", start_date: "2026-04-01", last_date: "2026-05-05", link: "#", is_new: true, date_extended: false, published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "2", name: "तलाठी भरती 2026", image_url: "", start_date: "2026-04-10", last_date: "2026-05-20", link: "#", is_new: true, date_extended: false, published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "3", name: "रेल्वे RRB Group D", image_url: "", start_date: "2026-04-15", last_date: "2026-06-01", link: "#", is_new: false, date_extended: false, published: true, display_order: 3, created_at: "", updated_at: "" },
    { id: "4", name: "SSC GD भरती", image_url: "", start_date: "2026-05-01", last_date: "2026-06-10", link: "#", is_new: false, date_extended: true, published: true, display_order: 4, created_at: "", updated_at: "" },
    { id: "5", name: "वनरक्षक भरती", image_url: "", start_date: "2026-05-05", last_date: "2026-06-25", link: "#", is_new: false, date_extended: false, published: true, display_order: 5, created_at: "", updated_at: "" },
    { id: "6", name: "सरळसेवा भरती", image_url: "", start_date: "2026-05-10", last_date: "2026-06-30", link: "#", is_new: false, date_extended: false, published: true, display_order: 6, created_at: "", updated_at: "" },
  ],
  magazines: [
    { id: "1", month: "एप्रिल 2026", image_url: "", pdf_url: "", published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "2", month: "मार्च 2026", image_url: "", pdf_url: "", published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "3", month: "फेब्रुवारी 2026", image_url: "", pdf_url: "", published: true, display_order: 3, created_at: "", updated_at: "" },
    { id: "4", month: "जानेवारी 2026", image_url: "", pdf_url: "", published: true, display_order: 4, created_at: "", updated_at: "" },
    { id: "5", month: "डिसेंबर 2025", image_url: "", pdf_url: "", published: true, display_order: 5, created_at: "", updated_at: "" },
    { id: "6", month: "नोव्हेंबर 2025", image_url: "", pdf_url: "", published: true, display_order: 6, created_at: "", updated_at: "" },
  ],
  tests: [
    { id: "1", title: "आजची टेस्ट", questions: "10", duration: "5 मिनिट", href: "https://www.tcs9.in/mr/test-series", image_url: "", published: true, display_order: 1, created_at: "", updated_at: "" },
    { id: "2", title: "या आठवड्याची टेस्ट", questions: "30", duration: "15 मिनिट", href: "https://www.tcs9.in/mr/test-series", image_url: "", published: true, display_order: 2, created_at: "", updated_at: "" },
    { id: "3", title: "मागील महिना टेस्ट", questions: "50", duration: "30 मिनिट", href: "https://www.tcs9.in/mr/test-series", image_url: "", published: true, display_order: 3, created_at: "", updated_at: "" },
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

async function getHeroImageUrl(): Promise<string> {
  try {
    if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === "https://your-project.supabase.co") {
      return "";
    }
    const { data } = await supabase.from("site_settings").select("value").eq("key", "hero_image_url").single();
    return data?.value || "";
  } catch {
    return "";
  }
}

async function getContent(): Promise<PublicContent> {
  try {
    if (!process.env.SUPABASE_URL || process.env.SUPABASE_URL === "https://your-project.supabase.co") {
      return fallbackContent;
    }

    const [announcements, gallery, magazines, tests, testimonials, faqs] = await Promise.all([
      supabase.from("announcements").select("*").eq("published", true).order("display_order"),
      supabase.from("gallery").select("*").eq("published", true).order("display_order"),
      supabase.from("magazines").select("*").eq("published", true).order("display_order"),
      supabase.from("tests").select("*").eq("published", true).order("display_order"),
      supabase.from("testimonials").select("*").eq("published", true).order("display_order"),
      supabase.from("faqs").select("*").eq("published", true).order("display_order"),
    ]);

    return {
      announcements: announcements.data?.length ? announcements.data : fallbackContent.announcements,
      gallery: gallery.data?.length ? gallery.data : fallbackContent.gallery,
      magazines: magazines.data?.length ? magazines.data : fallbackContent.magazines,
      tests: tests.data?.length ? tests.data : fallbackContent.tests,
      testimonials: testimonials.data?.length ? testimonials.data : fallbackContent.testimonials,
      faqs: faqs.data?.length ? faqs.data : fallbackContent.faqs,
    };
  } catch {
    return fallbackContent;
  }
}

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [content, heroImageUrl] = await Promise.all([getContent(), getHeroImageUrl()]);

  return (
    <>
      <StickyHeader />
      <main>
        <Hero imageUrl={heroImageUrl} />
        <Announcements announcements={content.announcements} />
        <Gallery posts={content.gallery} />
        <Magazine magazines={content.magazines} />
        <Tests tests={content.tests} />
        <StaticGS />
        <Testimonials testimonials={content.testimonials} />
        <FAQ faqs={content.faqs} />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
