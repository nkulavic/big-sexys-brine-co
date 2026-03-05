"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Please select or enter a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  defaultSubject?: string;
}

export function ContactForm({ defaultSubject = "General Inquiry" }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: defaultSubject,
      honeypot: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    if (data.honeypot) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-8 text-center space-y-3">
        <CheckCircle size={48} className="mx-auto text-brand-green" />
        <h3 className="font-display text-xl font-semibold text-brand-cream">
          Message Sent!
        </h3>
        <p className="text-brand-cream/60">
          Thanks for reaching out. We&apos;ll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-brand-orange hover:text-brand-gold font-semibold transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-brand-cream/80">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          {...register("name")}
          className={cn(
            "bg-card border-brand-brown/30 text-brand-cream placeholder:text-brand-cream/30",
            errors.name && "border-brand-red"
          )}
        />
        {errors.name && (
          <p className="text-xs text-brand-red">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-brand-cream/80">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          className={cn(
            "bg-card border-brand-brown/30 text-brand-cream placeholder:text-brand-cream/30",
            errors.email && "border-brand-red"
          )}
        />
        {errors.email && (
          <p className="text-xs text-brand-red">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-brand-cream/80">Subject</Label>
        <select
          id="subject"
          {...register("subject")}
          className={cn(
            "flex h-10 w-full rounded-md border px-3 py-2 text-sm bg-card border-brand-brown/30 text-brand-cream",
            errors.subject && "border-brand-red"
          )}
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Custom Order">Custom Order</option>
          <option value="Wholesale">Wholesale Inquiry</option>
          <option value="Book a Class">Book a Class</option>
          <option value="Event">Event / Market Inquiry</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && (
          <p className="text-xs text-brand-red">{errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-brand-cream/80">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us what's on your mind..."
          rows={5}
          {...register("message")}
          className={cn(
            "bg-card border-brand-brown/30 text-brand-cream placeholder:text-brand-cream/30 resize-none",
            errors.message && "border-brand-red"
          )}
        />
        {errors.message && (
          <p className="text-xs text-brand-red">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-brand-red text-sm">
          <AlertCircle size={16} />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-brand-orange text-white font-semibold rounded-full hover:bg-brand-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
