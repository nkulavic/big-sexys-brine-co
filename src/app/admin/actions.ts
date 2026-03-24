"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAuthAction } from "@/lib/supabase/auth-guard";
import { revalidatePath } from "next/cache";
import { revalidateTag } from "next/cache";

/**
 * Revalidate all product-related pages and caches.
 * Uses both revalidatePath (for route cache) and revalidateTag (for data cache).
 */
function revalidateProducts(slug?: string) {
  // Revalidate the full route tree for products
  revalidatePath("/", "layout");
  revalidatePath("/products", "layout");
  revalidatePath("/admin/products", "layout");
  if (slug) {
    revalidatePath(`/products/${slug}`, "page");
  }
  // Revalidate data cache tags
  revalidateTag("products", { expire: 0 });
  revalidateTag("product-images", { expire: 0 });
}

// Categories
export async function createCategory(data: { name: string }) {
  await requireAuthAction();
  const supabase = await createClient();
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const { data: maxOrder } = await supabase
    .from("categories")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();
  const sort_order = (maxOrder?.sort_order ?? -1) + 1;
  const { error } = await supabase
    .from("categories")
    .insert({ name: data.name, slug, sort_order });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidateProducts();
}

export async function updateCategory(
  id: number,
  data: { name: string }
) {
  await requireAuthAction();
  const supabase = await createClient();
  const slug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const { error } = await supabase
    .from("categories")
    .update({ name: data.name, slug })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidateProducts();
}

export async function deleteCategory(id: number) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/categories");
  revalidateProducts();
}

export async function updateCategoryOrder(
  items: { id: number; sort_order: number }[]
) {
  await requireAuthAction();
  const supabase = await createClient();
  for (const item of items) {
    const { error } = await supabase
      .from("categories")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/categories");
  revalidateProducts();
}

// Products
export async function createProduct(data: {
  name: string;
  slug: string;
  size: string;
  tagline: string;
  description: string;
  ingredients: string[];
  heat: number;
  category: string;
  category_ids: number[];
  image_url: string | null;
  featured: boolean;
  images?: { url: string; alt: string | null; sort_order: number; is_primary: boolean }[];
}) {
  await requireAuthAction();
  const supabase = await createClient();
  const { category_ids, images, ...productData } = data;

  // If we have gallery images, use the primary image as image_url
  if (images && images.length > 0) {
    const primary = images.find((img) => img.is_primary) ?? images[0];
    productData.image_url = primary.url;
  }

  const { data: inserted, error } = await supabase
    .from("products")
    .insert(productData)
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  // Insert category associations
  if (category_ids.length > 0) {
    const { error: catError } = await supabase
      .from("product_categories")
      .insert(category_ids.map((cid) => ({ product_id: inserted.id, category_id: cid })));
    if (catError) throw new Error(catError.message);
  }

  // Insert product images
  if (images && images.length > 0) {
    const { error: imgError } = await supabase.from("product_images").insert(
      images.map((img) => ({
        product_id: inserted.id,
        url: img.url,
        alt: img.alt,
        sort_order: img.sort_order,
        is_primary: img.is_primary,
      }))
    );
    if (imgError) throw new Error(imgError.message);
  }

  revalidateProducts(data.slug);
}

export async function updateProduct(
  id: number,
  data: {
    name: string;
    slug: string;
    size: string;
    tagline: string;
    description: string;
    ingredients: string[];
    heat: number;
    category: string;
    category_ids: number[];
    image_url: string | null;
    featured: boolean;
    images?: { url: string; alt: string | null; sort_order: number; is_primary: boolean }[];
  }
) {
  await requireAuthAction();
  const supabase = await createClient();
  const { category_ids, images, ...productData } = data;

  // If we have gallery images, use the primary image as image_url
  if (images && images.length > 0) {
    const primary = images.find((img) => img.is_primary) ?? images[0];
    productData.image_url = primary.url;
  }

  const { error } = await supabase.from("products").update(productData).eq("id", id);
  if (error) throw new Error(error.message);

  // Replace category associations
  await supabase.from("product_categories").delete().eq("product_id", id);
  if (category_ids.length > 0) {
    const { error: catError } = await supabase
      .from("product_categories")
      .insert(category_ids.map((cid) => ({ product_id: id, category_id: cid })));
    if (catError) throw new Error(catError.message);
  }

  // Replace product images
  if (images !== undefined) {
    await supabase.from("product_images").delete().eq("product_id", id);
    if (images.length > 0) {
      const { error: imgError } = await supabase.from("product_images").insert(
        images.map((img) => ({
          product_id: id,
          url: img.url,
          alt: img.alt,
          sort_order: img.sort_order,
          is_primary: img.is_primary,
        }))
      );
      if (imgError) throw new Error(imgError.message);
    }
  }

  revalidateProducts(data.slug);
}

export async function deleteProduct(id: number) {
  await requireAuthAction();
  const supabase = await createClient();
  // product_images will cascade delete due to ON DELETE CASCADE
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateProducts();
}

export async function updateProductOrder(items: { id: number; sort_order: number }[]) {
  await requireAuthAction();
  const supabase = await createClient();
  for (const item of items) {
    const { error } = await supabase
      .from("products")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);
    if (error) throw new Error(error.message);
  }
  revalidateProducts();
}

// Events
export async function createEvent(data: {
  name: string;
  date: string;
  end_date: string | null;
  is_recurring: boolean;
  recurrence_day: string | null;
  time: string;
  location: string;
  address: string | null;
  type: string;
  description: string | null;
}) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("events").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function updateEvent(
  id: number,
  data: {
    name: string;
    date: string;
    end_date: string | null;
    is_recurring: boolean;
    recurrence_day: string | null;
    time: string;
    location: string;
    address: string | null;
    type: string;
    description: string | null;
  }
) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("events").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function deleteEvent(id: number) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function updateEventOrder(items: { id: number; sort_order: number }[]) {
  await requireAuthAction();
  const supabase = await createClient();
  for (const item of items) {
    const { error } = await supabase
      .from("events")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

// Testimonials
export async function createTestimonial(data: {
  quote: string;
  author: string;
  product: string | null;
}) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function updateTestimonial(
  id: number,
  data: {
    quote: string;
    author: string;
    product: string | null;
  }
) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: number) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function updateTestimonialOrder(items: { id: number; sort_order: number }[]) {
  await requireAuthAction();
  const supabase = await createClient();
  for (const item of items) {
    const { error } = await supabase
      .from("testimonials")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

// Class Info
export async function updateClassInfo(data: {
  title: string;
  price: number;
  duration: string;
  description: string;
  what_you_learn: string[];
  what_you_get: string[];
  max_students: number;
}) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("class_info").update(data).eq("id", 1);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/class");
  revalidatePath("/learn-to-preserve");
}

// Gallery
export async function createGalleryImage(data: {
  url: string;
  alt: string | null;
  sort_order: number;
}) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function updateGalleryOrder(items: { id: number; sort_order: number }[]) {
  await requireAuthAction();
  const supabase = await createClient();
  for (const item of items) {
    const { error } = await supabase
      .from("gallery_images")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(id: number) {
  await requireAuthAction();
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
