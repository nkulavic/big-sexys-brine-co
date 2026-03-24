"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

interface ProductImageCarouselProps {
  images: ProductImage[];
  productName: string;
  productSize: string;
  fallbackImage?: string;
}

export function ProductImageCarousel({
  images,
  productName,
  productSize,
  fallbackImage,
}: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no gallery images, show the single fallback
  const displayImages =
    images.length > 0
      ? images
      : fallbackImage
        ? [{ id: 0, url: fallbackImage, alt: productName, sort_order: 0, is_primary: true }]
        : [];

  if (displayImages.length === 0) {
    return (
      <div className="aspect-square relative rounded-2xl overflow-hidden border border-brand-brown/20 bg-card flex items-center justify-center">
        <p className="text-brand-cream/40">No image available</p>
      </div>
    );
  }

  const currentImage = displayImages[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < displayImages.length - 1;

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square relative rounded-2xl overflow-hidden border border-brand-brown/20 bg-card group">
        <Image
          src={currentImage.url}
          alt={currentImage.alt ?? productName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <Badge className="absolute top-4 right-4 bg-brand-orange text-white text-sm border-0 z-10">
          {productSize}
        </Badge>

        {/* Navigation arrows */}
        {displayImages.length > 1 && (
          <>
            {hasPrev && (
              <button
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            {hasNext && (
              <button
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </>
        )}

        {/* Image counter */}
        {displayImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
            {currentIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                index === currentIndex
                  ? "border-brand-orange ring-1 ring-brand-orange/50"
                  : "border-brand-brown/20 opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt ?? `${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
