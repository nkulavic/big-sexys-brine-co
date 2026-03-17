"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { EventDeleteButton } from "./event-delete-button";
import { SortableList } from "@/components/admin/sortable-list";
import { updateEventOrder } from "../actions";

const typeBadgeColors: Record<string, string> = {
  market: "bg-brand-green text-white",
  festival: "bg-brand-orange text-white",
  "pop-up": "bg-brand-gold text-brand-black",
  class: "bg-brand-brown text-brand-cream",
};

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  address: string | null;
  type: string;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export function EventsSortableList({ events }: { events: Event[] }) {
  return (
    <SortableList
      items={events}
      onReorder={updateEventOrder}
      renderItem={(event) => (
        <div className="flex items-center gap-4 py-2 pr-3">
          <div className="flex-1 min-w-0">
            <span className="font-medium">{event.name}</span>
          </div>
          <span className="text-sm text-muted-foreground w-28 text-center">
            {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-sm text-muted-foreground w-20 text-center">
            {event.time}
          </span>
          <span className="text-sm text-muted-foreground w-32 truncate">
            {event.location}
          </span>
          <Badge className={typeBadgeColors[event.type] ?? ""}>
            {event.type}
          </Badge>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/events/${event.id}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <EventDeleteButton id={event.id} name={event.name} />
          </div>
        </div>
      )}
    />
  );
}
