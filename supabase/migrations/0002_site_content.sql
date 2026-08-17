-- Admin-editable homepage content: logo, contact info, client industries,
-- client logo strip, case studies, testimonials, team members.
--
-- Run this once in the Supabase SQL editor, after 0001_content_hub.sql.
-- Seed data below matches the site's current hardcoded content exactly, so
-- nothing changes visually on deploy — it just becomes editable from /admin.

-- ─── site_settings (single row) ────────────────────────────────────────
create table if not exists public.site_settings (
  id boolean primary key default true check (id),
  logo_url text,
  phone text not null default '+234 903 790 6304',
  email text not null default 'info@stenvisbi.com',
  whatsapp_number text not null default '2349037906304',
  location_line1 text not null default 'Lagos, Nigeria',
  location_line2 text not null default 'Remote-first — serving clients across Africa',
  stat_businesses integer not null default 50,
  stat_satisfaction integer not null default 98,
  stat_dashboards integer not null default 100,
  stat_years integer not null default 5,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Site settings are public"
  on public.site_settings for select
  using (true);

create policy "Editors manage site settings"
  on public.site_settings for all
  using (public.is_editor())
  with check (public.is_editor());

insert into public.site_settings (id) values (true) on conflict (id) do nothing;

-- ─── client_industries ──────────────────────────────────────────────────
create table if not exists public.client_industries (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  percentage integer not null check (percentage between 0 and 100),
  color text not null default '#00AD8E',
  display_order integer not null default 0
);

alter table public.client_industries enable row level security;

create policy "Client industries are public"
  on public.client_industries for select
  using (true);

create policy "Editors manage client industries"
  on public.client_industries for all
  using (public.is_editor())
  with check (public.is_editor());

insert into public.client_industries (label, percentage, color, display_order) values
  ('Retail & FMCG', 42, '#00AD8E', 1),
  ('Fintech & Finance', 35, '#F59E0B', 2),
  ('Healthcare & Other', 23, '#7C3AED', 3);

-- ─── client_logos ───────────────────────────────────────────────────────
create table if not exists public.client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  display_order integer not null default 0
);

alter table public.client_logos enable row level security;

create policy "Client logos are public"
  on public.client_logos for select
  using (true);

create policy "Editors manage client logos"
  on public.client_logos for all
  using (public.is_editor())
  with check (public.is_editor());

insert into public.client_logos (name, display_order) values
  ('RetailMax', 1),
  ('FinPulse', 2),
  ('MedCore Health', 3),
  ('AgriLink NG', 4),
  ('TechBridge', 5),
  ('CrestFoods', 6);

-- ─── case_studies ───────────────────────────────────────────────────────
create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  tag text not null,
  title text not null,
  challenge text not null,
  metrics jsonb not null default '[]',
  display_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.case_studies enable row level security;

create policy "Published case studies are public"
  on public.case_studies for select
  using (status = 'published' or public.is_editor());

create policy "Editors manage case studies"
  on public.case_studies for all
  using (public.is_editor())
  with check (public.is_editor());

insert into public.case_studies (tag, title, challenge, metrics, display_order) values
  (
    'Retail & FMCG', 'RetailMax Nigeria — Sales Intelligence Overhaul',
    'Could not identify which product lines were profitable vs. volume-driven. Management decisions took 2–3 weeks due to scattered spreadsheets.',
    '[{"value":"3×","label":"Faster decisions"},{"value":"18%","label":"Margin improvement"},{"value":"6wks","label":"To full rollout"}]',
    1
  ),
  (
    'Fintech', 'FinPulse — Investor-Ready Feasibility Study',
    'Early-stage startup needed a credible market study and financial model for Series A investors with a tight 6-week deadline.',
    '[{"value":"₦120M","label":"Funding raised"},{"value":"4wks","label":"Delivered in"},{"value":"100%","label":"Investor approval"}]',
    2
  ),
  (
    'Healthcare', 'MedCore Health — Internal BI Capability Building',
    'Analytics team relied fully on external consultants for every report. Leadership wanted internal BI self-sufficiency across 4 departments.',
    '[{"value":"10×","label":"Analytics output"},{"value":"4","label":"Teams trained"},{"value":"60%","label":"Cost reduction"}]',
    3
  );

-- ─── testimonials ───────────────────────────────────────────────────────
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author_name text not null,
  author_role text not null,
  avatar_initials text not null default '',
  stars integer not null default 5 check (stars between 1 and 5),
  display_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "Published testimonials are public"
  on public.testimonials for select
  using (status = 'published' or public.is_editor());

create policy "Editors manage testimonials"
  on public.testimonials for all
  using (public.is_editor())
  with check (public.is_editor());

insert into public.testimonials (quote, author_name, author_role, avatar_initials, stars, display_order) values
  (
    'Stenvis BI helped us transform raw data into actionable insights. Their dashboards gave our management team clarity we never had before. Decision-making is now 3× faster and our margins have improved meaningfully.',
    'Adebayo Okafor', 'CEO, RetailMax Nigeria', 'AO', 5, 1
  ),
  (
    'As a startup, cost was our biggest concern. Stenvis BI offered us pricing that made sense without compromising quality. The feasibility study they delivered was a game-changer — our investors were genuinely impressed.',
    'Fatima Kabir', 'Co-founder, FinPulse', 'FK', 4, 2
  ),
  (
    'The training workshop they ran for our team was exceptional. Our analysts are now self-sufficient and our BI output has grown 10× since we started working with Stenvis. Best investment we made this year.',
    'Chioma Eze', 'Head of Strategy, MedCore Health', 'CE', 5, 3
  );

-- ─── team_members ───────────────────────────────────────────────────────
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text not null,
  skills text[] not null default '{}',
  avatar_initials text not null default '',
  display_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_members enable row level security;

create policy "Published team members are public"
  on public.team_members for select
  using (status = 'published' or public.is_editor());

create policy "Editors manage team members"
  on public.team_members for all
  using (public.is_editor())
  with check (public.is_editor());

insert into public.team_members (name, role, bio, skills, avatar_initials, display_order) values
  (
    'Oluwaseun Stenvis', 'Founder & Lead BI Consultant',
    '5+ years building data solutions for Nigerian SMEs and multinationals. Former data lead at a Lagos-based fintech.',
    array['Power BI', 'SQL', 'Strategy'], 'OS', 1
  ),
  (
    'Amina Abubakar', 'Data Scientist & Analytics Engineer',
    'Predictive modelling specialist with experience in FMCG demand forecasting and financial services risk analytics.',
    array['Python', 'ML Models', 'Tableau'], 'AA', 2
  ),
  (
    'Taiwo Idowu', 'Research & Feasibility Lead',
    'Market research expert who has delivered investor-grade studies for 20+ startups across West Africa across sectors from agritech to healthtech.',
    array['Research', 'Finance', 'Excel'], 'TI', 3
  );

-- ─── storage: logo upload reuses the content-images bucket from 0001 ────
-- (public read, editor-only write — already covers arbitrary image uploads)
