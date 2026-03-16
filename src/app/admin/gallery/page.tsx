import { createClient } from "@/lib/supabase/server";
import { GalleryManager } from "@/components/admin/gallery-manager";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Gallery</h1>
        <p className="text-sm text-muted-foreground">
          Manage gallery images
        </p>
      </div>
      <GalleryManager images={images ?? []} />
    </div>
  );
}
