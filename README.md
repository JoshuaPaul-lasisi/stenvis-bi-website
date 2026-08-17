# Stenvis BI Website

The Stenvis BI marketing site, plus a content hub (blog, videos, podcast) and
an admin area for publishing — including editing the homepage's own facts
(logo, contact info, client industries, case studies, testimonials, team)
without touching code.

## Stack

- **Next.js** (App Router) — hosting on Vercel
- **Supabase** — Postgres database, Auth, and Storage (for cover images/logo)

## Routes

| Route | What it is |
|---|---|
| `/` | The marketing homepage — hero/services/process/FAQ are static, everything else (nav, footer, client industries, case studies, testimonials, team, contact info) is admin-editable |
| `/blog`, `/blog/[slug]` | Blog listing and article pages |
| `/videos` | YouTube video grid |
| `/podcast` | Podcast episode list |
| `/admin/login` | Staff sign-in |
| `/admin` | Dashboard — publish/unpublish/edit/delete every content type below |
| `/admin/settings` | Logo, contact info, homepage stats, client industries, client logo strip |
| `/admin/posts/new`, `/admin/videos/new`, `/admin/podcast/new` | Blog/video/podcast create forms |
| `/admin/case-studies/new`, `/admin/testimonials/new`, `/admin/team/new` | Homepage content create forms |

## One-time setup

The repo is already linked to Vercel and Supabase, but the database schema and
environment variables still need to be set up once.

### 1. Run the database migrations

In the Supabase dashboard: **SQL Editor → New query**, run these in order:

1. [`supabase/migrations/0001_content_hub.sql`](supabase/migrations/0001_content_hub.sql)
   — `posts`, `videos`, `podcast_episodes`, `profiles`, access policies, and a
   public `content-images` storage bucket
2. [`supabase/migrations/0002_site_content.sql`](supabase/migrations/0002_site_content.sql)
   — `site_settings`, `client_industries`, `client_logos`, `case_studies`,
   `testimonials`, `team_members`. Seeded with the site's original hardcoded
   content, so nothing changes visually until you edit something from
   `/admin/settings` or the new content forms.

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
   password for the first staff member, with **Auto Confirm User** checked
   (otherwise sign-in fails with a generic "Invalid login credentials" error).
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
homepage renders with its static sections only (dynamic sections like case
studies/testimonials/team show nothing rather than fake data); `/blog`,
`/videos`, `/podcast`, and `/admin` show a "not yet connected" notice instead
of erroring.

## Project structure

- `app/homepage-hero.html`, `app/homepage-services.html`, `app/homepage-faq-cta.html`
  — the homepage sections that aren't admin-editable, injected as static HTML
  exactly as in the original design
- `app/components-home/` — the homepage sections that *are* admin-editable
  (`AboutSection`, `CaseStudiesSection`, `TestimonialsSection`, `TeamSection`,
  `ContactSection`, `StatsSection`, `LogoStrip`), each a server component
  reading from Supabase
- `app/styles.css` — the original design system (unchanged)
- `app/blog`, `app/videos`, `app/podcast` — public content routes
- `app/admin` — the staff publishing UI (`(protected)` route group requires sign-in)
- `app/actions` — server actions that perform all content writes
- `lib/supabase` — Supabase client helpers (browser + server)
- `lib/content` — shared types and read queries
- `supabase/migrations` — database schema, in order
- `app/content.css` — styling for the content hub and admin, built on the
  design tokens in `app/styles.css`. Both are imported in `app/layout.tsx`
  so Next.js bundles them with a content hash — a fresh, cache-safe URL on
  every deploy.
