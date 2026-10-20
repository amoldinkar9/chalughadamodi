import type { SeoPage } from "@/lib/services/seo-page.service";

/** Server-rendered original content for a keyword page. Plain text only (no HTML injection). */
export default function KeywordContent({ page }: { page: SeoPage }) {
  const paragraphs = page.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  const faqSchema = page.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 bg-surface">
      <h2 className="text-2xl md:text-[32px] font-bold text-navy section-underline">{page.heading}</h2>
      <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {page.faqs.length > 0 && (
        <div className="mt-8 space-y-4">
          {page.faqs.map((f, i) => (
            <div key={i}>
              <h3 className="text-lg md:text-xl font-bold text-navy">{f.q}</h3>
              <p className="mt-1 text-[15px] md:text-base text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </section>
  );
}
