"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateClassInfo } from "@/app/admin/actions";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";

interface ClassFormProps {
  classInfo: {
    title: string;
    price: number;
    duration: string;
    description: string;
    what_you_learn: string[];
    what_you_get: string[];
    max_students: number;
  } | null;
}

export function ClassForm({ classInfo }: ClassFormProps) {
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(classInfo?.title ?? "");
  const [price, setPrice] = useState(classInfo?.price ?? 125);
  const [duration, setDuration] = useState(classInfo?.duration ?? "");
  const [description, setDescription] = useState(
    classInfo?.description ?? ""
  );
  const [whatYouLearn, setWhatYouLearn] = useState<string[]>(
    classInfo?.what_you_learn ?? [""]
  );
  const [whatYouGet, setWhatYouGet] = useState<string[]>(
    classInfo?.what_you_get ?? [""]
  );
  const [maxStudents, setMaxStudents] = useState(
    classInfo?.max_students ?? 12
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateClassInfo({
        title,
        price,
        duration,
        description,
        what_you_learn: whatYouLearn.filter((i) => i.trim() !== ""),
        what_you_get: whatYouGet.filter((i) => i.trim() !== ""),
        max_students: maxStudents,
      });
      toast.success("Class info updated");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update class info"
      );
    } finally {
      setSaving(false);
    }
  };

  const updateList = (
    list: string[],
    setList: (val: string[]) => void,
    index: number,
    value: string
  ) => {
    setList(list.map((item, i) => (i === index ? value : item)));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Class Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={0.01}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="4 hours"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxStudents">Max Students</Label>
              <Input
                id="maxStudents"
                type="number"
                min={1}
                value={maxStudents}
                onChange={(e) => setMaxStudents(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What You&apos;ll Learn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {whatYouLearn.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) =>
                  updateList(whatYouLearn, setWhatYouLearn, index, e.target.value)
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setWhatYouLearn(whatYouLearn.filter((_, i) => i !== index))
                }
                className="text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setWhatYouLearn([...whatYouLearn, ""])}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What You&apos;ll Get</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {whatYouGet.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={item}
                onChange={(e) =>
                  updateList(whatYouGet, setWhatYouGet, index, e.target.value)
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setWhatYouGet(whatYouGet.filter((_, i) => i !== index))
                }
                className="text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setWhatYouGet([...whatYouGet, ""])}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </CardContent>
      </Card>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Update Class Info"}
      </Button>
    </form>
  );
}
