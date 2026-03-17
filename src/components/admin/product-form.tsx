"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { createProduct, updateProduct } from "@/app/admin/actions";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";

const categories = [
  "Signature",
  "Non-Spicy",
  "Spicy",
  "Garlic",
  "Sweet Heat",
  "Traditional",
  "Specialty",
];

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
}

export function ProductForm({ product }: ProductFormProps) {
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
  const [category, setCategory] = useState(product?.category ?? categories[0]);
  const [imageUrl, setImageUrl] = useState<string | null>(
    product?.image_url ?? null
  );
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      name,
      slug,
      size,
      tagline,
      description,
      ingredients: ingredients.filter((i) => i.trim() !== ""),
      heat,
      category,
      image_url: imageUrl,
      featured,
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

  const addIngredient = () => setIngredients([...ingredients, ""]);
  const removeIngredient = (index: number) =>
    setIngredients(ingredients.filter((_, i) => i !== index));
  const updateIngredient = (index: number, value: string) =>
    setIngredients(ingredients.map((ing, i) => (i === index ? value : ing)));

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

          <div className="grid gap-4 sm:grid-cols-2">
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
              <Label htmlFor="category">Category</Label>
              <Select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
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
        <CardContent className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder="Ingredient"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeIngredient(index)}
                className="text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
            <Plus className="mr-2 h-4 w-4" />
            Add Ingredient
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Image</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
          <div className="mt-2">
            <Label htmlFor="image_url_manual" className="text-xs text-muted-foreground">
              Or enter URL manually
            </Label>
            <Input
              id="image_url_manual"
              value={imageUrl ?? ""}
              onChange={(e) => setImageUrl(e.target.value || null)}
              placeholder="/images/products/my-product.jpg"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
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
