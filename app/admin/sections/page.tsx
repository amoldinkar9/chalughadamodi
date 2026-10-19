import type { Metadata } from "next";
import { SectionManager } from "@/components/admin/SectionManager";

export const metadata: Metadata = {
  title: "Section Manager | Admin Dashboard",
  description: "Configure homepage and keyword page section ordering and visibility",
};

export default function AdminSectionsPage() {
  return <SectionManager />;
}
