import { requireAuth } from "@/lib/supabase/auth-guard";
import { createClient } from "@/lib/supabase/server";
import { CategoriesManager } from "./categories-manager";

export default async function CategoriesPage() {
  await requireAuth();
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <p className="text-sm text-muted-foreground">
          Manage product categories. Drag to reorder.
        </p>
      </div>
      <CategoriesManager categories={categories ?? []} />
    </div>
  );
}
