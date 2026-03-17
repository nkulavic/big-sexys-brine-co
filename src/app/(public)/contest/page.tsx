import { Container } from "@/components/layout/Container";
import { ContestForm } from "@/components/forms/ContestForm";
import { Badge } from "@/components/ui/badge";
import { Trophy, Gift } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Win a Free Jar of Pickles",
  description:
    "Submit your best pickle pun and win a free jar of Big Sexy's pickles — your choice of flavor! Enter the Pickle Pun Contest now.",
  openGraph: {
    title: "Win a Free Jar | Big Sexy's Brine Co.",
    description: "Submit your best pickle pun and win a free jar of pickles — your choice of flavor!",
    images: [{ url: "/images/logo/logo-transparent.png" }],
  },
};

export default function ContestPage() {
  return (
    <section className="pt-28 pb-24">
      <Container>
        <div className="text-center mb-12">
          <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 mb-4">
            Pickle Pun Contest
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cream">
            Win a Free Jar of Pickles
          </h1>
          <p className="mt-4 text-brand-cream/60 max-w-2xl mx-auto text-lg">
            Think you&apos;re a big dill? Prove it. Submit your best pickle pun
            and you could win a free jar of Big Sexy&apos;s — your choice of flavor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-3 bg-card border border-brand-brown/20 rounded-xl p-6 sm:p-8 relative">
            <ContestForm />
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-brand-brown/20 rounded-xl p-6 space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10">
                <Trophy size={24} className="text-brand-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-cream">
                How It Works
              </h3>
              <ul className="space-y-3 text-brand-cream/70">
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange font-bold shrink-0">1.</span>
                  Drop your best pickle pun in the form
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange font-bold shrink-0">2.</span>
                  We read every single one (and laugh a lot)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-orange font-bold shrink-0">3.</span>
                  The best pun wins a free jar — your choice
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-brand-orange/10 to-brand-gold/10 border border-brand-orange/20 rounded-xl p-6 space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-orange/10">
                <Gift size={24} className="text-brand-orange" />
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-cream">
                The Prize
              </h3>
              <p className="text-brand-cream/70">
                One free jar of Big Sexy&apos;s pickles — any flavor from our
                lineup. Winner picks their favorite. We ship it to your door.
              </p>
            </div>

            <div className="bg-card border border-brand-brown/20 rounded-xl p-6 text-center">
              <p className="text-sm text-brand-cream/50 italic">
                &ldquo;I&apos;m kind of a big dill.&rdquo; — See? It&apos;s that easy.
                Now you try.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
