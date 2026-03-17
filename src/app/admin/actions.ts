"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
  image_url: string | null;
  featured: boolean;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
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
    image_url: string | null;
    featured: boolean;
  }
) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug}`);
  revalidatePath("/");
}

export async function deleteProduct(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

// Events
export async function createEvent(data: {
  name: string;
  date: string;
  time: string;
  location: string;
  address: string | null;
  type: string;
  description: string | null;
}) {
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
    time: string;
    location: string;
    address: string | null;
    type: string;
    description: string | null;
  }
) {
  const supabase = await createClient();
  const { error } = await supabase.from("events").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

export async function deleteEvent(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath("/events");
}

// Testimonials
export async function createTestimonial(data: {
  quote: string;
  author: string;
  product: string | null;
}) {
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
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(data).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

export async function deleteTestimonial(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
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
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").insert(data);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function updateGalleryOrder(items: { id: number; sort_order: number }[]) {
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
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}
