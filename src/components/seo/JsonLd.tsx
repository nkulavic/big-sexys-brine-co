import type { Product, Event as EventType } from "@/types";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Big Sexy's Brine Co.",
        description:
          "Small-batch artisan preserved foods handcrafted in Wheat Ridge, Colorado.",
        url: "https://bigsexysbrineco.com",
        logo: "https://bigsexysbrineco.com/images/logo/logo-transparent.png",
        image: "https://bigsexysbrineco.com/images/logo/logo-transparent.png",
        email: "bigsexysbrineco@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Wheat Ridge",
          addressRegion: "CO",
          addressCountry: "US",
        },
        foundingDate: "2025",
        founder: {
          "@type": "Person",
          name: "Jesse Thompson",
        },
        sameAs: ["https://www.instagram.com/bigsexysbrineco"],
      }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: `https://bigsexysbrineco.com${product.image}`,
        brand: {
          "@type": "Brand",
          name: "Big Sexy's Brine Co.",
        },
        manufacturer: {
          "@type": "Organization",
          name: "Big Sexy's Brine Co.",
        },
        category: product.category,
      }}
    />
  );
}

export function EventJsonLd({ event }: { event: EventType }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        description: event.description || `${event.name} - Big Sexy's Brine Co.`,
        startDate: event.date,
        location: {
          "@type": "Place",
          name: event.location,
          address: event.address || event.location,
        },
        organizer: {
          "@type": "Organization",
          name: "Big Sexy's Brine Co.",
          url: "https://bigsexysbrineco.com",
        },
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      }}
    />
  );
}

export function CourseJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Learn to Preserve - Hands-On Workshop",
        description:
          "A 4-hour hands-on preservation workshop teaching the art and science of brining. All skill levels welcome.",
        provider: {
          "@type": "Organization",
          name: "Big Sexy's Brine Co.",
          url: "https://bigsexysbrineco.com",
        },
        offers: {
          "@type": "Offer",
          price: "125",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "onsite",
          location: {
            "@type": "Place",
            name: "Wheat Ridge, CO",
          },
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `https://bigsexysbrineco.com${item.href}`,
        })),
      }}
    />
  );
}
