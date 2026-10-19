import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { SectionService } from "@/lib/services/content.service";
import { SectionManager } from "@/components/admin/SectionManager";

export const metadata: Metadata = {
  title: "Section Manager | Admin Dashboard",
  description: "Configure homepage and keyword page section ordering and visibility",
};

export const dynamic = "force-dynamic";

export default async function AdminSectionsPage() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const initialSections = await SectionService.getSections();

  return <SectionManager initialSections={initialSections} />;
}

