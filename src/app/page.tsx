import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { getFeaturedProducts, getUpcomingEvents, getTestimonials } from "@/lib/data";
import { Calendar, MapPin, ArrowRight, Quote, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const upcomingEvents = getUpcomingEvents().slice(0, 3);
  const testimonials = getTestimonials();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden texture-grain">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/95 to-brand-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange/10 via-transparent to-transparent" />
        <Container className="relative z-10 py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-orange/20 rounded-full blur-3xl" />
              <Image
                src="/images/logo/logo-transparent.png"
                alt="Big Sexy's Brine Co."
                width={280}
                height={280}
                className="relative rounded-full shadow-2xl shadow-brand-orange/20"
                priority
              />
            </div>
            <div className="space-y-4 max-w-3xl">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-brand-cream leading-tight">
                Brined to{" "}
                <span className="text-gradient">Perfection</span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-cream/70 max-w-2xl mx-auto leading-relaxed">
                Small-batch artisan preserved foods handcrafted with passion in
                Wheat Ridge, Colorado. 18 unique varieties of bold, flavorful goodness.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange/90 transition-all hover:scale-105 text-lg"
              >
                Explore Products
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-cream/30 text-brand-cream font-semibold rounded-full hover:border-brand-orange hover:text-brand-orange transition-all text-lg"
              >
                Our Story
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-brand-black texture-grain">
        <Container>
          <div className="text-center mb-12">
            <Badge className="bg-brand-orange/10 text-brand-orange border-brand-orange/20 mb-4">
              Featured Products
            </Badge>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-cream">
              Fan Favorites
            </h2>
            <p className="mt-4 text-brand-cream/60 max-w-2xl mx-auto">
              Our most popular jars — each one handcrafted with the freshest
              ingredients and Big Sexy&apos;s signature spice blends.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-gold font-semibold transition-colors"
            >
              View All 18 Varieties
              <ArrowRight size={18} />
            </Link>
          </div>
        </Container>
      </section>

      {/* Brand Story Teaser */}
      <section className="py-24 bg-gradient-to-b from-brand-black to-brand-brown/20 texture-grain">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20">
                Our Story
              </Badge>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-cream leading-tight">
                Born from Resilience,{" "}
                <span className="text-gradient">Built with Heart</span>
              </h2>
              <div className="space-y-4 text-brand-cream/70 leading-relaxed">
                <p>
                  Big Sexy&apos;s Brine Co. was born from resilience, recovery, and a
                  damn good recipe. Every jar you buy doesn&apos;t just pack a punch of
                  flavor — it supports a family and the second chance that was
                  hard-earned.
                </p>
                <p className="font-display text-xl text-brand-cream italic">
                  &ldquo;Grab a jar. Support a dream. Taste the comeback.&rdquo;
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-brand-orange hover:text-brand-gold font-semibold transition-colors"
              >
                Read the Full Story
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden border border-brand-brown/30">
                <Image
                  src="/images/gallery/jesse-escabeche.jpg"
                  alt="Big Sexy's Brine Co. founder Jesse Thompson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-orange text-white px-6 py-3 rounded-xl font-display font-bold text-lg shadow-xl">
                Est. 2025
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-brand-black texture-grain">
        <Container>
          <div className="text-center mb-12">
            <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 mb-4">
              Testimonials
            </Badge>
            <h2 className="font-display text-4xl font-bold text-brand-cream">
              What People Are Saying
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="bg-card border border-brand-brown/20 rounded-xl p-6 space-y-4"
              >
                <Quote size={24} className="text-brand-orange/40" />
                <p className="text-brand-cream/80 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-brand-cream">{t.author}</p>
                  {t.product && (
                    <Badge variant="outline" className="text-xs border-brand-orange/30 text-brand-orange/70">
                      {t.product}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-brand-black to-brand-brown/10">
          <Container>
            <div className="text-center mb-12">
              <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 mb-4">
                Events
              </Badge>
              <h2 className="font-display text-4xl font-bold text-brand-cream">
                Find Us Out There
              </h2>
              <p className="mt-4 text-brand-cream/60 max-w-xl mx-auto">
                Catch Big Sexy at markets and festivals across the Denver metro area.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-card border border-brand-brown/20 rounded-xl p-6 space-y-3 hover:border-brand-gold/30 transition-colors"
                >
                  <Badge
                    className={
                      event.type === "festival"
                        ? "bg-brand-orange/10 text-brand-orange border-brand-orange/20"
                        : event.type === "class"
                          ? "bg-brand-green/10 text-brand-green border-brand-green/20"
                          : "bg-brand-gold/10 text-brand-gold border-brand-gold/20"
                    }
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                  <h3 className="font-display text-xl font-semibold text-brand-cream">
                    {event.name}
                  </h3>
                  <div className="space-y-1 text-sm text-brand-cream/60">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-orange font-semibold transition-colors"
              >
                View All Events
                <ArrowRight size={18} />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* Instagram / Social */}
      <section className="py-24 bg-brand-black texture-grain">
        <Container>
          <div className="flex flex-col items-center text-center space-y-6">
            <Instagram size={48} className="text-brand-orange" />
            <h2 className="font-display text-4xl font-bold text-brand-cream">
              Follow the Journey
            </h2>
            <p className="text-brand-cream/60 max-w-xl">
              Follow @bigsexysbrineco on Instagram for behind-the-scenes looks,
              new product drops, market schedules, and more.
            </p>
            <a
              href="https://www.instagram.com/bigsexysbrineco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-orange to-brand-gold text-white font-semibold rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              <Instagram size={20} />
              @bigsexysbrineco
            </a>
            <Image
              src="/images/instagram-qr.png"
              alt="Scan to follow on Instagram"
              width={150}
              height={150}
              className="rounded-xl mt-4 opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
