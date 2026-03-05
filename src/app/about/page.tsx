import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Flame, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "The story behind Big Sexy's Brine Co. Born from resilience, recovery, and a damn good recipe. Meet Jesse Thompson, the man behind the brine.",
  openGraph: {
    title: "The Story | Big Sexy's Brine Co.",
    description: "Born from resilience, recovery, and a damn good recipe. Meet Jesse Thompson, the man behind the brine.",
    images: [{ url: "/images/gallery/jesse-with-jars.jpg" }],
  },
};

const values = [
  {
    icon: Flame,
    title: "Small Batch",
    description:
      "We don't do assembly lines. Every jar gets made by hand, in small runs, with ingredients we'd put on our own table. That's the only way we know how to do it.",
  },
  {
    icon: Heart,
    title: "Made with Heart",
    description:
      "This isn't just a business — it's a second chance turned into a legacy. Every jar carries the fight, the comeback, and the love that built this brand from nothing.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We show up. Every market, every festival — we're there with samples, stories, and a handshake. The people who eat our stuff are the reason we keep making it.",
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
              The Man Behind the Brine
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cream">
              The Story
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
                It started in 2008 — a buddy taught me how to can as a
                &ldquo;prepper&rdquo; thing. We fumbled our way through those
                first batches together, and most of it was honestly pretty rough.
                But then we nailed the spicy green beans, and something clicked.
                I was hooked.
              </p>
              <p className="text-lg text-brand-cream/80 leading-relaxed">
                Then life hit hard. Over a decade of depression, bad decisions,
                and pushing away everything I loved. The jars gathered dust. But
                somewhere underneath all of it, the spark never fully went out.
              </p>
              <p className="text-lg text-brand-cream/80 leading-relaxed">
                In 2022, I made the hardest choice of my life — I got sober and
                started rebuilding. I came back to the things that made me feel
                like myself again: sound design, creativity, and the art of the
                brine. When I got laid off in 2025, most people would&apos;ve
                panicked. I saw it as the push I needed. Time to stop dreaming
                and start building.
              </p>

              <div className="bg-card border border-brand-orange/20 rounded-xl p-8 my-8">
                <p className="font-display text-2xl sm:text-3xl text-brand-cream italic leading-relaxed">
                  &ldquo;Every jar you grab isn&apos;t just food — it&apos;s
                  proof that hitting rock bottom doesn&apos;t have to be the
                  end of the story. You&apos;re supporting my family, my
                  recovery, and the dream I almost gave up on.&rdquo;
                </p>
                <p className="mt-4 text-brand-orange font-semibold">
                  — Jesse Thompson, Founder
                </p>
              </div>

              <p className="text-2xl font-display font-bold text-brand-cream">
                That&apos;s the story. Now grab a jar and taste what a second chance is made of.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-brand-brown/30 sticky top-28">
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
              Now You Know the Story. Try the Jars.
            </h2>
            <p className="text-brand-cream/60 text-lg">
              18 handcrafted varieties, each one made with the same fire that
              built this brand. Come find your favorite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange/90 transition-colors"
              >
                See the Lineup
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-cream/30 text-brand-cream font-semibold rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                Catch Us at a Market
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
