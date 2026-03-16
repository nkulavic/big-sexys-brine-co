"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createGalleryImage, deleteGalleryImage } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Upload, Trash2, X } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  id: number;
  url: string;
  alt: string | null;
  sort_order: number;
}

interface GalleryManagerProps {
  images: GalleryImage[];
}

export function GalleryManager({ images }: GalleryManagerProps) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const [manualAlt, setManualAlt] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const supabase = createClient();

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split(".").pop();
        const fileName = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("images").getPublicUrl(fileName);

        await createGalleryImage({
          url: publicUrl,
          alt: file.name.replace(/\.[^.]+$/, ""),
          sort_order: images.length + i,
        });
      }

      toast.success(`${files.length} image(s) uploaded`);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleAddUrl = async () => {
    if (!manualUrl) return;
    try {
      await createGalleryImage({
        url: manualUrl,
        alt: manualAlt || null,
        sort_order: images.length,
      });
      toast.success("Image added");
      setManualUrl("");
      setManualAlt("");
      setShowUrlInput(false);
      router.refresh();
    } catch {
      toast.error("Failed to add image");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteGalleryImage(id);
      toast.success("Image removed");
      router.refresh();
    } catch {
      toast.error("Failed to delete image");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload Images"}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
        <Button
          variant="outline"
          onClick={() => setShowUrlInput(!showUrlInput)}
        >
          Add by URL
        </Button>
      </div>

      {showUrlInput && (
        <Card>
          <CardContent className="flex items-end gap-3 pt-6">
            <div className="flex-1 space-y-2">
              <Input
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                placeholder="Image URL"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Input
                value={manualAlt}
                onChange={(e) => setManualAlt(e.target.value)}
                placeholder="Alt text (optional)"
              />
            </div>
            <Button onClick={handleAddUrl}>Add</Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUrlInput(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      {images.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No gallery images yet. Upload some above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <div key={image.id} className="group relative">
              <Image
                src={image.url}
                alt={image.alt ?? "Gallery image"}
                width={300}
                height={300}
                className="aspect-square rounded-md border border-border object-cover"
              />
              <button
                onClick={() => handleDelete(image.id)}
                className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-3 w-3" />
              </button>
              {image.alt && (
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {image.alt}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
