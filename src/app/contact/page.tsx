import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Instagram } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Say Hello",
  description:
    "Get in touch with Big Sexy's Brine Co. for orders, wholesale inquiries, event bookings, or just to say hello. Wheat Ridge, CO.",
  openGraph: {
    title: "Say Hello | Big Sexy's Brine Co.",
    description: "Orders, wholesale, events, or just want to talk about jars — we'd love to hear from you.",
    images: [{ url: "/images/logo/logo-transparent.png" }],
  },
};

export default function ContactPage() {
  return (
    <section className="pt-28 pb-24">
      <Container>
        <div className="text-center mb-12">
          <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20 mb-4">
            We&apos;d Love to Hear From You
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cream">
            Say Hello
          </h1>
          <p className="mt-4 text-brand-cream/60 max-w-2xl mx-auto text-lg">
            Questions, custom orders, wholesale, or just want to talk about
            jars — drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3 bg-card border border-brand-brown/20 rounded-xl p-6 sm:p-8 relative">
            <ContactForm />
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card border border-brand-brown/20 rounded-xl p-6 space-y-6">
              <h3 className="font-display text-xl font-semibold text-brand-cream">
                Other Ways to Reach Us
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:bigsexysbrineco@gmail.com"
                  className="flex items-center gap-3 text-brand-cream/70 hover:text-brand-orange transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-cream/50">Email</p>
                    <p className="font-medium">bigsexysbrineco@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-brand-cream/70">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-cream/50">Location</p>
                    <p className="font-medium">Wheat Ridge, Colorado</p>
                  </div>
                </div>

                <a
                  href="https://www.instagram.com/bigsexysbrineco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-brand-cream/70 hover:text-brand-orange transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                    <Instagram size={18} className="text-brand-green" />
                  </div>
                  <div>
                    <p className="text-sm text-brand-cream/50">Instagram</p>
                    <p className="font-medium">@bigsexysbrineco</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-card border border-brand-brown/20 rounded-xl p-6 text-center space-y-4">
              <h3 className="font-display text-lg font-semibold text-brand-cream">
                Follow Us
              </h3>
              <Image
                src="/images/instagram-qr.png"
                alt="Scan to follow on Instagram"
                width={120}
                height={120}
                className="mx-auto rounded-lg"
              />
              <p className="text-xs text-brand-cream/40">
                Scan to follow on Instagram
              </p>
            </div>

            <div className="bg-gradient-to-br from-brand-orange/10 to-brand-gold/10 border border-brand-orange/20 rounded-xl p-6 text-center">
              <h3 className="font-display text-lg font-semibold text-brand-cream mb-2">
                Custom Orders
              </h3>
              <p className="text-sm text-brand-cream/60">
                Need bulk orders for an event, restaurant, or gift? We do custom
                orders with personalized labels available.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
