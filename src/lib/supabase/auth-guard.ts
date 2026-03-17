import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/**
 * Require an authenticated user. If no user is found, redirect to admin login.
 * Use this in server components and server actions to enforce auth.
 */
export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

/**
 * Require an authenticated user for server actions.
 * Throws an error instead of redirecting (since server actions can't redirect mid-execution).
 */
export async function requireAuthAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be logged in to perform this action.");
  }

  return user;
}
