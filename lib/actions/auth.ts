"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type {
  FacilitatorSignupData,
  BuddySignupData,
  ParticipantSignupData,
  UserRole,
} from "@/lib/types";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirect") as string | null;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect(redirectTo || "/account");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function signupFacilitator(data: FacilitatorSignupData) {
  const supabase = await createClient();

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Failed to create user" };
  }

  const userId = authData.user.id;

  // Create base profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    email: data.email,
    full_name: data.full_name,
    role: "facilitator" as UserRole,
  });

  if (profileError) {
    return { error: profileError.message };
  }

  // Create facilitator-specific profile
  const { error: facilitatorError } = await supabase
    .from("facilitator_profiles")
    .insert({
      id: userId,
      education: data.education,
      discipline: data.discipline,
      institution: data.institution,
      mobile: data.mobile || null,
      research_profile_url: data.research_profile_url || null,
      research_interests: data.research_interests,
    });

  if (facilitatorError) {
    return { error: facilitatorError.message };
  }

  redirect("/account");
}

export async function signupBuddy(data: BuddySignupData) {
  const supabase = await createClient();

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Failed to create user" };
  }

  const userId = authData.user.id;

  // Create base profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    email: data.email,
    full_name: data.full_name,
    role: "buddy" as UserRole,
  });

  if (profileError) {
    return { error: profileError.message };
  }

  // Create buddy-specific profile
  const { error: buddyError } = await supabase.from("buddy_profiles").insert({
    id: userId,
    looking_for: data.looking_for,
    education: data.education,
    major: data.major,
    institution: data.institution,
    mobile: data.mobile || null,
    research_profile_url: data.research_profile_url || null,
    research_interests: data.research_interests,
  });

  if (buddyError) {
    return { error: buddyError.message };
  }

  redirect("/account");
}

export async function signupParticipant(data: ParticipantSignupData) {
  const supabase = await createClient();

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!authData.user) {
    return { error: "Failed to create user" };
  }

  const userId = authData.user.id;

  // Create base profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: userId,
    email: data.email,
    full_name: data.full_name,
    role: "participant" as UserRole,
  });

  if (profileError) {
    return { error: profileError.message };
  }

  // Create participant-specific profile
  const { error: participantError } = await supabase
    .from("participant_profiles")
    .insert({
      id: userId,
      nid_number: data.nid_number,
      age: data.age,
      gender: data.gender,
      division: data.division,
      district: data.district,
      upazilla: data.upazilla,
      post_office: data.post_office,
      occupation: data.occupation,
      marital_status: data.marital_status,
      number_of_children: data.number_of_children,
      education_degree: data.education_degree,
      education_subject: data.education_subject,
    });

  if (participantError) {
    return { error: participantError.message };
  }

  redirect("/account");
}
