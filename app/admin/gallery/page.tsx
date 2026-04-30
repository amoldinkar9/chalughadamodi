import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "name", label: "Post Name", type: "text" as const, placeholder: "महाराष्ट्र पोलीस भरती 2026" },
  { key: "date", label: "Last Date", type: "text" as const, placeholder: "15 मे 2026" },
  { key: "link", label: "Link URL", type: "text" as const, placeholder: "https://..." },
  { key: "is_new", label: "Mark as New", type: "switch" as const },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function GalleryAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const { data } = await supabase.from("gallery").select("*").order("display_order");

  return (
    <AdminCrudPage
      title="Job Recruitments"
      apiPath="/api/admin/gallery"
      fields={fields}
      columns={["name", "date", "is_new"]}
      initialData={data || []}
    />
  );
}
