import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { AdminToolbar } from "@/components/admin/admin-toolbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminToolbar />
      <LocalBusinessJsonLd />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
