'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireEditor } from '@/app/actions/require-editor';

export async function saveTestimonial(formData: FormData) {
  const { supabase } = await requireEditor();

  const id = formData.get('id')?.toString() || undefined;
  const quote = formData.get('quote')?.toString().trim() || '';
  const author_name = formData.get('author_name')?.toString().trim() || '';
  const author_role = formData.get('author_role')?.toString().trim() || '';
  const avatar_initials = formData.get('avatar_initials')?.toString().trim().slice(0, 3).toUpperCase() || '';
  const stars = Math.max(1, Math.min(5, Number.parseInt(formData.get('stars')?.toString() || '5', 10) || 5));
  const display_order = Number.parseInt(formData.get('display_order')?.toString() || '0', 10) || 0;
  const status = formData.get('status')?.toString() === 'published' ? 'published' : 'draft';

  if (!quote || !author_name) {
    throw new Error('Quote and author name are required.');
  }

  const payload = {
    quote,
    author_name,
    author_role,
    avatar_initials,
    stars,
    display_order,
    status,
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await supabase.from('testimonials').update(payload).eq('id', id)
    : await supabase.from('testimonials').insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteTestimonial(id: string) {
  const { supabase } = await requireEditor();
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function setTestimonialStatus(id: string, status: 'draft' | 'published') {
  const { supabase } = await requireEditor();
  const { error } = await supabase.from('testimonials').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin');
}
