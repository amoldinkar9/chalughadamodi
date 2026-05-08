import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { getDb, mapRows } from "@/lib/db";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "name", label: "Name", type: "text" as const, placeholder: "Priya Deshmukh" },
  { key: "initials", label: "Initials", type: "text" as const, placeholder: "PD" },
  { key: "exam", label: "Exam & Year", type: "text" as const, placeholder: "Talathi, 2025" },
  { key: "quote", label: "Quote", type: "textarea" as const, placeholder: "Testimonial quote..." },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function TestimonialsAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const db = await getDb();
  const { results } = await db.prepare("SELECT * FROM testimonials ORDER BY display_order").all();

  return (
    <AdminCrudPage
      title="Testimonials"
      apiPath="/api/admin/testimonials"
      fields={fields}
      columns={["name", "exam", "quote"]}
      initialData={mapRows(results)}
    />
  );
}
