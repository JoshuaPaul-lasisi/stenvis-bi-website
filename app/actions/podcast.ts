'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireEditor } from '@/app/actions/require-editor';

export async function saveEpisode(formData: FormData) {
  const { supabase } = await requireEditor();

  const id = formData.get('id')?.toString() || undefined;
  const title = formData.get('title')?.toString().trim() || '';
  const description = formData.get('description')?.toString().trim() || null;
  const episodeNumberRaw = formData.get('episode_number')?.toString().trim();
  const episode_number = episodeNumberRaw ? Number.parseInt(episodeNumberRaw, 10) : null;
  const audio_url = formData.get('audio_url')?.toString().trim() || null;
  const spotify_url = formData.get('spotify_url')?.toString().trim() || null;
  const apple_url = formData.get('apple_url')?.toString().trim() || null;
  const cover_image_url = formData.get('cover_image_url')?.toString().trim() || null;
  const status = formData.get('status')?.toString() === 'published' ? 'published' : 'draft';

  if (!title) {
    throw new Error('Title is required.');
  }

  let published_at: string | null = null;
  if (status === 'published') {
    if (id) {
      const { data: existing } = await supabase
        .from('podcast_episodes')
        .select('published_at')
        .eq('id', id)
        .maybeSingle();
      published_at = existing?.published_at ?? new Date().toISOString();
    } else {
      published_at = new Date().toISOString();
    }
  }

  const payload = {
    title,
    description,
    episode_number: episode_number !== null && !Number.isNaN(episode_number) ? episode_number : null,
    audio_url,
    spotify_url,
    apple_url,
    cover_image_url,
    status,
    published_at,
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await supabase.from('podcast_episodes').update(payload).eq('id', id)
    : await supabase.from('podcast_episodes').insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath('/podcast');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteEpisode(id: string) {
  const { supabase } = await requireEditor();
  const { error } = await supabase.from('podcast_episodes').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/podcast');
  revalidatePath('/admin');
}

export async function setEpisodeStatus(id: string, status: 'draft' | 'published') {
  const { supabase } = await requireEditor();

  let published_at: string | null = null;
  if (status === 'published') {
    const { data: existing } = await supabase
      .from('podcast_episodes')
      .select('published_at')
      .eq('id', id)
      .maybeSingle();
    published_at = existing?.published_at ?? new Date().toISOString();
  }

  const { error } = await supabase.from('podcast_episodes').update({ status, published_at }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/podcast');
  revalidatePath('/admin');
}
