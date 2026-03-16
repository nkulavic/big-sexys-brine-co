"use client";

import { deleteProduct } from "@/app/admin/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ProductDeleteButton({
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
          await deleteProduct(id);
          toast.success(`"${name}" deleted`);
          router.refresh();
        } catch {
          toast.error("Failed to delete product");
        }
      }}
    />
  );
}
