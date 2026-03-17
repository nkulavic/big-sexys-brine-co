import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/supabase/auth-guard";
import { ProductForm } from "@/components/admin/product-form";
import { notFound } from "next/navigation";

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
      />
    </div>
  );
}
