import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { getDb, mapRows } from "@/lib/db";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "name", label: "Post Name", type: "text" as const, placeholder: "Maharashtra Police Recruitment 2026" },
  { key: "image_url", label: "Advertisement Image (Image URL)", type: "image" as const, placeholder: "https://example.com/image.jpg" },
  { key: "start_date", label: "Start Date", type: "date" as const },
  { key: "last_date", label: "Last Date", type: "date" as const },
  { key: "link", label: "More Info Link (अधिक माहिती)", type: "text" as const, placeholder: "https://..." },
  { key: "apply_link", label: "Apply Link (Apply Now)", type: "text" as const, placeholder: "https://..." },
  { key: "is_new", label: "Mark as New", type: "switch" as const },
  { key: "date_extended", label: "Date Extended", type: "switch" as const },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function GalleryAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const db = await getDb();
  const { results } = await db.prepare("SELECT * FROM gallery ORDER BY display_order").all();

  return (
    <AdminCrudPage
      title="Job Recruitments"
      apiPath="/api/admin/gallery"
      fields={fields}
      columns={["name", "start_date", "last_date", "is_new", "date_extended"]}
      initialData={mapRows(results)}
    />
  );
}
