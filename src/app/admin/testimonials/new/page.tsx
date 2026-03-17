import { requireAuth } from "@/lib/supabase/auth-guard";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export default async function NewTestimonialPage() {
  await requireAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">New Testimonial</h1>
        <p className="text-sm text-muted-foreground">
          Add a customer testimonial
        </p>
      </div>
      <TestimonialForm />
    </div>
  );
}
