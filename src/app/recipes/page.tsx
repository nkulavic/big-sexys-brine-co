import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Clock, ChefHat, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Recipes and tips from Big Sexy's Brine Co. Learn how to use our preserved foods in your cooking, plus preservation tips and tricks.",
};

const recipes = [
  {
    slug: "spicy-bloody-mary",
    title: "Big Sexy's Spicy Bloody Mary",
    description:
      "The ultimate brunch cocktail featuring our spicy brine, dilly bean garnish, and a kick of heat that'll wake you right up.",
    prepTime: "5 min",
    difficulty: "Easy",
    tags: ["Cocktails", "Brunch"],
  },
  {
    slug: "cowboy-candy-cream-cheese",
    title: "Cowboy Candy Cream Cheese Dip",
    description:
      "A crowd-pleasing appetizer that takes 2 minutes to make. Cream cheese topped with our cowboy candy and served with crackers.",
    prepTime: "2 min",
    difficulty: "Easy",
    tags: ["Appetizers", "Quick"],
  },
  {
    slug: "escabeche-tacos",
    title: "Street Tacos with Escabeche",
    description:
      "Authentic street-style tacos topped with our tangy escabeche for the perfect crunch and acidity.",
    prepTime: "20 min",
    difficulty: "Medium",
    tags: ["Main Course", "Mexican"],
  },
];

export default function RecipesPage() {
  return (
    <section className="pt-28 pb-24">
      <Container>
        <div className="text-center mb-12">
          <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20 mb-4">
            From Our Kitchen
          </Badge>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-brand-cream">
            Recipes
          </h1>
          <p className="mt-4 text-brand-cream/60 max-w-2xl mx-auto text-lg">
            Creative ways to use Big Sexy&apos;s products in your kitchen. From
            quick snacks to show-stopping mains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <article
              key={recipe.slug}
              className="bg-card border border-brand-brown/20 rounded-xl overflow-hidden hover:border-brand-orange/30 transition-colors group"
            >
              <div className="aspect-video bg-brand-brown/10 flex items-center justify-center">
                <ChefHat size={48} className="text-brand-cream/10" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs border-brand-brown/30 text-brand-cream/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="font-display text-xl font-semibold text-brand-cream group-hover:text-brand-orange transition-colors">
                  {recipe.title}
                </h2>
                <p className="text-sm text-brand-cream/60 leading-relaxed">
                  {recipe.description}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4 text-xs text-brand-cream/40">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {recipe.prepTime}
                    </span>
                    <span>{recipe.difficulty}</span>
                  </div>
                  <span className="text-brand-orange text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 bg-card border border-brand-brown/20 rounded-xl p-8 sm:p-12 text-center">
          <h2 className="font-display text-2xl font-bold text-brand-cream mb-3">
            More Recipes Coming Soon
          </h2>
          <p className="text-brand-cream/60 max-w-xl mx-auto">
            We&apos;re always cooking up new ways to use our products. Check
            back soon for more recipes, or follow us on Instagram for cooking
            inspiration.
          </p>
          <Link
            href="/learn-to-preserve"
            className="inline-flex items-center gap-2 mt-6 text-brand-orange hover:text-brand-gold font-semibold transition-colors"
          >
            Want to learn preservation? Join a class
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
