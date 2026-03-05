import productsData from "@/content/products.json";
import eventsData from "@/content/events.json";
import classData from "@/content/class.json";
import testimonialsData from "@/content/testimonials.json";
import type { Product, Event, ClassInfo, Testimonial } from "@/types";

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return (productsData as Product[]).find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return (productsData as Product[]).filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return productsData as Product[];
  return (productsData as Product[]).filter((p) => p.category === category);
}

export function getProductCategories(): string[] {
  const categories = new Set((productsData as Product[]).map((p) => p.category));
  return ["All", ...Array.from(categories)];
}

export function getEvents(): Event[] {
  return (eventsData as Event[]).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return getEvents().filter((e) => new Date(e.date) >= now);
}

export function getPastEvents(): Event[] {
  const now = new Date();
  return getEvents().filter((e) => new Date(e.date) < now);
}

export function getClassInfo(): ClassInfo {
  return classData as ClassInfo;
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}
