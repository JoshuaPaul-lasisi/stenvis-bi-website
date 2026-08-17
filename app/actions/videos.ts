'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireEditor } from '@/app/actions/require-editor';

function extractYoutubeId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : trimmed;
}

export async function saveVideo(formData: FormData) {
  const { supabase } = await requireEditor();

  const id = formData.get('id')?.toString() || undefined;
  const title = formData.get('title')?.toString().trim() || '';
  const description = formData.get('description')?.toString().trim() || null;
  const youtube_id = extractYoutubeId(formData.get('youtube_url')?.toString() || '');
  const category = formData.get('category')?.toString().trim() || null;
  const status = formData.get('status')?.toString() === 'published' ? 'published' : 'draft';

  if (!title || !youtube_id) {
    throw new Error('Title and a YouTube URL/ID are required.');
  }

  let published_at: string | null = null;
  if (status === 'published') {
    if (id) {
      const { data: existing } = await supabase.from('videos').select('published_at').eq('id', id).maybeSingle();
      published_at = existing?.published_at ?? new Date().toISOString();
    } else {
      published_at = new Date().toISOString();
    }
  }

  const payload = {
    title,
    description,
    youtube_id,
    category,
    status,
    published_at,
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await supabase.from('videos').update(payload).eq('id', id)
    : await supabase.from('videos').insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath('/videos');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteVideo(id: string) {
  const { supabase } = await requireEditor();
  const { error } = await supabase.from('videos').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/videos');
  revalidatePath('/admin');
}

export async function setVideoStatus(id: string, status: 'draft' | 'published') {
  const { supabase } = await requireEditor();

  let published_at: string | null = null;
  if (status === 'published') {
    const { data: existing } = await supabase.from('videos').select('published_at').eq('id', id).maybeSingle();
    published_at = existing?.published_at ?? new Date().toISOString();
  }

  const { error } = await supabase.from('videos').update({ status, published_at }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/videos');
  revalidatePath('/admin');
}
