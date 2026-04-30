import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "name", label: "Name", type: "text" as const, placeholder: "प्रिया देशमुख" },
  { key: "initials", label: "Initials", type: "text" as const, placeholder: "प्रि" },
  { key: "exam", label: "Exam & Year", type: "text" as const, placeholder: "तलाठी, 2025" },
  { key: "quote", label: "Quote", type: "textarea" as const, placeholder: "Testimonial quote..." },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function TestimonialsAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const { data } = await supabase.from("testimonials").select("*").order("display_order");

  return (
    <AdminCrudPage
      title="Testimonials"
      apiPath="/api/admin/testimonials"
      fields={fields}
      columns={["name", "exam", "quote"]}
      initialData={data || []}
    />
  );
}
