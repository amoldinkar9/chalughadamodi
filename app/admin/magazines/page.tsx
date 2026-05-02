import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "month", label: "Month", type: "text" as const, placeholder: "एप्रिल 2026" },
  { key: "image_url", label: "मासिक मुखपृष्ठ (Cover Image 4:5)", type: "image" as const, placeholder: "https://example.com/cover.jpg", uploadFolder: "magazines" },
  { key: "pdf_url", label: "PDF URL", type: "text" as const, placeholder: "https://..." },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function MagazinesAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const { data } = await supabase.from("magazines").select("*").order("display_order");

  return (
    <AdminCrudPage
      title="मासिके - Magazines"
      apiPath="/api/admin/magazines"
      fields={fields}
      columns={["month"]}
      initialData={data || []}
    />
  );
}
