"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  function goNext() {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }

  function goPrev() {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="break-inside-avoid bg-card border border-brand-brown/20 rounded-xl overflow-hidden group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black cursor-pointer"
          >
            <div className="relative aspect-square">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-3">
              <p className="text-sm text-brand-cream/60">{img.alt}</p>
              <Badge
                variant="outline"
                className="mt-1 text-xs border-brand-brown/20 text-brand-cream/40"
              >
                {img.category}
              </Badge>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl w-full bg-brand-black/95 border-brand-brown/30 p-0 gap-0 [&>button]:hidden">
          {selectedImage && (
            <div className="relative">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 896px"
                  priority
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-brand-cream/80">{selectedImage.alt}</p>
                <Badge variant="outline" className="mt-2 text-xs border-brand-brown/20 text-brand-cream/40">
                  {selectedImage.category}
                </Badge>
              </div>

              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-brand-black/60 text-brand-cream/80 hover:text-white hover:bg-brand-black/80 transition-colors"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>

              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-black/60 text-brand-cream/80 hover:text-white hover:bg-brand-black/80 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-brand-black/60 text-brand-cream/80 hover:text-white hover:bg-brand-black/80 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
