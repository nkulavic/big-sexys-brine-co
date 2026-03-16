import { createClient } from "@/lib/supabase/server";
import { EventForm } from "@/components/admin/event-form";
import { notFound } from "next/navigation";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!event) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Edit Event</h1>
        <p className="text-sm text-muted-foreground">Update {event.name}</p>
      </div>
      <EventForm event={event} />
    </div>
  );
}
