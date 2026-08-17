# Stenvis BI Website

The Stenvis BI marketing site, plus a content hub (blog, videos, podcast) with a
password-protected admin area for publishing.

The homepage (`/`) is the original hand-built static page, preserved byte-for-byte
and now served through Next.js so it can sit alongside the new content routes.

## Stack

- **Next.js** (App Router) — hosting on Vercel
- **Supabase** — Postgres database, Auth, and Storage (for cover images)

## Routes

| Route | What it is |
|---|---|
| `/` | The existing marketing homepage (unchanged) |
| `/blog`, `/blog/[slug]` | Blog listing and article pages |
| `/videos` | YouTube video grid |
| `/podcast` | Podcast episode list |
| `/admin/login` | Staff sign-in |
| `/admin` | Dashboard — publish/unpublish/edit/delete posts, videos, episodes |
| `/admin/posts/new`, `/admin/videos/new`, `/admin/podcast/new` | Create forms |

## One-time setup

The repo is already linked to Vercel and Supabase, but the database schema and
environment variables still need to be set up once.

### 1. Run the database migration

In the Supabase dashboard: **SQL Editor → New query**, paste the contents of
[`supabase/migrations/0001_content_hub.sql`](supabase/migrations/0001_content_hub.sql),
and run it. This creates the `posts`, `videos`, `podcast_episodes`, and
`profiles` tables, their access policies, and a public `content-images`
storage bucket for cover images.

### 2. Set environment variables

Copy `.env.local.example` to `.env.local` for local development, and add the
same two values in the Vercel project (**Settings → Environment Variables**):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Both are on the Supabase dashboard under **Project Settings → API**.

### 3. Create the first admin account

Staff accounts are created by an admin, not via public sign-up (`/admin/login`
is sign-in only). In the Supabase dashboard:

1. **Authentication → Users → Add user** — create an account with an email and
   password for the first staff member.
2. A matching row is created automatically in `profiles` with `role = 'editor'`.
   To grant full admin rights, run in the SQL editor:
   ```sql
   update public.profiles set role = 'admin' where id = '<the user's UUID>';
   ```
3. Repeat step 1 for each additional staff member who should be able to
   publish content (they'll default to `editor`, which is enough to publish).

Once that's done, sign in at `/admin/login` and start publishing.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Without the Supabase env vars set, the
homepage and marketing pages work as normal; `/blog`, `/videos`, `/podcast`,
and `/admin` show a "not yet connected" notice instead of erroring.

## Project structure

- `app/homepage-content.html`, `public/styles.css`, `public/script.js` — the
  original static homepage, untouched
- `app/blog`, `app/videos`, `app/podcast` — public content routes
- `app/admin` — the staff publishing UI (`(protected)` route group requires sign-in)
- `app/actions` — server actions that perform all content writes
- `lib/supabase` — Supabase client helpers (browser + server)
- `lib/content` — shared types and read queries
- `supabase/migrations` — database schema
- `public/content.css` — styling for the content hub and admin, built on the
  design tokens in `public/styles.css`
