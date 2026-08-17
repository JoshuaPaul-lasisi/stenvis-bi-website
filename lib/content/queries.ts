import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/is-configured';
import type { PodcastEpisode, Post, Video } from '@/lib/content/types';

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
