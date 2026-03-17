import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Product, Event, ClassInfo, Testimonial } from "@/types";

// Fallback to JSON files if Supabase is not configured
const useSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

// Use a direct Supabase client (no cookies) for data fetching.
// This avoids the "cookies was called outside a request scope" error
// during static generation (generateStaticParams / generateMetadata).
function getSupabase() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );
}

// Products
export async function getProducts(): Promise<Product[]> {
  if (!useSupabase) {
    const data = (await import("@/content/products.json")).default;
    return data as Product[];
  }
  const supabase = getSupabase();
  const { data } = await supabase.from("products").select("*").order("id");
  return (data ?? []).map(mapProduct);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  if (!useSupabase) {
    const data = (await import("@/content/products.json")).default;
    return (data as Product[]).find((p) => p.slug === slug);
  }
  const supabase = getSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();
  return data ? mapProduct(data) : undefined;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!useSupabase) {
    const data = (await import("@/content/products.json")).default;
    return (data as Product[]).filter((p) => p.featured);
  }
  const supabase = getSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("id");
  return (data ?? []).map(mapProduct);
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  if (category === "All") return getProducts();
  if (!useSupabase) {
    const data = (await import("@/content/products.json")).default;
    return (data as Product[]).filter((p) => p.category === category);
  }
  const supabase = getSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("id");
  return (data ?? []).map(mapProduct);
}

export async function getProductCategories(): Promise<string[]> {
  const products = await getProducts();
  const categories = new Set(products.map((p) => p.category));
  return ["All", ...Array.from(categories)];
}

// Events
export async function getEvents(): Promise<Event[]> {
  if (!useSupabase) {
    const data = (await import("@/content/events.json")).default;
    return (data as Event[]).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }
  const supabase = getSupabase();
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });
  return (data ?? []) as Event[];
}

export async function getUpcomingEvents(): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  return events.filter((e) => new Date(e.date) >= now);
}

export async function getPastEvents(): Promise<Event[]> {
  const events = await getEvents();
  const now = new Date();
  return events.filter((e) => new Date(e.date) < now);
}

// Class Info
export async function getClassInfo(): Promise<ClassInfo> {
  if (!useSupabase) {
    const data = (await import("@/content/class.json")).default;
    return data as ClassInfo;
  }
  const supabase = getSupabase();
  const { data } = await supabase
    .from("class_info")
    .select("*")
    .eq("id", 1)
    .single();
  if (!data) {
    const fallback = (await import("@/content/class.json")).default;
    return fallback as ClassInfo;
  }
  return {
    title: data.title,
    price: Number(data.price),
    duration: data.duration,
    description: data.description,
    whatYouLearn: data.what_you_learn,
    whatYouGet: data.what_you_get,
    maxStudents: data.max_students,
  };
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!useSupabase) {
    const data = (await import("@/content/testimonials.json")).default;
    return data as Testimonial[];
  }
  const supabase = getSupabase();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("id");
  return (data ?? []) as Testimonial[];
}

// Helper to map Supabase product row to Product type
function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as number,
    name: row.name as string,
    slug: row.slug as string,
    size: row.size as string,
    tagline: row.tagline as string,
    description: row.description as string,
    ingredients: row.ingredients as string[],
    heat: row.heat as number,
    category: row.category as Product["category"],
    image: (row.image_url as string) ?? (row.image as string) ?? "",
    featured: row.featured as boolean | undefined,
  };
}
