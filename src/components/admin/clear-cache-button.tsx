"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { RefreshCcw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { clearAllCache } from "@/app/admin/actions";

interface ClearCacheButtonProps {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
  label?: string;
}

export function ClearCacheButton({
  variant = "default",
  size = "default",
  className,
  label = "Clear All Cache",
}: ClearCacheButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [clearing, setClearing] = useState(false);

  const handleClear = async () => {
    setClearing(true);
    try {
      await clearAllCache();
      toast.success("Cache cleared. Pages will rebuild on the next request.");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Failed to clear cache"
      );
    } finally {
      setClearing(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={() => setOpen(true)}
        className={className}
      >
        <RefreshCcw className="h-4 w-4" />
        {label}
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear all cached pages and data?</AlertDialogTitle>
          <AlertDialogDescription>
            This flushes every cached product, event, testimonial, class info,
            and gallery entry, and rebuilds the public site on the next request.
            Use this if changes you made aren&apos;t showing up on the live
            site. Your data is not deleted — only the cache.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)} disabled={clearing}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleClear} disabled={clearing}>
            {clearing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Clearing...
              </>
            ) : (
              "Clear Cache"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
}
