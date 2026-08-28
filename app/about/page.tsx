import type { Metadata } from "next";
import Link from "next/link";
import { getActiveDomain, getDomainConfig } from "@/lib/domain";

export async function generateMetadata(): Promise<Metadata> {
  const domain = await getActiveDomain();
  const config = getDomainConfig(domain);

  return {
    title: `आमच्याबद्दल | ${config.brandName} — मराठी Current Affairs Platform`,
    description:
      "चालू घडामोडी कोण आहे, आमचे ध्येय काय आहे, आणि आम्ही मराठी विद्यार्थ्यांना कसे मदत करतो. MPSC, तलाठी, पोलीस भरती विद्यार्थ्यांसाठी मोफत मराठी current affairs platform.",
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title: `आमच्याबद्दल | ${config.brandName}`,
      description:
        "मराठी विद्यार्थ्यांसाठी मोफत current affairs platform — आमची कथा, आमचे ध्येय.",
      url: `${config.baseUrl}/about`,
      images: [
        {
          url: `${config.baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "चालू घडामोडी About Page",
        },
      ],
    },
  };
}

export default async function AboutPage() {
  const domain = await getActiveDomain();
  const config = getDomainConfig(domain);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${config.baseUrl}/about#webpage`,
    name: `आमच्याबद्दल — ${config.brandName}`,
    url: `${config.baseUrl}/about`,
    description:
      "चालू घडामोडी हे महाराष्ट्रातील स्पर्धा परीक्षा विद्यार्थ्यांसाठी मोफत मराठी current affairs platform आहे.",
    inLanguage: "mr",
    isPartOf: { "@id": `${config.baseUrl}/#website` },
    about: { "@id": `${config.baseUrl}/#organization` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "मुख्यपान", item: config.baseUrl },
        { "@type": "ListItem", position: 2, name: "आमच्याबद्दल", item: `${config.baseUrl}/about` },
      ],
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <main className="bg-cream min-h-screen">
        {/* Hero */}
        <section className="bg-navy text-white py-20 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto text-center">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-gold transition-colors duration-200">
                    मुख्यपान
                  </Link>
                </li>
                <li aria-hidden="true" className="text-white/40">›</li>
                <li className="text-gold font-medium">आमच्याबद्दल</li>
              </ol>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              आमच्याबद्दल
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-[700px] mx-auto">
              महाराष्ट्रातील प्रत्येक विद्यार्थ्याला मोफत, दर्जेदार आणि परीक्षा-केंद्रित
              मराठी current affairs मिळावी — हेच आमचे ध्येय.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-navy font-bold text-2xl md:text-3xl mb-6">
                  आमचे ध्येय
                </h2>
                <div className="space-y-4 text-muted font-medium leading-relaxed">
                  <p>
                    <strong className="text-navy">चालू घडामोडी</strong> हे महाराष्ट्रातील
                    स्पर्धा परीक्षा विद्यार्थ्यांसाठी तयार केलेले 100% मोफत मराठी
                    current affairs platform आहे.
                  </p>
                  <p>
                    MPSC, तलाठी, पोलीस भरती, SSC GD, रेल्वे, वनरक्षक, सरळसेवा —
                    या सर्व परीक्षांमध्ये current affairs हा महत्त्वाचा विषय आहे.
                    मात्र, बाजारात उपलब्ध असलेले बहुतांश sources इंग्रजीत किंवा
                    हिंदीत आहेत, किंवा पैसे भरल्याशिवाय मिळत नाहीत.
                  </p>
                  <p>
                    आमचा विश्वास आहे की <strong className="text-navy">भाषेचा अडथळा</strong> किंवा{" "}
                    <strong className="text-navy">पैशांची कमतरता</strong> कोणत्याही
                    मराठी विद्यार्थ्याच्या यशाच्या आड येऊ नये.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: "🎯",
                    title: "परीक्षा-केंद्रित",
                    desc: "प्रत्येक बातमी MPSC syllabus नुसार tag केली जाते. Revision सोपी होते.",
                  },
                  {
                    icon: "🆓",
                    title: "100% मोफत",
                    desc: "कुठलेही login नाही, subscription नाही, paywall नाही. सदैव मोफत.",
                  },
                  {
                    icon: "🗣️",
                    title: "100% मराठी",
                    desc: "सर्व content मराठीत. कठीण संज्ञांचा मराठीत अर्थ सुद्धा दिला जातो.",
                  },
                  {
                    icon: "📅",
                    title: "रोज अपडेट",
                    desc: "आठवड्यातील 6 दिवस ताज्या चालू घडामोडी. मासिक एकदा PDF स्वरूपात.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 p-5 bg-surface rounded-xl border border-border"
                  >
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <h3 className="text-navy font-bold text-base mb-1">{item.title}</h3>
                      <p className="text-muted font-medium text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Exams we cover */}
        <section className="bg-surface py-16 px-6 md:px-12 border-t border-border">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-navy font-bold text-2xl md:text-3xl mb-3 text-center">
              आम्ही कोणत्या परीक्षांसाठी content देतो?
            </h2>
            <p className="text-muted text-center font-medium mb-10">
              महाराष्ट्र आणि केंद्र सरकारच्या सर्व प्रमुख स्पर्धा परीक्षा
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "MPSC राज्यसेवा", "MPSC PSI/STI/ASO", "तलाठी भरती", "पोलीस भरती",
                "SSC GD", "रेल्वे RRB Group D", "वनरक्षक भरती", "सरळसेवा भरती",
              ].map((exam) => (
                <div
                  key={exam}
                  className="bg-cream border border-border rounded-lg px-4 py-3 text-center text-navy font-semibold text-sm"
                >
                  {exam}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What makes us different */}
        <section className="py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-navy font-bold text-2xl md:text-3xl mb-10 text-center">
              आम्ही वेगळे का आहोत?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Static GS शी जोडलेले",
                  desc: "प्रत्येक current event हे static general studies च्या topic शी जोडले जाते. त्यामुळे फक्त घटना नाही, तर पार्श्वभूमी सुद्धा समजते.",
                },
                {
                  title: "मासिक PDF",
                  desc: "दर महिन्याला सर्व चालू घडामोडी एका PDF मध्ये. Download करा, print करा — internet नसला तरी revision शक्य.",
                },
                {
                  title: "सराव टेस्ट",
                  desc: "प्रत्यक्ष परीक्षेच्या पातळीच्या questions. रोज, आठवड्याने, महिन्याने — तिन्ही प्रकारच्या test मोफत.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-6 bg-surface rounded-xl border border-border"
                >
                  <h3 className="text-navy font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-muted font-medium text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-navy py-16 px-6 md:px-12">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="text-white font-bold text-2xl md:text-3xl mb-4">
              संपर्क करा
            </h2>
            <p className="text-white/70 font-medium mb-8 leading-relaxed">
              कुठलाही प्रश्न असेल, सूचना असेल, किंवा partnership बद्दल बोलायचे असेल —
              आमच्याशी थेट WhatsApp वर संपर्क करा.
            </p>
            <a
              href="https://wa.me/919579616908"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#1DA851] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.52 5.845L.057 23.571a.5.5 0 0 0 .61.634l5.913-1.549A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.928 0-3.73-.502-5.289-1.381l-.378-.217-3.927 1.029 1.03-3.813-.233-.392A9.963 9.963 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
              WhatsApp वर संपर्क करा
            </a>
            <p className="text-white/50 text-sm mt-4">
              किंवा <Link href="/" className="text-gold hover:underline">मुख्यपानावर</Link> परत जा
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
