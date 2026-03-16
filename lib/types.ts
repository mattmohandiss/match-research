// User roles
export type UserRole = "facilitator" | "buddy" | "participant";

// Base profile (shared across all roles)
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

// Research Facilitator profile
export interface FacilitatorProfile {
  id: string;
  education: string | null;
  discipline: string | null;
  institution: string | null;
  mobile: string | null;
  research_profile_url: string | null;
  research_interests: string[] | null;
}

// Research Buddy profile
export interface BuddyProfile {
  id: string;
  looking_for: string | null;
  education: string | null;
  major: string | null;
  institution: string | null;
  mobile: string | null;
  research_profile_url: string | null;
  research_interests: string[] | null;
}

// Survey Participant profile (private)
export interface ParticipantProfile {
  id: string;
  nid_number: string | null;
  age: number | null;
  gender: string | null;
  division: string | null;
  district: string | null;
  upazilla: string | null;
  post_office: string | null;
  occupation: string | null;
  marital_status: string | null;
  number_of_children: number | null;
  education_degree: string | null;
  education_subject: string | null;
}

// Study status
export type StudyStatus = "pending" | "approved" | "rejected";

// Study
export interface Study {
  id: string;
  creator_id: string;
  title: string;
  description: string;
  keywords: string[] | null;
  payment_bdt: number | null;
  duration_minutes: number | null;
  participant_role: string | null;
  research_impact: string | null;
  survey_link: string | null;
  participant_age_min: number | null;
  participant_age_max: number | null;
  participant_gender: string | null;
  participant_geography: string[] | null;
  status: StudyStatus;
  created_at: string;
  approved_at: string | null;
}

// Study with creator profile (for display)
export interface StudyWithCreator extends Study {
  creator: Profile;
}

// Buddy with profile (for display)
export interface BuddyWithProfile extends BuddyProfile {
  profile: Profile;
}

// Form data types for signup
export interface FacilitatorSignupData {
  email: string;
  password: string;
  full_name: string;
  education: string;
  discipline: string;
  institution: string;
  mobile?: string;
  research_profile_url?: string;
  research_interests: string[];
}

export interface BuddySignupData {
  email: string;
  password: string;
  full_name: string;
  looking_for: string;
  education: string;
  major: string;
  institution: string;
  mobile?: string;
  research_profile_url?: string;
  research_interests: string[];
}

export interface ParticipantSignupData {
  email: string;
  password: string;
  full_name: string;
  nid_number: string;
  age: number;
  gender: string;
  division: string;
  district: string;
  upazilla: string;
  post_office: string;
  occupation: string;
  marital_status: string;
  number_of_children: number;
  education_degree: string;
  education_subject: string;
}

// Study creation form data
export interface CreateStudyData {
  title: string;
  description: string;
  keywords?: string[];
  payment_bdt?: number;
  duration_minutes?: number;
  participant_role?: string;
  research_impact?: string;
  survey_link?: string;
  participant_age_min?: number;
  participant_age_max?: number;
  participant_gender?: string;
  participant_geography?: string[];
}

// Education level options
export const EDUCATION_LEVELS = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Post-Doctoral",
  "Other",
] as const;

// Gender options
export const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"] as const;

// Marital status options
export const MARITAL_STATUS_OPTIONS = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Prefer not to say",
] as const;

// Bangladesh divisions
export const DIVISIONS = [
  "Barishal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
] as const;
