-- Match_Research Database Schema
-- Run this in your Supabase SQL Editor (https://app.supabase.com/project/_/sql)

-- ============================================
-- TABLES
-- ============================================

-- Profiles (shared user data)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text not null,
  role text not null check (role in ('facilitator', 'buddy', 'participant')),
  avatar_url text,
  created_at timestamptz default now()
);

-- Research Facilitator profiles
create table if not exists facilitator_profiles (
  id uuid references profiles(id) on delete cascade primary key,
  education text,
  discipline text,
  institution text,
  mobile text,
  research_profile_url text,
  research_interests text[]
);

-- Research Buddy profiles  
create table if not exists buddy_profiles (
  id uuid references profiles(id) on delete cascade primary key,
  looking_for text,
  education text,
  major text,
  institution text,
  mobile text,
  research_profile_url text,
  research_interests text[]
);

-- Survey Participant profiles (PRIVATE)
create table if not exists participant_profiles (
  id uuid references profiles(id) on delete cascade primary key,
  nid_number text,
  age integer,
  gender text,
  division text,
  district text,
  upazilla text,
  post_office text,
  occupation text,
  marital_status text,
  number_of_children integer,
  education_degree text,
  education_subject text
);

-- Studies
create table if not exists studies (
  id uuid default gen_random_uuid() primary key,
  creator_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  keywords text[],
  payment_bdt integer,
  duration_minutes integer,
  participant_role text,
  research_impact text,
  survey_link text,
  participant_age_min integer,
  participant_age_max integer,
  participant_gender text,
  participant_geography text[],
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now(),
  approved_at timestamptz
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table facilitator_profiles enable row level security;
alter table buddy_profiles enable row level security;
alter table participant_profiles enable row level security;
alter table studies enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);
  
create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);
  
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Facilitator profiles policies
create policy "Facilitator profiles are viewable"
  on facilitator_profiles for select using (true);
  
create policy "Users can insert own facilitator profile"
  on facilitator_profiles for insert with check (auth.uid() = id);

create policy "Users can update own facilitator profile"
  on facilitator_profiles for update using (auth.uid() = id);

-- Buddy profiles policies
create policy "Buddy profiles are viewable"
  on buddy_profiles for select using (true);
  
create policy "Users can insert own buddy profile"
  on buddy_profiles for insert with check (auth.uid() = id);

create policy "Users can update own buddy profile"
  on buddy_profiles for update using (auth.uid() = id);

-- Participant profiles policies (PRIVATE - only owner can see)
create policy "Users can only view own participant profile"
  on participant_profiles for select using (auth.uid() = id);
  
create policy "Users can insert own participant profile"
  on participant_profiles for insert with check (auth.uid() = id);

create policy "Users can update own participant profile"
  on participant_profiles for update using (auth.uid() = id);

-- Studies policies
create policy "Approved studies are public"
  on studies for select using (status = 'approved' or creator_id = auth.uid());
  
create policy "Authenticated users can create studies"
  on studies for insert with check (auth.uid() = creator_id);

create policy "Creators can update pending studies"
  on studies for update using (auth.uid() = creator_id and status = 'pending');

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create bucket for avatars (run this separately if it errors)
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Avatar images are publicly accessible"
  on storage.objects for select using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert with check (
    bucket_id = 'avatars' and 
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can update their own avatar"
  on storage.objects for update using (
    bucket_id = 'avatars' and 
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete using (
    bucket_id = 'avatars' and 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- ADMIN FUNCTIONS (for bypassing RLS)
-- ============================================

-- Function to update study status (admin only)
-- Call this from your admin panel with service role key
create or replace function admin_update_study_status(
  study_id uuid,
  new_status text
)
returns void
language plpgsql
security definer
as $$
begin
  update studies 
  set 
    status = new_status,
    approved_at = case when new_status = 'approved' then now() else null end
  where id = study_id;
end;
$$;

-- Function to get all studies (admin only)
create or replace function admin_get_all_studies()
returns setof studies
language plpgsql
security definer
as $$
begin
  return query select * from studies order by created_at desc;
end;
$$;

-- Function to get all users by role (admin only)
create or replace function admin_get_users_by_role()
returns table (
  role text,
  count bigint
)
language plpgsql
security definer
as $$
begin
  return query 
    select p.role, count(*)::bigint 
    from profiles p 
    group by p.role;
end;
$$;
