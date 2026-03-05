import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Big Sexy's Brine Co. - our products, events, markets, and behind-the-scenes moments.",
};

const galleryImages = [
  { src: "/images/gallery/jesse-with-jars.jpg", alt: "Jesse with a lineup of fresh jars", category: "Behind the Scenes" },
  { src: "/images/gallery/jesse-escabeche.jpg", alt: "Jesse with escabeche and pepper jars", category: "Behind the Scenes" },
  { src: "/images/gallery/kitchen-prep.jpg", alt: "Kitchen prep - fresh ingredients ready for brining", category: "Behind the Scenes" },
  { src: "/images/gallery/pouring-brine.jpg", alt: "Pouring hot brine over fresh escabeche", category: "Process" },
  { src: "/images/gallery/radish-process.jpg", alt: "Hands-on radish brining process", category: "Process" },
  { src: "/images/gallery/radish-closeup.jpg", alt: "Fresh radish slices with peppers before sealing", category: "Products" },
  { src: "/images/gallery/jar-lineup.jpg", alt: "Colorful lineup of pepper and garlic jars", category: "Products" },
  { src: "/images/gallery/mixed-peppers-closeup.jpg", alt: "Mixed peppers close-up - serrano, fresno, habanero", category: "Products" },
  { src: "/images/gallery/onions-garlic-overhead.jpg", alt: "Overhead shot of onion and garlic jars", category: "Products" },
];

export default function GalleryPage() {
  return (
    <section className="pt-28 pb-24">
      <Container>
        <div className="text-center mb-12">
          <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 mb-4">
            Photos
          </Badge>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-brand-cream">
            Gallery
          </h1>
          <p className="mt-4 text-brand-cream/60 max-w-2xl mx-auto text-lg">
            Snapshots from markets, events, and behind the scenes at Big
            Sexy&apos;s Brine Co.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid bg-card border border-brand-brown/20 rounded-xl overflow-hidden group"
            >
              <div className="relative aspect-square">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <p className="text-sm text-brand-cream/60">{img.alt}</p>
                <Badge
                  variant="outline"
                  className="mt-1 text-xs border-brand-brown/20 text-brand-cream/40"
                >
                  {img.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card border border-brand-brown/20 rounded-xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-cream mb-3">
            More Photos Coming Soon
          </h2>
          <p className="text-brand-cream/60 max-w-xl mx-auto">
            We&apos;re constantly adding new photos from markets, events, and
            behind the scenes. Follow us on Instagram for the latest.
          </p>
          <a
            href="https://www.instagram.com/bigsexysbrineco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-brand-orange hover:text-brand-gold font-semibold transition-colors"
          >
            Follow @bigsexysbrineco
          </a>
        </div>
      </Container>
    </section>
  );
}
