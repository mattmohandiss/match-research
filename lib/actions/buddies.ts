"use server";

import { createClient } from "@/lib/supabase/server";
import type { BuddyWithProfile } from "@/lib/types";

export async function getBuddies(): Promise<BuddyWithProfile[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("buddy_profiles")
    .select(
      `
      *,
      profile:profiles(*)
    `
    )
    .order("id");

  if (error) {
    console.error("Error fetching buddies:", error);
    return [];
  }

  return data as BuddyWithProfile[];
}
