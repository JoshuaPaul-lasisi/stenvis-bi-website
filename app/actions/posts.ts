'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireEditor } from '@/app/actions/require-editor';

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function savePost(formData: FormData) {
  const { supabase, user } = await requireEditor();

  const id = formData.get('id')?.toString() || undefined;
  const title = formData.get('title')?.toString().trim() || '';
  const slugInput = formData.get('slug')?.toString().trim();
  const slug = slugify(slugInput || title);
  const excerpt = formData.get('excerpt')?.toString().trim() || null;
  const cover_image_url = formData.get('cover_image_url')?.toString().trim() || null;
  const body_markdown = formData.get('body_markdown')?.toString() || '';
  const category = formData.get('category')?.toString().trim() || null;
  const tags = (formData.get('tags')?.toString() || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  const status = formData.get('status')?.toString() === 'published' ? 'published' : 'draft';

  if (!title || !slug) {
    throw new Error('Title is required.');
  }

  let published_at: string | null = null;
  if (status === 'published') {
    if (id) {
      const { data: existing } = await supabase.from('posts').select('published_at').eq('id', id).maybeSingle();
      published_at = existing?.published_at ?? new Date().toISOString();
    } else {
      published_at = new Date().toISOString();
    }
  }

  const payload = {
    title,
    slug,
    excerpt,
    cover_image_url,
    body_markdown,
    category,
    tags,
    status,
    author_id: user.id,
    published_at,
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await supabase.from('posts').update(payload).eq('id', id)
    : await supabase.from('posts').insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath('/blog');
  revalidatePath(`/blog/${slug}`);
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deletePost(id: string) {
  const { supabase } = await requireEditor();
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/blog');
  revalidatePath('/admin');
}

export async function setPostStatus(id: string, status: 'draft' | 'published') {
  const { supabase } = await requireEditor();

  let published_at: string | null = null;
  if (status === 'published') {
    const { data: existing } = await supabase.from('posts').select('published_at').eq('id', id).maybeSingle();
    published_at = existing?.published_at ?? new Date().toISOString();
  }

  const { error } = await supabase.from('posts').update({ status, published_at }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/blog');
  revalidatePath('/admin');
}
