import { Container } from "@/components/layout/Container";
import { HeatIndicator } from "@/components/products/HeatIndicator";
import { getProducts, getProductBySlug } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getProducts().map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const product = getProductBySlug(slug);
    if (!product) return { title: "Product Not Found" };
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: `${product.name} | Big Sexy's Brine Co.`,
        description: product.description,
      },
    };
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const allProducts = getProducts();
  const currentIndex = allProducts.findIndex((p) => p.slug === slug);
  const prevProduct = currentIndex > 0 ? allProducts[currentIndex - 1] : null;
  const nextProduct =
    currentIndex < allProducts.length - 1 ? allProducts[currentIndex + 1] : null;

  return (
    <section className="pt-28 pb-24">
      <Container>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-brand-cream/60 hover:text-brand-orange transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square relative rounded-2xl overflow-hidden border border-brand-brown/20 bg-card">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <Badge className="absolute top-4 right-4 bg-brand-orange text-white text-sm border-0 z-10">
              {product.size}
            </Badge>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge
                variant="outline"
                className="border-brand-green/40 text-brand-green mb-3"
              >
                {product.category}
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-cream">
                {product.name}
              </h1>
              <p className="mt-2 text-xl text-brand-cream/60 italic font-display">
                {product.tagline}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-brand-cream/60">Heat Level:</span>
              <HeatIndicator level={product.heat} size={20} />
            </div>

            <Separator className="bg-brand-brown/30" />

            <div>
              <h2 className="font-display text-xl font-semibold text-brand-cream mb-3">
                About This Product
              </h2>
              <p className="text-brand-cream/70 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-brand-cream mb-3">
                Ingredients
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="outline"
                    className="border-brand-brown/40 text-brand-cream/70"
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="bg-brand-brown/30" />

            <div className="bg-card border border-brand-brown/20 rounded-xl p-6 space-y-4">
              <h3 className="font-display text-lg font-semibold text-brand-cream">
                Want to Order?
              </h3>
              <p className="text-sm text-brand-cream/60">
                Contact us for custom orders, bulk pricing, or to find out which
                markets we&apos;ll be at next.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange/90 transition-colors"
                >
                  Inquire Now
                </Link>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center px-6 py-3 border border-brand-cream/30 text-brand-cream font-semibold rounded-full hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  Find Us at a Market
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Previous/Next */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-brand-brown/20">
          {prevProduct ? (
            <Link
              href={`/products/${prevProduct.slug}`}
              className="flex items-center gap-2 text-brand-cream/60 hover:text-brand-orange transition-colors"
            >
              <ArrowLeft size={16} />
              {prevProduct.name}
            </Link>
          ) : (
            <div />
          )}
          {nextProduct ? (
            <Link
              href={`/products/${nextProduct.slug}`}
              className="flex items-center gap-2 text-brand-cream/60 hover:text-brand-orange transition-colors"
            >
              {nextProduct.name}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Container>
    </section>
  );
}
