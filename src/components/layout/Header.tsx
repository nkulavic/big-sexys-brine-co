"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/learn-to-preserve", label: "Learn to Preserve" },
  { href: "/gallery", label: "Gallery" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-brand-black/95 backdrop-blur-md shadow-lg border-b border-brand-brown/30"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo/logo-transparent.png"
              alt="Big Sexy's Brine Co."
              width={50}
              height={50}
              priority
            />
            <span className="font-display text-xl font-bold text-brand-cream hidden sm:block">
              Big Sexy&apos;s Brine Co.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-brand-cream/80 hover:text-brand-orange transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-brand-orange text-white text-sm font-semibold rounded-full hover:bg-brand-orange/90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Nav */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                className="p-2 text-brand-cream hover:text-brand-orange transition-colors"
                aria-label="Toggle menu"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-80 bg-brand-black border-brand-brown/30"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-2 mt-8">
                <div className="flex items-center gap-3 mb-8 px-2">
                  <Image
                    src="/images/logo/logo-transparent.png"
                    alt="Big Sexy's Brine Co."
                    width={40}
                    height={40}
                  />
                  <span className="font-display text-lg font-bold text-brand-cream">
                    Big Sexy&apos;s Brine Co.
                  </span>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-lg font-medium text-brand-cream/80 hover:text-brand-orange hover:bg-white/5 transition-colors rounded-lg"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-6 px-2">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center w-full px-5 py-3 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange/90 transition-colors"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </Container>
    </header>
  );
}
