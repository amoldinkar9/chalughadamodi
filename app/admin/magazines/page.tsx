import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { getDb, mapRows } from "@/lib/db";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "month", label: "Month", type: "text" as const, placeholder: "April 2026" },
  { key: "image_url", label: "Magazine Cover (Cover Image 4/3.35)", type: "image" as const, placeholder: "https://example.com/cover.jpg", uploadFolder: "magazines", aspectRatio: "4/3.35" },
  { key: "pdf_url", label: "PDF URL", type: "text" as const, placeholder: "https://..." },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function MagazinesAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const db = await getDb();
  const { results } = await db.prepare("SELECT * FROM magazines ORDER BY display_order").all();

  return (
    <AdminCrudPage
      title="Magazines"
      apiPath="/api/admin/magazines"
      fields={fields}
      columns={["month"]}
      initialData={mapRows(results)}
    />
  );
}
