"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { HeatIndicator } from "./HeatIndicator";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group block bg-card rounded-xl border border-brand-brown/20 overflow-hidden hover:border-brand-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-orange/5",
        className
      )}
    >
      <div className="aspect-square relative bg-brand-brown/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/images/logo/logo-black-bg.png"
            alt={product.name}
            width={200}
            height={200}
            className="opacity-20 group-hover:opacity-30 transition-opacity"
          />
        </div>
        <Badge
          className="absolute top-3 right-3 bg-brand-orange/90 text-white text-xs border-0"
        >
          {product.size}
        </Badge>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-brand-cream group-hover:text-brand-orange transition-colors">
            {product.name}
          </h3>
        </div>
        <p className="text-sm text-brand-cream/60 italic">{product.tagline}</p>
        <div className="flex items-center justify-between pt-1">
          <Badge variant="outline" className="text-xs border-brand-green/40 text-brand-green">
            {product.category}
          </Badge>
          <HeatIndicator level={product.heat} size={14} />
        </div>
      </div>
    </Link>
  );
}
