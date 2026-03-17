import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/supabase/auth-guard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import { EventDeleteButton } from "./event-delete-button";

const typeBadgeColors: Record<string, string> = {
  market: "bg-brand-green text-white",
  festival: "bg-brand-orange text-white",
  "pop-up": "bg-brand-gold text-brand-black",
  class: "bg-brand-brown text-brand-cream",
};

export default async function AdminEventsPage() {
  await requireAuth();
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Events</h1>
          <p className="text-sm text-muted-foreground">
            Manage farmers markets, festivals, and classes
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/events/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events?.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell>
                {new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>{event.time}</TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                <Badge className={typeBadgeColors[event.type] ?? ""}>
                  {event.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <EventDeleteButton id={event.id} name={event.name} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
