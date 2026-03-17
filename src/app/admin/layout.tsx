import { AdminSidebar } from "@/components/admin/sidebar";
import { Toaster } from "sonner";

export const metadata = {
  title: "Admin | Big Sexy's Brine Co.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--card)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          },
        }}
      />
    </div>
  );
}
