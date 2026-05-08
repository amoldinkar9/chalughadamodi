import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { getDb, mapRows } from "@/lib/db";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "title", label: "शीर्षक (Title)", type: "text" as const, placeholder: "MPSC राज्यसेवा 2026 अधिसूचना" },
  { key: "image_url", label: "Banner Image URL (32:9)", type: "text" as const, placeholder: "https://example.com/banner.jpg" },
  { key: "backlink", label: "Backlink URL (क्लिक केल्यावर कुठे जायचे)", type: "text" as const, placeholder: "https://..." },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function AnnouncementsAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const db = await getDb();
  const { results } = await db.prepare("SELECT * FROM announcements ORDER BY display_order").all();

  return (
    <AdminCrudPage
      title="सूचना - Announcements"
      apiPath="/api/admin/announcements"
      fields={fields}
      columns={["title", "image_url", "backlink"]}
      initialData={mapRows(results)}
    />
  );
}
