import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/supabase/auth-guard";
import { ProductForm } from "@/components/admin/product-form";
import { notFound } from "next/navigation";
import type { ProductImage } from "@/components/admin/product-image-gallery";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAuth();
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  const { data: productCategories } = await supabase
    .from("product_categories")
    .select("category_id")
    .eq("product_id", id);

  const initialCategoryIds = (productCategories ?? []).map(
    (pc: { category_id: number }) => pc.category_id
  );

  // Load existing product images
  const { data: productImages } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", id)
    .order("sort_order");

  const initialImages: ProductImage[] = (productImages ?? []).map(
    (img: {
      id: number;
      url: string;
      alt: string | null;
      sort_order: number;
      is_primary: boolean;
    }) => ({
      id: `db-${img.id}`,
      url: img.url,
      alt: img.alt,
      sort_order: img.sort_order,
      is_primary: img.is_primary,
      db_id: img.id,
    })
  );

  // If no product_images exist but there's an image_url, create a single image entry
  // This provides backward compatibility with the old single-image system
  if (initialImages.length === 0 && product.image_url) {
    initialImages.push({
      id: "legacy-0",
      url: product.image_url,
      alt: product.name,
      sort_order: 0,
      is_primary: true,
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Edit Product</h1>
        <p className="text-sm text-muted-foreground">
          Update {product.name}
        </p>
      </div>
      <ProductForm
        product={product}
        categories={categories ?? []}
        initialCategoryIds={initialCategoryIds}
        initialImages={initialImages}
      />
    </div>
  );
}
