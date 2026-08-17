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

export interface SiteSettings {
  id: true;
  logo_url: string | null;
  phone: string;
  email: string;
  whatsapp_number: string;
  location_line1: string;
  location_line2: string;
  stat_businesses: number;
  stat_satisfaction: number;
  stat_dashboards: number;
  stat_years: number;
}

export interface ClientIndustry {
  id: string;
  label: string;
  percentage: number;
  color: string;
  display_order: number;
}

export interface ClientLogo {
  id: string;
  name: string;
  display_order: number;
}

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  challenge: string;
  metrics: CaseStudyMetric[];
  display_order: number;
  status: ContentStatus;
}

export interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  avatar_initials: string;
  stars: number;
  display_order: number;
  status: ContentStatus;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  avatar_initials: string;
  display_order: number;
  status: ContentStatus;
}
