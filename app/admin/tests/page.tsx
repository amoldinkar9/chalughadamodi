import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import AdminCrudPage from "@/components/admin/AdminCrudPage";

const fields = [
  { key: "title", label: "Test Title", type: "text" as const, placeholder: "आजची टेस्ट" },
  { key: "questions", label: "Questions", type: "text" as const, placeholder: "10" },
  { key: "duration", label: "Duration", type: "text" as const, placeholder: "5 मिनिट" },
  { key: "href", label: "Test URL", type: "text" as const, placeholder: "https://www.tcs9.in/mr/test-series" },
  { key: "display_order", label: "Display Order", type: "number" as const },
];

export default async function TestsAdmin() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const { data } = await supabase.from("tests").select("*").order("display_order");

  return (
    <AdminCrudPage
      title="टेस्ट - Test"
      apiPath="/api/admin/tests"
      fields={fields}
      columns={["title", "questions", "duration"]}
      initialData={data || []}
    />
  );
}
