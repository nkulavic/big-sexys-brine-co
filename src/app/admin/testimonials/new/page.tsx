import { TestimonialForm } from "@/components/admin/testimonial-form";

export default function NewTestimonialPage() {
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
