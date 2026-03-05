import { Container } from "@/components/layout/Container";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";
import { EventJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Find Big Sexy's Brine Co. at farmers markets, festivals, and pop-ups across the Denver metro area. See our upcoming schedule.",
  openGraph: {
    title: "Events | Big Sexy's Brine Co.",
    description: "Find Big Sexy's Brine Co. at farmers markets, festivals, and pop-ups across the Denver metro area.",
    images: [{ url: "/images/logo/logo-transparent.png" }],
  },
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <>
      {upcoming.map((event) => (
        <EventJsonLd key={event.id} event={event} />
      ))}
      <section className="pt-28 pb-24">
        <Container>
          <div className="text-center mb-12">
            <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 mb-4">
              Markets & Festivals
            </Badge>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-cream">
            Events
          </h1>
          <p className="mt-4 text-brand-cream/60 max-w-2xl mx-auto text-lg">
            Catch Big Sexy at farmers markets, festivals, and events across
            Colorado. Sample before you buy and meet the maker.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-brand-cream mb-6">
            Upcoming Events
          </h2>
          {upcoming.length > 0 ? (
            <div className="space-y-4">
              {upcoming.map((event) => (
                <div
                  key={event.id}
                  className="bg-card border border-brand-brown/20 rounded-xl p-6 flex flex-col sm:flex-row gap-6 hover:border-brand-orange/30 transition-colors"
                >
                  <div className="flex-shrink-0 text-center sm:text-left">
                    <div className="inline-flex flex-col items-center bg-brand-orange/10 rounded-xl px-5 py-3">
                      <span className="text-3xl font-bold text-brand-orange">
                        {new Date(event.date).getDate()}
                      </span>
                      <span className="text-sm text-brand-orange/80 uppercase font-semibold">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-semibold text-brand-cream">
                        {event.name}
                      </h3>
                      <Badge
                        className={
                          event.type === "festival"
                            ? "bg-brand-orange/10 text-brand-orange border-brand-orange/20"
                            : event.type === "class"
                              ? "bg-brand-green/10 text-brand-green border-brand-green/20"
                              : "bg-brand-gold/10 text-brand-gold border-brand-gold/20"
                        }
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    {event.description && (
                      <p className="text-brand-cream/60">{event.description}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-brand-cream/50">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location}
                        {event.address && `, ${event.address}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-brand-brown/20 rounded-xl p-12 text-center">
              <p className="text-brand-cream/60 text-lg">
                No upcoming events scheduled. Follow us on Instagram for the
                latest updates!
              </p>
              <a
                href="https://www.instagram.com/bigsexysbrineco"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-brand-orange hover:text-brand-gold font-semibold transition-colors"
              >
                @bigsexysbrineco
              </a>
            </div>
          )}
        </div>

        {/* Past Events */}
        {past.length > 0 && (
          <div>
            <Separator className="bg-brand-brown/20 mb-12" />
            <h2 className="font-display text-2xl font-bold text-brand-cream/50 mb-6">
              Past Events
            </h2>
            <div className="space-y-3 opacity-60">
              {past.map((event) => (
                <div
                  key={event.id}
                  className="bg-card/50 border border-brand-brown/10 rounded-lg p-4 flex items-center gap-4"
                >
                  <span className="text-sm text-brand-cream/40 w-28 shrink-0">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-brand-cream/50">{event.name}</span>
                  <Badge
                    variant="outline"
                    className="text-xs border-brand-brown/20 text-brand-cream/30 ml-auto"
                  >
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-card border border-brand-brown/20 rounded-xl p-8 text-center">
          <h3 className="font-display text-2xl font-bold text-brand-cream mb-3">
            Want Us at Your Event?
          </h3>
          <p className="text-brand-cream/60 mb-6 max-w-xl mx-auto">
            We&apos;re always looking for new markets, festivals, and pop-up
            opportunities across Colorado.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange/90 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </Container>
    </section>
    </>
  );
}
