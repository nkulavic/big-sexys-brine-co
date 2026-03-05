import { Container } from "@/components/layout/Container";
import { getClassInfo } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, BookOpen, Clock, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn to Preserve",
  description:
    "Join Big Sexy's hands-on preservation workshop. Learn the art and science of brining in a 4-hour class. $125 per person. Wheat Ridge, CO.",
};

export default function LearnToPreservePage() {
  const classInfo = getClassInfo();

  return (
    <section className="pt-28 pb-24">
      <Container>
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 mb-4">
            Workshop
          </Badge>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-brand-cream">
            {classInfo.title}
          </h1>
          <p className="mt-4 text-brand-cream/60 text-lg leading-relaxed">
            {classInfo.description}
          </p>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            {
              icon: DollarSign,
              label: "Price",
              value: `$${classInfo.price}`,
            },
            {
              icon: Clock,
              label: "Duration",
              value: classInfo.duration,
            },
            {
              icon: Users,
              label: "Class Size",
              value: `Max ${classInfo.maxStudents}`,
            },
            {
              icon: BookOpen,
              label: "Level",
              value: "All Levels",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-card border border-brand-brown/20 rounded-xl p-6 text-center space-y-2"
            >
              <item.icon size={28} className="mx-auto text-brand-orange" />
              <p className="text-sm text-brand-cream/50">{item.label}</p>
              <p className="font-display text-xl font-bold text-brand-cream">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What You'll Learn */}
          <div className="bg-card border border-brand-brown/20 rounded-xl p-8">
            <h2 className="font-display text-2xl font-bold text-brand-cream mb-6">
              What You&apos;ll Learn
            </h2>
            <ul className="space-y-3">
              {classInfo.whatYouLearn.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-brand-green mt-0.5 shrink-0"
                  />
                  <span className="text-brand-cream/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What You'll Get */}
          <div className="bg-card border border-brand-brown/20 rounded-xl p-8">
            <h2 className="font-display text-2xl font-bold text-brand-cream mb-6">
              What You&apos;ll Get
            </h2>
            <ul className="space-y-3">
              {classInfo.whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check
                    size={20}
                    className="text-brand-orange mt-0.5 shrink-0"
                  />
                  <span className="text-brand-cream/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-brand-brown/20 my-16" />

        {/* Booking CTA */}
        <div className="bg-gradient-to-br from-brand-orange/10 to-brand-gold/10 border border-brand-orange/20 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-cream mb-4">
            Ready to Learn the Art of the Brine?
          </h2>
          <p className="text-brand-cream/60 text-lg mb-8 max-w-xl mx-auto">
            Spots are limited to {classInfo.maxStudents} students per class.
            Reach out to book your seat.
          </p>
          <Link
            href="/contact?subject=class"
            className="inline-flex items-center px-8 py-4 bg-brand-orange text-white text-lg font-semibold rounded-full hover:bg-brand-orange/90 transition-colors"
          >
            Book Your Spot — ${classInfo.price}
          </Link>
          <p className="mt-4 text-sm text-brand-cream/40">
            Have questions? Email us at bigsexysbrineco@gmail.com
          </p>
        </div>
      </Container>
    </section>
  );
}
