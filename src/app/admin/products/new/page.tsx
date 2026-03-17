import { requireAuth } from "@/lib/supabase/auth-guard";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">New Product</h1>
        <p className="text-sm text-muted-foreground">
          Add a new product to the catalog
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
