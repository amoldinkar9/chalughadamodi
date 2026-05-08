import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Newspaper, BookOpen, ClipboardList, MessageSquareQuote, HelpCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

async function getCounts() {
  const db = await getDb();
  const tables = ["announcements", "gallery", "magazines", "tests", "testimonials", "faqs"] as const;
  const results = await Promise.all(
    tables.map((t) =>
      db.prepare(`SELECT COUNT(*) as total, SUM(CASE WHEN published = 1 THEN 1 ELSE 0 END) as published FROM ${t}`).first<{ total: number; published: number }>()
    )
  );
  return Object.fromEntries(
    tables.map((t, i) => [t, { total: results[i]?.total ?? 0, published: results[i]?.published ?? 0 }])
  ) as Record<typeof tables[number], { total: number; published: number }>;
}

const sections = [
  { key: "announcements", label: "सूचना - Announcements", icon: Megaphone, href: "/admin/announcements", color: "text-orange-600" },
  { key: "gallery", label: "भरती जाहिराती - Job Recruitments", icon: Newspaper, href: "/admin/gallery", color: "text-blue-600" },
  { key: "magazines", label: "मासिके - Magazines", icon: BookOpen, href: "/admin/magazines", color: "text-amber-600" },
  { key: "tests", label: "टेस्ट - Test", icon: ClipboardList, href: "/admin/tests", color: "text-green-600" },
  { key: "testimonials", label: "Testimonials", icon: MessageSquareQuote, href: "/admin/testimonials", color: "text-purple-600" },
  { key: "faqs", label: "FAQ's", icon: HelpCircle, href: "/admin/faqs", color: "text-rose-600" },
] as const;

export default async function AdminDashboard() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const counts = await getCounts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">चालू घडामोडी content manage करा</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink size={16} />
          Website पहा
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => {
          const c = counts[s.key];
          return (
            <Link key={s.key} href={s.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{s.label}</CardTitle>
                  <s.icon size={20} className={s.color} />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{c.total}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default" className="text-xs">{c.published} published</Badge>
                    {c.total - c.published > 0 && (
                      <Badge variant="secondary" className="text-xs">{c.total - c.published} draft</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 p-4 border rounded-lg bg-card">
        <h2 className="font-semibold mb-2">कसं काम करतं?</h2>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li>1. वरील कोणत्याही section वर click करा</li>
          <li>2. &quot;नवीन जोडा&quot; बटण वापरून content add करा</li>
          <li>3. Published toggle ON ठेवा — Website वर लगेच दिसेल</li>
          <li>4. जुने content delete करायचे असल्यास trash icon वापरा</li>
          <li>5. क्रम बदलायचा असल्यास arrow buttons वापरा</li>
        </ul>
      </div>
    </div>
  );
}
