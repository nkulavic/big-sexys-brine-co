import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Lineup",
  description:
    "18 handcrafted varieties of bold, brined goodness. From spicy to sweet heat, garlic obsessions to traditional escabeche — find your new favorite jar.",
  openGraph: {
    title: "The Lineup | Big Sexy's Brine Co.",
    description: "18 handcrafted varieties of bold, brined goodness. Find your new favorite jar.",
    images: [{ url: "/images/gallery/jar-lineup.jpg" }],
  },
};

export default function ProductsPage() {
  const products = getProducts();

  return (
    <section className="pt-28 pb-24">
      <Container>
        <div className="text-center mb-12">
          <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20 mb-4">
            18 Varieties &amp; Counting
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cream">
            The Lineup
          </h1>
          <p className="mt-4 text-brand-cream/60 max-w-2xl mx-auto text-lg">
            Every jar is handcrafted in small batches. No shortcuts, no filler —
            just bold flavors and the freshest ingredients we can get our hands on.
          </p>
        </div>
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
