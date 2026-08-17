export type ContentStatus = 'draft' | 'published';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body_markdown: string;
  category: string | null;
  tags: string[];
  status: ContentStatus;
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string | null;
  youtube_id: string;
  category: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  description: string | null;
  episode_number: number | null;
  audio_url: string | null;
  spotify_url: string | null;
  apple_url: string | null;
  cover_image_url: string | null;
  status: ContentStatus;
  published_at: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: 'editor' | 'admin';
  created_at: string;
}
