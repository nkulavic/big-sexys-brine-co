import { EventForm } from "@/components/admin/event-form";

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">New Event</h1>
        <p className="text-sm text-muted-foreground">
          Add a new event, market, or class
        </p>
      </div>
      <EventForm />
    </div>
  );
}
