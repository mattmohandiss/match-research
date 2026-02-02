# Match_Research MVP Implementation Plan

## Overview
- **Timeline:** < 1 week
- **Tech Stack:** Next.js 16 + Supabase + shadcn/ui + Tailwind CSS 4
- **Scope:** 3 core roles (Research Facilitator, Research Buddy, Survey Participant)
- **Admin:** Hardcoded admin user (placeholder email)

---

## Phase 1: Foundation Setup (Day 1)

### 1.1 Install Dependencies
```bash
# Supabase client
npm install @supabase/supabase-js @supabase/ssr

# shadcn/ui setup
npx shadcn@latest init
npx shadcn@latest add button card input label select textarea form toast avatar badge separator dialog dropdown-menu tabs scroll-area
```

### 1.2 Project Structure
```
app/
├── (public)/                  # Public routes (no auth needed)
│   ├── page.tsx               # Landing page
│   ├── about/page.tsx
│   └── privacy/page.tsx
├── (auth)/                    # Auth routes
│   ├── login/page.tsx
│   ├── join/
│   │   ├── page.tsx           # Role selection
│   │   └── [role]/page.tsx    # Dynamic signup form
├── (dashboard)/               # Protected routes
│   ├── layout.tsx             # Dashboard layout with nav
│   ├── account/page.tsx       # User profile
│   ├── studies/
│   │   ├── page.tsx           # Study directory
│   │   ├── [id]/page.tsx      # Study detail
│   │   └── create/page.tsx    # Create study form
│   ├── buddies/page.tsx       # Research buddy browse
├── admin/                     # Admin routes
│   ├── layout.tsx             # Admin guard
│   └── page.tsx               # Moderation dashboard
├── layout.tsx
├── globals.css
components/
├── ui/                        # shadcn components
├── layout/
│   ├── navbar.tsx
│   └── footer.tsx
├── forms/
│   ├── facilitator-form.tsx
│   ├── buddy-form.tsx
│   └── participant-form.tsx
├── studies/
│   ├── study-card.tsx
│   └── study-form.tsx
└── buddies/
    └── buddy-card.tsx
lib/
├── supabase/
│   ├── client.ts              # Browser client
│   ├── server.ts              # Server client
│   └── middleware.ts          # Auth middleware
├── types.ts                   # TypeScript types
└── utils.ts
```

### 1.3 Environment Setup
- Create `.env.local.example` with Supabase credential placeholders
- User creates Supabase project and fills in credentials

### 1.4 Deliverables
- [ ] Dependencies installed
- [ ] Project structure created
- [ ] Supabase client utilities
- [ ] TypeScript types defined
- [ ] `.env.local.example` created

---

## Phase 2: Database Schema (Day 1-2)

### 2.1 Core Tables

```sql
-- Profiles (shared user data)
create table profiles (
  id uuid references auth.users primary key,
  email text not null,
  full_name text not null,
  role text not null check (role in ('facilitator', 'buddy', 'participant')),
  avatar_url text,
  created_at timestamptz default now()
);

-- Research Facilitator profiles
create table facilitator_profiles (
  id uuid references profiles(id) primary key,
  education text,
  discipline text,
  institution text,
  mobile text,
  research_profile_url text,
  research_interests text[]
);

-- Research Buddy profiles  
create table buddy_profiles (
  id uuid references profiles(id) primary key,
  looking_for text,
  education text,
  major text,
  institution text,
  mobile text,
  research_profile_url text,
  research_interests text[]
);

-- Survey Participant profiles (PRIVATE)
create table participant_profiles (
  id uuid references profiles(id) primary key,
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
create table studies (
  id uuid default gen_random_uuid() primary key,
  creator_id uuid references profiles(id) not null,
  title text not null,
  description text not null,
  keywords text[],
  payment_bdt integer,
  duration_minutes integer,
  participant_age_min integer,
  participant_age_max integer,
  participant_gender text,
  participant_geography text[],
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now(),
  approved_at timestamptz
);
```

### 2.2 Row Level Security (RLS)

```sql
-- Enable RLS on all tables
alter table profiles enable row level security;
alter table facilitator_profiles enable row level security;
alter table buddy_profiles enable row level security;
alter table participant_profiles enable row level security;
alter table studies enable row level security;

-- Profiles: users can read all, edit own
create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);
  
create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);
  
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Facilitator profiles: public read, owner write
create policy "Facilitator profiles are viewable"
  on facilitator_profiles for select using (true);
  
create policy "Users can insert own facilitator profile"
  on facilitator_profiles for insert with check (auth.uid() = id);

create policy "Users can update own facilitator profile"
  on facilitator_profiles for update using (auth.uid() = id);

-- Buddy profiles: public read, owner write
create policy "Buddy profiles are viewable"
  on buddy_profiles for select using (true);
  
create policy "Users can insert own buddy profile"
  on buddy_profiles for insert with check (auth.uid() = id);

create policy "Users can update own buddy profile"
  on buddy_profiles for update using (auth.uid() = id);

-- Participant profiles: PRIVATE - only owner can see
create policy "Users can only view own participant profile"
  on participant_profiles for select using (auth.uid() = id);
  
create policy "Users can insert own participant profile"
  on participant_profiles for insert with check (auth.uid() = id);

create policy "Users can update own participant profile"
  on participant_profiles for update using (auth.uid() = id);

-- Studies: anyone can see approved, creators can see own
create policy "Approved studies are public"
  on studies for select using (status = 'approved' or creator_id = auth.uid());
  
create policy "Authenticated users can create studies"
  on studies for insert with check (auth.uid() = creator_id);

create policy "Creators can update pending studies"
  on studies for update using (auth.uid() = creator_id and status = 'pending');
```

### 2.3 Storage Buckets

```sql
-- Create bucket for avatars
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true);

-- Policy: anyone can view, users can upload own
create policy "Avatar images are publicly accessible"
  on storage.objects for select using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert with check (
    bucket_id = 'avatars' and 
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

### 2.4 Deliverables
- [ ] SQL schema file created (`supabase/schema.sql`)
- [ ] RLS policies defined
- [ ] Storage bucket setup included
- [ ] Instructions for running in Supabase

---

## Phase 3: Authentication (Day 2)

### 3.1 Supabase Client Setup
- Browser client (`lib/supabase/client.ts`)
- Server client (`lib/supabase/server.ts`)
- Middleware for auth session (`middleware.ts`)

### 3.2 Auth Pages
- **Login page** (`/login`) - Email/password form
- **Role selection** (`/join`) - Cards for each role
- **Signup forms** (`/join/[role]`) - Dynamic form based on role:
  - `/join/facilitator` → Facilitator form
  - `/join/buddy` → Buddy form  
  - `/join/participant` → Participant form

### 3.3 Auth Flow
1. User clicks "Join as [Role]" from landing or `/join`
2. Shows signup form with role-specific fields
3. On submit:
   - Create Supabase auth user
   - Insert into `profiles` table with role
   - Insert into role-specific table
4. Redirect to dashboard

### 3.4 Deliverables
- [ ] Supabase client utilities
- [ ] Auth middleware
- [ ] Login page
- [ ] Role selection page
- [ ] Signup forms for 3 roles
- [ ] Auth callback handler

---

## Phase 4: Public Pages (Day 2-3)

### 4.1 Landing Page (`/`)
- Hero section with platform tagline
- "What is Match_Research?" explanation
- Role cards: "Join as..." for each role type
- Feature highlights
- CTA buttons

### 4.2 Navigation
- **Navbar**: Logo, Home, Studies, Research Buddies, About, Login/Profile
- **Footer**: Basic links (About, Privacy, Terms), copyright

### 4.3 Static Pages
- `/about` - Simple about page
- `/privacy` - Placeholder privacy policy

### 4.4 Deliverables
- [ ] Landing page
- [ ] Navbar component
- [ ] Footer component
- [ ] About page
- [ ] Privacy page

---

## Phase 5: Study System (Day 3-4) - CORE FEATURE

### 5.1 Study Creation (`/studies/create`)
Form fields:
- Title (required)
- Description (required, textarea)
- Keywords (tag input)
- Payment (BDT number input)
- Duration (minutes)
- Optional filters: age range, gender, geography

Submit → status = 'pending' → Show success message

### 5.2 Study Directory (`/studies`)
- Grid of approved study cards
- Each card shows: title, short description, payment badge, duration badge
- Link to study detail page

### 5.3 Study Detail (`/studies/[id]`)
- Full study information
- Creator info
- "Apply" button (placeholder)
- If owner: show status badge

### 5.4 My Studies (in Account)
- List of user's submitted studies
- Status badges (pending/approved/rejected)

### 5.5 Deliverables
- [ ] Study creation form
- [ ] Study card component
- [ ] Study directory page
- [ ] Study detail page
- [ ] Server actions for study CRUD

---

## Phase 6: Research Buddy Discovery (Day 4)

### 6.1 Buddy Browse (`/buddies`)
- Horizontal scroll container
- Buddy cards showing:
  - Avatar
  - Name
  - Institution
  - Research interests (chips)
  - "What I'm looking for" preview
- "Add to chatbox" button (UI only, no functionality)

### 6.2 Buddy Profile Modal/Page
- Full buddy details
- Contact placeholder

### 6.3 Deliverables
- [ ] Buddy card component
- [ ] Buddies browse page
- [ ] Horizontal scroll layout

---

## Phase 7: Admin Panel (Day 4-5) - CORE FEATURE

### 7.1 Admin Authentication
- Hardcoded admin check: `email === 'admin@matchresearch.com'`
- Admin layout with guard
- Different nav for admin

### 7.2 Study Moderation (`/admin`)
- Tab: Pending Studies
  - List of pending studies
  - Each row: title, creator, date, description preview
  - Actions: Approve / Reject buttons
- Tab: All Studies
  - Full list with status filters
- Tab: Users
  - List users by role (counts)

### 7.3 Admin Actions
- Approve: sets `status = 'approved'`, `approved_at = now()`
- Reject: sets `status = 'rejected'`

### 7.4 Deliverables
- [ ] Admin layout with auth guard
- [ ] Admin dashboard page
- [ ] Pending studies list
- [ ] Approve/reject actions
- [ ] User overview by role

---

## Phase 8: User Dashboard (Day 5)

### 8.1 Account Page (`/account`)
- Profile view/edit
- Role-specific profile fields
- Avatar upload
- My Studies section (for facilitators/buddies)

### 8.2 Dashboard Layout
- Sidebar or top nav for authenticated users
- Quick links: My Profile, My Studies, Browse Studies, Browse Buddies

### 8.3 Deliverables
- [ ] Dashboard layout
- [ ] Account page
- [ ] Profile edit form
- [ ] Avatar upload

---

## Build Priority Order

| Day | Focus | Deliverables |
|-----|-------|--------------|
| **1** | Foundation | Supabase setup, shadcn/ui, project structure, database schema |
| **2** | Auth | Login, signup flows for 3 roles, middleware |
| **3** | Studies Core | Study creation form, directory, detail page |
| **4** | Admin + Buddies | Admin moderation panel, buddy discovery section |
| **5** | Polish + Pages | Landing page, account page, navigation, styling |
| **Buffer** | Testing | Test full demo flow, fix bugs |

---

## Explicitly NOT Included (Post-Demo)

- Community Member role
- Mentor/Trainer role
- Real messaging system
- Email notifications
- Forgot password flow
- Mobile responsive design
- Document uploads for mentors
- Advanced search/filters
- Payments & compensation
- Institutional dashboards

---

## Demo Script

1. **Show landing page** → Explain platform concept
2. **Sign up as Research Facilitator** → Walk through form
3. **Create a study** → Show pending status
4. **Switch browser/incognito → Login as admin**
5. **Show admin panel** → Approve the study
6. **Back to facilitator** → Refresh studies → See approved
7. **Browse Research Buddies** → Show discovery feature
8. **End**: "This is MVP. Here's the roadmap for messaging, payments, etc."

---

## MVP Success Criteria

The MVP is successful if:
- The site feels coherent and intentional
- Users can move through clear flows without explanation
- The client understands how this scales into a full platform
- The demo answers "yes" to: **"Can this actually work?"**
