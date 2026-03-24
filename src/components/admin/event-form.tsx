"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createEvent, updateEvent } from "@/app/admin/actions";
import { toast } from "sonner";

const eventTypes = ["market", "festival", "pop-up", "class"];
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface EventFormProps {
  event?: {
    id: number;
    name: string;
    date: string;
    end_date: string | null;
    is_recurring: boolean;
    recurrence_day: string | null;
    time: string;
    location: string;
    address: string | null;
    type: string;
    description: string | null;
  };
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(event?.name ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [endDate, setEndDate] = useState(event?.end_date ?? "");
  const [isRecurring, setIsRecurring] = useState(event?.is_recurring ?? false);
  const [recurrenceDay, setRecurrenceDay] = useState(
    event?.recurrence_day ?? "Saturday"
  );
  const [time, setTime] = useState(event?.time ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [address, setAddress] = useState(event?.address ?? "");
  const [type, setType] = useState(event?.type ?? eventTypes[0]);
  const [description, setDescription] = useState(event?.description ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const data = {
      name,
      date,
      end_date: endDate || null,
      is_recurring: isRecurring,
      recurrence_day: isRecurring ? recurrenceDay : null,
      time,
      location,
      address: address || null,
      type,
      description: description || null,
    };

    try {
      if (event) {
        await updateEvent(event.id, data);
        toast.success("Event updated");
      } else {
        await createEvent(data);
        toast.success("Event created");
      }
      router.push("/admin/events");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="date">
                {isRecurring ? "Start Date" : "Date"}
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="9:00 AM - 1:00 PM"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                {eventTypes.map((t) => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <Card className="border-dashed">
            <CardContent className="pt-4 space-y-4">
              <div className="flex items-center gap-3">
                <Switch
                  checked={isRecurring}
                  onCheckedChange={setIsRecurring}
                />
                <Label>Recurring event (e.g., every Saturday through a date range)</Label>
              </div>

              {isRecurring && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="recurrence_day">Repeats Every</Label>
                    <Select
                      id="recurrence_day"
                      value={recurrenceDay}
                      onChange={(e) => setRecurrenceDay(e.target.value)}
                    >
                      {daysOfWeek.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_date">End Date</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {!isRecurring && (
                <div className="space-y-2">
                  <Label htmlFor="end_date">
                    End Date <span className="text-muted-foreground text-xs">(optional, for multi-day events)</span>
                  </Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="City, State"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe this event..."
              minimal
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : event ? "Update Event" : "Create Event"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/events")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
