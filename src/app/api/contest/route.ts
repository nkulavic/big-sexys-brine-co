import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contestSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  pun: z.string().min(5).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, pun } = result.data;

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Big Sexy's Brine Co. <noreply@bigsexysbrine.co>",
        to: process.env.CONTACT_EMAIL || "bigsexysbrineco@gmail.com",
        cc: [email],
        subject: `[Pickle Pun Contest] Entry from ${name}`,
        text: `New pickle pun contest entry!\n\nName: ${name}\nEmail: ${email}\n\nPickle Pun:\n${pun}`,
        replyTo: email,
      });
    } else {
      console.log("Contest entry (no RESEND_API_KEY):", { name, email, pun });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contest form error:", error);
    return NextResponse.json(
      { error: "Failed to submit entry" },
      { status: 500 }
    );
  }
}
