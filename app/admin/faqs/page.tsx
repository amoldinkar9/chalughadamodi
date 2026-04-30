import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "question", label: "Question", type: "text" as const, placeholder: "हे website मोफत आहे का?" },
  { key: "answer", label: "Answer", type: "textarea" as const, placeholder: "Answer text..." },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function FAQsAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const { data } = await supabase.from("faqs").select("*").order("display_order");

  return (
    <AdminCrudPage
      title="FAQ's"
      apiPath="/api/admin/faqs"
      fields={fields}
      columns={["question", "answer"]}
      initialData={data || []}
    />
  );
}
