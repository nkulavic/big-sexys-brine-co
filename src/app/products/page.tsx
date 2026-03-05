import { Container } from "@/components/layout/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { getProducts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore our full lineup of 18 small-batch artisan preserved foods. From spicy varieties to sweet heat cowboy candy, garlic specialties, and more.",
  openGraph: {
    title: "Products | Big Sexy's Brine Co.",
    description: "Explore our full lineup of 18 small-batch artisan preserved foods.",
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
            18 Varieties
          </Badge>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cream">
            Our Products
          </h1>
          <p className="mt-4 text-brand-cream/60 max-w-2xl mx-auto text-lg">
            Every jar is handcrafted in small batches using the freshest
            ingredients. Bold flavors, no shortcuts.
          </p>
        </div>
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
