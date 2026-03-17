"use client";

import { deleteEvent } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function EventDeleteButton({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const router = useRouter();

  return (
    <DeleteButton
      itemName={name}
      onDelete={async () => {
        try {
          await deleteEvent(id);
          toast.success(`"${name}" deleted`);
          router.refresh();
        } catch {
          toast.error("Failed to delete event");
        }
      }}
    />
  );
}
