import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Flame, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Big Sexy's Brine Co. Born from resilience, recovery, and a damn good recipe. Meet Jesse Thompson, the man behind the brine.",
  openGraph: {
    title: "About | Big Sexy's Brine Co.",
    description: "Born from resilience, recovery, and a damn good recipe. Meet Jesse Thompson, the man behind the brine.",
    images: [{ url: "/images/gallery/jesse-with-jars.jpg" }],
  },
};

const values = [
  {
    icon: Flame,
    title: "Small Batch",
    description:
      "Every jar is handcrafted in small batches. No mass production, no shortcuts. Just quality ingredients and careful attention to every detail.",
  },
  {
    icon: Heart,
    title: "Made with Heart",
    description:
      "This isn't just a business — it's a legacy. Every jar carries the passion, resilience, and heart that built this brand from the ground up.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "From farmers markets to festivals, we believe in showing up, sharing samples, and building real connections with the people who love our products.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 mb-4">
              Our Story
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cream">
              Big Sexy&apos;s Story
            </h1>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-6">
              <p className="text-lg text-brand-cream/80 leading-relaxed">
                Canning started as a survival skill — a &ldquo;prepper&rdquo;
                essential taught to me by a close friend back in 2008. We braved
                the learning curve together, turning out some decent products,
                but it was the spicy green beans that truly hooked me.
              </p>
              <p className="text-lg text-brand-cream/80 leading-relaxed">
                Then, life got heavy. For over a decade, I battled deep
                depression and made choices that pushed my passions to the
                wayside. The jars stopped, but the spark didn&apos;t.
              </p>
              <p className="text-lg text-brand-cream/80 leading-relaxed">
                In 2022, I chose a new path. I started my mental health journey,
                embraced sobriety, and returned to the hobbies that made me feel
                alive — sound design and, of course, the art of the brine. When
                I was laid off in 2025, I didn&apos;t see a dead end; I saw an
                opening. I decided to start building a legacy.
              </p>

              <div className="bg-card border border-brand-orange/20 rounded-xl p-8 my-8">
                <p className="font-display text-2xl sm:text-3xl text-brand-cream italic leading-relaxed">
                  &ldquo;Big Sexy&apos;s Brine Co. was born from resilience,
                  recovery, and a damn good recipe. Every jar you buy
                  doesn&apos;t just pack a punch of flavor — it supports my
                  family and the second chance I&apos;ve worked so hard to
                  build.&rdquo;
                </p>
                <p className="mt-4 text-brand-orange font-semibold">
                  — Jesse Thompson, Founder
                </p>
              </div>

              <p className="text-2xl font-display font-bold text-brand-cream">
                Grab a jar. Support a dream. Taste the comeback.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="sticky top-28 space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-brand-orange/15 rounded-full blur-2xl" />
                    <Image
                      src="/images/logo/logo-transparent.png"
                      alt="Big Sexy's Brine Co."
                      width={200}
                      height={200}
                      className="relative drop-shadow-2xl"
                    />
                  </div>
                </div>
                <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-brand-brown/30">
                  <Image
                    src="/images/gallery/jesse-with-jars.jpg"
                    alt="Jesse Thompson - Big Sexy"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black/80 to-transparent p-6">
                    <p className="font-display text-xl font-bold text-brand-cream">
                      Jesse Thompson
                    </p>
                    <p className="text-brand-cream/60 text-sm">
                      Founder & Head Briner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-b from-brand-black to-brand-brown/10 texture-grain">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-brand-cream">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-brand-brown/20 rounded-xl p-8 text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-orange/10">
                  <value.icon size={28} className="text-brand-orange" />
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-cream">
                  {value.title}
                </h3>
                <p className="text-brand-cream/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Separator className="bg-brand-brown/20" />

      {/* CTA */}
      <section className="py-24 bg-brand-black texture-grain">
        <Container>
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="font-display text-4xl font-bold text-brand-cream">
              Ready to Taste the Difference?
            </h2>
            <p className="text-brand-cream/60 text-lg">
              Explore our full lineup of 18 handcrafted varieties or find us at
              a market near you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange/90 transition-colors"
              >
                Browse Products
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-cream/30 text-brand-cream font-semibold rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                Find Us at Events
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
