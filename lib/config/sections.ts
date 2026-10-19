export interface SectionItem {
  id: string;
  name: string;
  marathiName: string;
  description: string;
  enabled: boolean;
}

export const DEFAULT_HOMEPAGE_SECTIONS: SectionItem[] = [
  {
    id: "hero",
    name: "Hero Banner",
    marathiName: "मुख्य बॅनर (Hero Image & CTA)",
    description: "Desktop and mobile hero banner with exam headlines and button link",
    enabled: true,
  },
  {
    id: "daily_updates",
    name: "Daily Current Affairs",
    marathiName: "दैनिक चालू घडामोडी (Daily Updates)",
    description: "Date-wise news feed with category tabs, search, audio summary, and quiz",
    enabled: true,
  },
  {
    id: "announcements",
    name: "Important Announcements",
    marathiName: "महत्त्वाच्या घोषणा (Announcements)",
    description: "Carousel banners for major exams, recruitment notices, and urgent alerts",
    enabled: true,
  },
  {
    id: "magazine",
    name: "Monthly Magazines",
    marathiName: "मासिक चालू घडामोडी मासिके",
    description: "Downloadable monthly magazine cards and archives",
    enabled: true,
  },
  {
    id: "static_gs",
    name: "Static GS Notes",
    marathiName: "Static GS संदर्भ (भूगोल, इतिहास, राज्यघटना)",
    description: "Curated static general studies syllabus notes paired with current affairs",
    enabled: true,
  },
  {
    id: "tests",
    name: "Mock Tests & Quizzes",
    marathiName: "सराव चाचण्या (Online Mock Tests)",
    description: "Daily mock tests and weekly revision tests with timer and scoring",
    enabled: true,
  },
  {
    id: "gallery",
    name: "Job Recruitments",
    marathiName: "नोकरी भरती जाहिराती (Job Alerts)",
    description: "Active government job notifications with application deadlines and direct apply links",
    enabled: true,
  },
  {
    id: "testimonials",
    name: "Student Testimonials",
    marathiName: "विद्यार्थ्यांच्या प्रतिक्रिया (Testimonials)",
    description: "Verified testimonials from successful candidates and subscribers",
    enabled: true,
  },
  {
    id: "faq",
    name: "Frequently Asked Questions",
    marathiName: "वारंवार विचारले जाणारे प्रश्न (FAQs)",
    description: "Collapsible questions and answers with structured FAQ schema for Google Search",
    enabled: true,
  },
  {
    id: "final_cta",
    name: "Final Call to Action",
    marathiName: "शेवटची कृती योजना (Final CTA & WhatsApp)",
    description: "WhatsApp community invitation and mobile app download banner",
    enabled: true,
  },
];

export const VALID_SECTION_IDS = new Set(
  DEFAULT_HOMEPAGE_SECTIONS.map((s) => s.id)
);

/**
 * Safely parse section configuration from site_settings value.
 * Handles missing items, invalid IDs, and schema migrations.
 */
export function parseSectionConfig(rawJson?: string | null): SectionItem[] {
  if (!rawJson) {
    return DEFAULT_HOMEPAGE_SECTIONS.map((s) => ({ ...s }));
  }

  try {
    const parsed = JSON.parse(rawJson);
    if (!Array.isArray(parsed)) {
      return DEFAULT_HOMEPAGE_SECTIONS.map((s) => ({ ...s }));
    }

    const defaultMap = new Map<string, SectionItem>(
      DEFAULT_HOMEPAGE_SECTIONS.map((s) => [s.id, s])
    );

    const result: SectionItem[] = [];
    const seen = new Set<string>();

    for (const item of parsed) {
      if (
        item &&
        typeof item.id === "string" &&
        defaultMap.has(item.id) &&
        !seen.has(item.id)
      ) {
        const def = defaultMap.get(item.id)!;
        result.push({
          id: def.id,
          name: def.name,
          marathiName: def.marathiName,
          description: def.description,
          enabled: item.enabled !== false, // default true unless explicitly false
        });
        seen.add(def.id);
      }
    }

    // Append any default sections that were not present in saved configuration
    for (const def of DEFAULT_HOMEPAGE_SECTIONS) {
      if (!seen.has(def.id)) {
        result.push({ ...def });
      }
    }

    return result;
  } catch {
    return DEFAULT_HOMEPAGE_SECTIONS.map((s) => ({ ...s }));
  }
}
