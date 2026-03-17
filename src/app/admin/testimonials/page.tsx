import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/supabase/auth-guard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Pencil, Quote } from "lucide-react";
import { TestimonialDeleteButton } from "./testimonial-delete-button";

export default async function AdminTestimonialsPage() {
  await requireAuth();
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("id");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Testimonials</h1>
          <p className="text-sm text-muted-foreground">
            Manage customer testimonials
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/testimonials/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials?.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Quote className="h-5 w-5 shrink-0 text-brand-orange" />
                <div className="flex-1 space-y-2">
                  <p className="text-sm leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">
                        — {testimonial.author}
                      </p>
                      {testimonial.product && (
                        <p className="text-xs text-muted-foreground">
                          re: {testimonial.product}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link
                          href={`/admin/testimonials/${testimonial.id}/edit`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <TestimonialDeleteButton
                        id={testimonial.id}
                        author={testimonial.author}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
