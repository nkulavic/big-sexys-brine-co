interface JsonLdProps {
  data: Record<string, unknown>;
}

// JSON-LD structured data component for SEO
// Content is generated from our own data, not user input
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
