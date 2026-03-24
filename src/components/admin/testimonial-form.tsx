"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createTestimonial, updateTestimonial } from "@/app/admin/actions";
import { toast } from "sonner";

interface TestimonialFormProps {
  testimonial?: {
    id: number;
    quote: string;
    author: string;
    product: string | null;
  };
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [quote, setQuote] = useState(testimonial?.quote ?? "");
  const [author, setAuthor] = useState(testimonial?.author ?? "");
  const [product, setProduct] = useState(testimonial?.product ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      quote,
      author,
      product: product || null,
    };

    try {
      if (testimonial) {
        await updateTestimonial(testimonial.id, data);
        toast.success("Testimonial updated");
      } else {
        await createTestimonial(data);
        toast.success("Testimonial created");
      }
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to save testimonial"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Testimonial Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Quote</Label>
            <RichTextEditor
              value={quote}
              onChange={setQuote}
              placeholder="Enter the testimonial quote..."
              minimal
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Jane D."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="product">Product (optional)</Label>
              <Input
                id="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Spicy Pickles"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving
            ? "Saving..."
            : testimonial
              ? "Update Testimonial"
              : "Create Testimonial"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/testimonials")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
