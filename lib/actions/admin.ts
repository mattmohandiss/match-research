"use server";

import { createClient } from "@/lib/supabase/server";

export async function getUserStats() {
  const supabase = await createClient();

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@matchresearch.com";
  if (user?.email !== adminEmail) {
    return null;
  }

  // Get counts by role
  const { data: facilitators } = await supabase
    .from("profiles")
    .select("id", { count: "exact" })
    .eq("role", "facilitator");

  const { data: buddies } = await supabase
    .from("profiles")
    .select("id", { count: "exact" })
    .eq("role", "buddy");

  const { data: participants } = await supabase
    .from("profiles")
    .select("id", { count: "exact" })
    .eq("role", "participant");

  // Get study counts by status
  const { data: pendingStudies } = await supabase
    .from("studies")
    .select("id", { count: "exact" })
    .eq("status", "pending");

  const { data: approvedStudies } = await supabase
    .from("studies")
    .select("id", { count: "exact" })
    .eq("status", "approved");

  const { data: rejectedStudies } = await supabase
    .from("studies")
    .select("id", { count: "exact" })
    .eq("status", "rejected");

  return {
    users: {
      facilitators: facilitators?.length || 0,
      buddies: buddies?.length || 0,
      participants: participants?.length || 0,
      total: (facilitators?.length || 0) + (buddies?.length || 0) + (participants?.length || 0),
    },
    studies: {
      pending: pendingStudies?.length || 0,
      approved: approvedStudies?.length || 0,
      rejected: rejectedStudies?.length || 0,
      total: (pendingStudies?.length || 0) + (approvedStudies?.length || 0) + (rejectedStudies?.length || 0),
    },
  };
}
