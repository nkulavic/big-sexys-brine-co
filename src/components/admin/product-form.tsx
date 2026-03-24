"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ProductImageGallery,
  type ProductImage,
} from "@/components/admin/product-image-gallery";
import { SortableFormList } from "@/components/admin/sortable-form-list";
import { createProduct, updateProduct } from "@/app/admin/actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  slug: string;
  sort_order: number;
}

interface ProductFormProps {
  product?: {
    id: number;
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
  };
  categories: Category[];
  initialCategoryIds?: number[];
  initialImages?: ProductImage[];
}

export function ProductForm({
  product,
  categories,
  initialCategoryIds = [],
  initialImages = [],
}: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [size, setSize] = useState(product?.size ?? "");
  const [tagline, setTagline] = useState(product?.tagline ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [ingredients, setIngredients] = useState<string[]>(
    product?.ingredients ?? [""]
  );
  const [heat, setHeat] = useState(product?.heat ?? 0);
  const [selectedCategoryIds, setSelectedCategoryIds] =
    useState<number[]>(initialCategoryIds);
  const [images, setImages] = useState<ProductImage[]>(initialImages);
  const [featured, setFeatured] = useState(product?.featured ?? false);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!product) {
      setSlug(generateSlug(value));
    }
  };

  const toggleCategory = (id: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Use the first selected category name as the primary category (for backward compat)
    const primaryCategory =
      categories.find((c) => selectedCategoryIds.includes(c.id))?.name ??
      categories[0]?.name ??
      "Signature";

    // Get primary image URL from gallery
    const primaryImage =
      images.find((img) => img.is_primary) ?? images[0] ?? null;

    const data = {
      name,
      slug,
      size,
      tagline,
      description,
      ingredients: ingredients.filter((i) => i.trim() !== ""),
      heat,
      category: primaryCategory,
      category_ids: selectedCategoryIds,
      image_url: primaryImage?.url ?? null,
      featured,
      images: images.map((img) => ({
        url: img.url,
        alt: img.alt,
        sort_order: img.sort_order,
        is_primary: img.is_primary,
      })),
    };

    try {
      if (product) {
        await updateProduct(product.id, data);
        toast.success("Product updated");
      } else {
        await createProduct(data);
        toast.success("Product created");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save product"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              placeholder='e.g., 32oz (1QT)'
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <p className="text-xs text-muted-foreground">
              Select one or more categories for this product.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium border transition-colors cursor-pointer",
                    selectedCategoryIds.includes(cat.id)
                      ? "bg-brand-orange text-white border-brand-orange"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {selectedCategoryIds.length === 0 && (
              <p className="text-xs text-destructive mt-1">
                Please select at least one category.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe this product..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="heat">Heat Level (0-5)</Label>
              <Input
                id="heat"
                type="number"
                min={0}
                max={5}
                value={heat}
                onChange={(e) => setHeat(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch checked={featured} onCheckedChange={setFeatured} />
              <Label>Featured product</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <SortableFormList
            items={ingredients}
            onChange={setIngredients}
            placeholder="Ingredient"
            addLabel="Add Ingredient"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
          <p className="text-sm text-muted-foreground">
            Upload multiple images for this product. Drag to reorder. The primary
            image will be used as the main display image.
          </p>
        </CardHeader>
        <CardContent>
          <ProductImageGallery images={images} onChange={setImages} />
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving || selectedCategoryIds.length === 0}>
          {saving ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
