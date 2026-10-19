import Link from "next/link";
import { Calendar, Tag, BookOpen, CheckCircle2 } from "lucide-react";

export interface CurrentAffairsArticle {
  id: string;
  date: string;
  isoDate: string;
  category: string;
  examTags: string[];
  title: string;
  summary: string;
  points: string[];
  staticGsLink: string;
  slug: string;
}

export const LATEST_CURRENT_AFFAIRS: CurrentAffairsArticle[] = [
  {
    id: "ca-2026-10-19-1",
    date: "19 ऑक्टोबर 2026",
    isoDate: "2026-10-19T06:00:00+05:30",
    category: "महाराष्ट्र घडामोडी",
    examTags: ["MPSC राज्यसेवा", "तलाठी भरती", "पोलीस भरती"],
    title: "महाराष्ट्रात नवीन सौर ऊर्जा व जलसंधारण धोरणाची घोषणा",
    summary: "महाराष्ट्र शासनाने राज्यातील शेती पंपांना दिवसा वीज पुरवण्यासाठी आणि दुष्काळग्रस्त भागातील भूजल पातळी वाढवण्यासाठी सर्वसमावेशक सौर ऊर्जा व जलसंधारण उपक्रम जाहीर केला आहे.",
    points: [
      "राज्यातील 20 जिल्ह्यांतील शेतकऱ्यांना 90% अनुदानावर सौर कृषी पंप वाटपाचे उद्दिष्ट.",
      "जलयुक्त शिवार अभियान 2.0 अंतर्गत 5,000 गावांमधील पाझर तलाव व जलस्रोत पुनरुज्जीवित केले जाणार.",
      "या योजनेमुळे सिंचन क्षेत्रात 22% वाढ होण्याचा कृषी विभागाचा अंदाज."
    ],
    staticGsLink: "GS 1 & GS 3 — महाराष्ट्राचा भूगोल, जलसंपदा व अपारंपरिक ऊर्जा संसाधने",
    slug: "chalu-ghadamodi-maharashtra-2026",
  },
  {
    id: "ca-2026-10-18-1",
    date: "18 ऑक्टोबर 2026",
    isoDate: "2026-10-18T06:00:00+05:30",
    category: "राष्ट्रीय व अर्थव्यवस्था",
    examTags: ["MPSC Combine", "सरळसेवा", "RRB"],
    title: "रिझर्व्ह बँकेचा पतधोरण आढावा: महागाई दर नियंत्रणात, UPI ची आंतरराष्ट्रीय व्याप्ती",
    summary: "भारतीय रिझर्व्ह बँकेने (RBI) चालू तिमाहीसाठी पतधोरण जाहीर केले असून रेपो दर स्थिर ठेवण्याचा निर्णय घेतला आहे. डिजिटल पेमेंट क्षेत्रातील प्रगतीवर विशेष भर देण्यात आला.",
    points: [
      "रेपो दर 6.50% वर स्थिर ठेवण्यात आला, ज्यामुळे गृहकर्ज आणि इतर कर्जांचे व्याजदर स्थिर राहतील.",
      "भारताच्या UPI प्लॅटफॉर्मचा वापर आता आशिया आणि आखाती देशांमधील 15 हून अधिक देशांमध्ये अधिकृतपणे सुरू.",
      "चालू आर्थिक वर्षात भारताचा विकास दर (GDP Growth Rate) 7.2% राहण्याचा RBI चा अंदाज."
    ],
    staticGsLink: "GS 4 — भारतीय अर्थव्यवस्था, रिझर्व्ह बँकेची मौद्रिक धोरणे व महागाई नियंत्रण",
    slug: "chalu-ghadamodi-2026",
  },
  {
    id: "ca-2026-10-17-1",
    date: "17 ऑक्टोबर 2026",
    isoDate: "2026-10-17T06:00:00+05:30",
    category: "पर्यावरण व विज्ञान",
    examTags: ["MPSC", "वनरक्षक भरती"],
    title: "प्रोजेक्ट HANUMAN आणि वन्यजीव कॉरिडॉर संवर्धन अहवाल प्रसिद्ध",
    summary: "आंध्र प्रदेश व महाराष्ट्र सीमेवरील वन्यजीव अभयारण्यांमध्ये मानव-वन्यजीव संघर्ष कमी करण्यासाठी राबवण्यात आलेल्या प्रोजेक्ट हनुमान मोहिमेचा पहिला वार्षिक अहवाल जाहीर झाला.",
    points: [
      "AI-आधारित सेन्सर्स आणि ड्रोन मॉनिटरिंगमुळे व्याघ्र प्रकल्पातील वन्यजीवांची सुरक्षा 40% नी सुधारली.",
      "स्थानिक ग्रामस्थांना वन संवर्धनात सहभागी करून घेण्यासाठी 'वनमित्र' उपक्रमाची सुरुवात.",
      "IUCN रेड लिस्ट मधील संकटग्रस्त प्रजातींच्या संरक्षणासाठी विशेष टास्क फोर्सची स्थापना."
    ],
    staticGsLink: "GS 1 & GS 3 — जैवविविधता संवर्धन, वन्यजीव संरक्षण कायदा 1972 व हवामान बदल",
    slug: "vanrakshak-bharti-chalu-ghadamodi",
  },
  {
    id: "ca-2026-10-16-1",
    date: "16 ऑक्टोबर 2026",
    isoDate: "2026-10-16T06:00:00+05:30",
    category: "क्रीडा घडामोडी",
    examTags: ["पोलीस भरती", "SSC GD", "तलाठी"],
    title: "राष्ट्रीय क्रीडा स्पर्धा 2026: महाराष्ट्राच्या खेळाडूंची सुवर्ण पदकांची लयलूट",
    summary: "राष्ट्रीय क्रीडा स्पर्धेत महाराष्ट्र संघाने ॲथलेटिक्स, जलतरण आणि कुस्ती या प्रकारांमध्ये ऐतिहासिक कामगिरी नोंदवत अव्वल स्थान राखले.",
    points: [
      "महाराष्ट्राने एकूण 85 पदके जिंकली, ज्यात 32 सुवर्ण, 28 रौप्य आणि 25 कांस्य पदकांचा समावेश आहे.",
      "कुस्ती प्रकारात कोल्हापूर व सांगलीच्या पैलवानांनी 5 सुवर्ण पदके पटकावली.",
      "राज्य शासनाकडून पदक विजेत्या खेळाडूंना शासकीय नोकऱ्यांमध्ये 5% थेट आरक्षणाची घोषणा."
    ],
    staticGsLink: "General Knowledge — राष्ट्रीय खेळ, पुरस्कार व महाराष्ट्र क्रीडा धोरण",
    slug: "police-bharti-chalu-ghadamodi",
  },
];

export default function DailyUpdates() {
  const articlesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "ताज्या चालू घडामोडी 2026 — Daily Marathi Current Affairs",
    "itemListElement": LATEST_CURRENT_AFFAIRS.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "NewsArticle",
        "headline": article.title,
        "description": article.summary,
        "datePublished": article.isoDate,
        "dateModified": article.isoDate,
        "inLanguage": "mr",
        "author": {
          "@type": "Organization",
          "name": "चालू घडामोडी",
          "url": "https://chalughadamodi.in"
        },
        "publisher": {
          "@type": "Organization",
          "name": "चालू घडामोडी",
          "logo": {
            "@type": "ImageObject",
            "url": "https://chalughadamodi.in/og-image.png"
          }
        },
        "mainEntityOfPage": `https://chalughadamodi.in/${article.slug}`
      }
    }))
  };

  return (
    <section id="daily-updates" className="bg-surface py-16 md:py-24 border-y border-border">
      {/* Structured Data: NewsArticle ItemList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesSchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-semibold uppercase tracking-wider mb-3">
            <Calendar size={14} className="text-gold" />
            <span>दैनिक संपादकीय व विश्लेषण</span>
          </div>
          <h2 className="text-navy font-bold text-2xl md:text-[34px]">
            आजच्या ताज्या चालू घडामोडी — Daily Updates
          </h2>
          <span className="section-underline" />
          <p className="text-muted font-medium text-base mt-4 max-w-2xl mx-auto">
            MPSC, तलाठी, पोलीस भरती आणि सर्व स्पर्धा परीक्षांसाठी दररोजच्या महत्त्वाच्या घडामोडी — Static GS विश्लेषणासह
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {LATEST_CURRENT_AFFAIRS.map((article) => (
            <article
              key={article.id}
              className="bg-cream/40 border border-border rounded-xl p-6 md:p-8 card-hover flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy text-cream">
                    <Tag size={12} className="text-gold" />
                    {article.category}
                  </span>
                  <span className="text-muted flex items-center gap-1">
                    <Calendar size={13} />
                    {article.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-navy font-bold text-lg md:text-xl leading-snug mb-3">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-navy/80 font-medium text-sm md:text-base leading-relaxed mb-4">
                  {article.summary}
                </p>

                {/* Key Points */}
                <div className="space-y-2 mb-5">
                  <p className="text-navy font-bold text-xs uppercase tracking-wider">परीक्षेसाठी महत्त्वाचे मुद्दे:</p>
                  <ul className="space-y-1.5">
                    {article.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-navy/90">
                        <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Static GS connection */}
                <div className="bg-surface border border-gold/40 rounded-lg p-3 mb-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gold mb-1">
                    <BookOpen size={13} />
                    <span>Static GS सह संबंध:</span>
                  </div>
                  <p className="text-xs text-navy/90 font-medium leading-relaxed">
                    {article.staticGsLink}
                  </p>
                </div>
              </div>

              {/* Footer strip */}
              <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {article.examTags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-surface border border-border text-muted font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${article.slug}`}
                  className="font-bold text-navy hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  सविस्तर सराव →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom banner for magazine and tests */}
        <div className="mt-12 text-center bg-navy rounded-xl p-8 text-cream shadow-md">
          <h4 className="text-xl md:text-2xl font-bold mb-2">
            संपूर्ण महिन्याची चालू घडामोडी एकाच ठिकाणी हवी आहे?
          </h4>
          <p className="text-cream/80 text-sm md:text-base max-w-xl mx-auto mb-6">
            आमच्या मोफत मासिकातून संपूर्ण महिनाभर घडलेल्या सर्व घटनांचे विषयानुसार सविस्तर वाचन करा.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/chalu-ghadamodi-2026-pdf"
              className="btn-primary px-6 py-3 rounded-md font-bold text-sm"
            >
              मासिक आवृत्ती डाउनलोड करा
            </Link>
            <Link
              href="/today-current-affairs-in-marathi"
              className="btn-outline text-cream border-cream/30 hover:border-cream px-6 py-3 rounded-md font-bold text-sm"
            >
              रोजच्या टेस्ट सोडवा
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
