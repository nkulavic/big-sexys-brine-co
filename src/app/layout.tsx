import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const heading = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Big Sexy's Brine Co. | Small-Batch Artisan Preserved Foods",
    template: "%s | Big Sexy's Brine Co.",
  },
  description:
    "Small-batch artisan preserved foods handcrafted in Wheat Ridge, CO. 18 unique varieties of spicy, savory, and sweet brined goods. Brined to Perfection.",
  keywords: [
    "artisan preserves",
    "small batch",
    "Wheat Ridge CO",
    "Denver",
    "handcrafted",
    "spicy",
    "preserved foods",
    "condiments",
    "Big Sexy's Brine Co",
  ],
  authors: [{ name: "Big Sexy's Brine Co." }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Big Sexy's Brine Co.",
    title: "Big Sexy's Brine Co. | Small-Batch Artisan Preserved Foods",
    description:
      "Small-batch artisan preserved foods handcrafted in Wheat Ridge, CO. Brined to Perfection.",
    images: [{ url: "/images/logo/logo-transparent.png", width: 1024, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Sexy's Brine Co.",
    description: "Small-batch artisan preserved foods. Brined to Perfection.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bigsexysbrineco.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${body.variable} ${heading.variable} antialiased`}>
        <LocalBusinessJsonLd />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
