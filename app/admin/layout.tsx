import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await verifyAdmin();

  if (!isAdmin) {
    return (
      <div className="admin-layout min-h-screen">
        <Toaster />
        {children}
      </div>
    );
  }

  return (
    <div className="admin-layout min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-auto pt-16 md:pt-8">
        <Toaster />
        {children}
      </main>
    </div>
  );
}
