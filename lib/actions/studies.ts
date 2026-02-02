"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { CreateStudyData, Study, StudyWithCreator } from "@/lib/types";

export async function createStudy(data: CreateStudyData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a study" };
  }

  const { error } = await supabase.from("studies").insert({
    creator_id: user.id,
    title: data.title,
    description: data.description,
    keywords: data.keywords || [],
    payment_bdt: data.payment_bdt || null,
    duration_minutes: data.duration_minutes || null,
    participant_age_min: data.participant_age_min || null,
    participant_age_max: data.participant_age_max || null,
    participant_gender: data.participant_gender || null,
    participant_geography: data.participant_geography || [],
    status: "pending",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/studies");
  revalidatePath("/account");
  return { success: true };
}

export async function getApprovedStudies(): Promise<StudyWithCreator[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("studies")
    .select(
      `
      *,
      creator:profiles(*)
    `
    )
    .eq("status", "approved")
    .order("approved_at", { ascending: false });

  if (error) {
    console.error("Error fetching studies:", error);
    return [];
  }

  return data as StudyWithCreator[];
}

export async function getStudyById(id: string): Promise<StudyWithCreator | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("studies")
    .select(
      `
      *,
      creator:profiles(*)
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching study:", error);
    return null;
  }

  return data as StudyWithCreator;
}

export async function getMyStudies(): Promise<Study[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("studies")
    .select("*")
    .eq("creator_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching my studies:", error);
    return [];
  }

  return data as Study[];
}

// Admin functions
export async function getAllStudies(): Promise<StudyWithCreator[]> {
  const supabase = await createClient();

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@matchresearch.com";
  if (user?.email !== adminEmail) {
    return [];
  }

  const { data, error } = await supabase
    .from("studies")
    .select(
      `
      *,
      creator:profiles(*)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all studies:", error);
    return [];
  }

  return data as StudyWithCreator[];
}

export async function updateStudyStatus(
  studyId: string,
  status: "approved" | "rejected"
) {
  const supabase = await createClient();

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@matchresearch.com";
  if (user?.email !== adminEmail) {
    return { error: "Unauthorized" };
  }

  const updateData: { status: string; approved_at?: string } = { status };
  if (status === "approved") {
    updateData.approved_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("studies")
    .update(updateData)
    .eq("id", studyId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/studies");
  return { success: true };
}
