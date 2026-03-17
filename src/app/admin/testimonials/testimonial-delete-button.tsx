"use client";

import { deleteTestimonial } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function TestimonialDeleteButton({
  id,
  author,
}: {
  id: number;
  author: string;
}) {
  const router = useRouter();

  return (
    <DeleteButton
      itemName={`testimonial from ${author}`}
      onDelete={async () => {
        try {
          await deleteTestimonial(id);
          toast.success("Testimonial deleted");
          router.refresh();
        } catch {
          toast.error("Failed to delete testimonial");
        }
      }}
    />
  );
}
