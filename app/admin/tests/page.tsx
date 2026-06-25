import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { getDb, mapRows } from "@/lib/db";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "title", label: "Test Title", type: "text" as const, placeholder: "Today's Test" },
  { key: "image_url", label: "Image", type: "image" as const, placeholder: "https://example.com/image.jpg", uploadFolder: "tests" },
  { key: "description", label: "Description", type: "text" as const, placeholder: "Brief description of the test" },
  { key: "href", label: "Test URL", type: "text" as const, placeholder: "https://chalughadamodi.in/test" },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function TestsAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const db = await getDb();
  const { results } = await db.prepare("SELECT * FROM tests ORDER BY display_order").all();

  return (
    <AdminCrudPage
      title="Tests"
      apiPath="/api/admin/tests"
      fields={fields}
      columns={["title", "image_url", "description"]}
      initialData={mapRows(results)}
    />
  );
}
