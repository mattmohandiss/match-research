"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type {
  Profile,
  FacilitatorProfile,
  BuddyProfile,
  ParticipantProfile,
} from "@/lib/types";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return null;
  }

  return profile as Profile;
}

export async function getFullUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return null;
  }

  let roleProfile = null;

  if (profile.role === "facilitator") {
    const { data } = await supabase
      .from("facilitator_profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    roleProfile = data as FacilitatorProfile | null;
  } else if (profile.role === "buddy") {
    const { data } = await supabase
      .from("buddy_profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    roleProfile = data as BuddyProfile | null;
  } else if (profile.role === "participant") {
    const { data } = await supabase
      .from("participant_profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    roleProfile = data as ParticipantProfile | null;
  }

  return {
    profile: profile as Profile,
    roleProfile,
  };
}

export async function updateProfile(data: Partial<Profile>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: data.full_name,
      avatar_url: data.avatar_url,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/account");
  return { success: true };
}
