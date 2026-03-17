import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/supabase/auth-guard";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireAuth();
  const supabase = await createClient();
  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (!testimonial) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Edit Testimonial</h1>
        <p className="text-sm text-muted-foreground">
          Update testimonial from {testimonial.author}
        </p>
      </div>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
