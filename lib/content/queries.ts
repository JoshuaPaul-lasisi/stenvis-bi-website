import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/is-configured';
import type {
  CaseStudy,
  ClientIndustry,
  ClientLogo,
  PodcastEpisode,
  Post,
  SiteSettings,
  TeamMember,
  Testimonial,
  Video,
} from '@/lib/content/types';

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: true,
  logo_url: null,
  phone: '+234 903 790 6304',
  email: 'info@stenvisbi.com',
  whatsapp_number: '2349037906304',
  location_line1: 'Lagos, Nigeria',
  location_line2: 'Remote-first — serving clients across Africa',
  stat_businesses: 50,
  stat_satisfaction: 98,
  stat_dashboards: 100,
  stat_years: 5,
};

export async function getPublishedPosts(): Promise<Post[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return data ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();
  return data ?? null;
}

export async function getPublishedVideos(): Promise<Video[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });
  return data ?? [];
}

export async function getPublishedEpisodes(): Promise<PodcastEpisode[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from('podcast_episodes')
    .select('*')
    .eq('status', 'published')
    .order('episode_number', { ascending: false });
  return data ?? [];
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured()) return DEFAULT_SITE_SETTINGS;
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('*').eq('id', true).maybeSingle();
  return data ?? DEFAULT_SITE_SETTINGS;
}

export async function getClientIndustries(): Promise<ClientIndustry[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase.from('client_industries').select('*').order('display_order', { ascending: true });
  return data ?? [];
}

export async function getClientLogos(): Promise<ClientLogo[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase.from('client_logos').select('*').order('display_order', { ascending: true });
  return data ?? [];
}

export async function getPublishedCaseStudies(): Promise<CaseStudy[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from('case_studies')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true });
  return data ?? [];
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true });
  return data ?? [];
}

export async function getPublishedTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from('team_members')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true });
  return data ?? [];
}
