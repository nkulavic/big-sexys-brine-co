"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Quote } from "lucide-react";
import { TestimonialDeleteButton } from "./testimonial-delete-button";
import { SortableList } from "@/components/admin/sortable-list";
import { updateTestimonialOrder } from "../actions";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  product: string | null;
  sort_order: number;
  created_at: string;
}

export function TestimonialsSortableList({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <SortableList
      items={testimonials}
      onReorder={updateTestimonialOrder}
      renderItem={(testimonial) => (
        <div className="flex items-start gap-3 py-2 pr-3">
          <Quote className="h-5 w-5 shrink-0 text-brand-orange mt-0.5" />
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-sm leading-relaxed line-clamp-2">
              {testimonial.quote}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">— {testimonial.author}</p>
              {testimonial.product && (
                <p className="text-xs text-muted-foreground">
                  re: {testimonial.product}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <TestimonialDeleteButton
              id={testimonial.id}
              author={testimonial.author}
            />
          </div>
        </div>
      )}
    />
  );
}
