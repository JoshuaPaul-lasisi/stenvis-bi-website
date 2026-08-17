-- Content hub schema: blog posts, videos, podcast episodes, and the
-- editor/admin profiles that are allowed to publish them.
--
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).

-- ─── profiles ───────────────────────────────────────────────────────────
-- One row per auth.users entry. New signups default to 'editor'; promote
-- someone to 'admin' manually, e.g.:
--   update public.profiles set role = 'admin' where id = '<user-uuid>';
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('editor', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are editable by their owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Shared helper: is the current user an editor/admin?
create or replace function public.is_editor()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('editor', 'admin')
  );
$$;

-- ─── posts ──────────────────────────────────────────────────────────────
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  cover_image_url text,
  body_markdown text not null default '',
  category text,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_id uuid references public.profiles (id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts enable row level security;

create policy "Published posts are public"
  on public.posts for select
  using (status = 'published' or public.is_editor());

create policy "Editors manage posts"
  on public.posts for all
  using (public.is_editor())
  with check (public.is_editor());

-- ─── videos ─────────────────────────────────────────────────────────────
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  youtube_id text not null,
  category text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.videos enable row level security;

create policy "Published videos are public"
  on public.videos for select
  using (status = 'published' or public.is_editor());

create policy "Editors manage videos"
  on public.videos for all
  using (public.is_editor())
  with check (public.is_editor());

-- ─── podcast_episodes ───────────────────────────────────────────────────
create table if not exists public.podcast_episodes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  episode_number integer,
  audio_url text,
  spotify_url text,
  apple_url text,
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.podcast_episodes enable row level security;

create policy "Published episodes are public"
  on public.podcast_episodes for select
  using (status = 'published' or public.is_editor());

create policy "Editors manage episodes"
  on public.podcast_episodes for all
  using (public.is_editor())
  with check (public.is_editor());

-- ─── storage: cover images ──────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;

create policy "Content images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'content-images');

create policy "Editors upload content images"
  on storage.objects for insert
  with check (bucket_id = 'content-images' and public.is_editor());

create policy "Editors manage content images"
  on storage.objects for update
  using (bucket_id = 'content-images' and public.is_editor());

create policy "Editors delete content images"
  on storage.objects for delete
  using (bucket_id = 'content-images' and public.is_editor());
