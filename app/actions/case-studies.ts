'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireEditor } from '@/app/actions/require-editor';

function parseMetrics(formData: FormData): { value: string; label: string }[] {
  const raw = formData.get('metrics_json')?.toString() || '[]';
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((m) => m?.value?.trim() && m?.label?.trim())
      .map((m) => ({ value: String(m.value).trim(), label: String(m.label).trim() }));
  } catch {
    return [];
  }
}

export async function saveCaseStudy(formData: FormData) {
  const { supabase } = await requireEditor();

  const id = formData.get('id')?.toString() || undefined;
  const tag = formData.get('tag')?.toString().trim() || '';
  const title = formData.get('title')?.toString().trim() || '';
  const challenge = formData.get('challenge')?.toString().trim() || '';
  const display_order = Number.parseInt(formData.get('display_order')?.toString() || '0', 10) || 0;
  const status = formData.get('status')?.toString() === 'published' ? 'published' : 'draft';
  const metrics = parseMetrics(formData);

  if (!title || !tag) {
    throw new Error('Tag and title are required.');
  }

  const payload = { tag, title, challenge, metrics, display_order, status, updated_at: new Date().toISOString() };

  const { error } = id
    ? await supabase.from('case_studies').update(payload).eq('id', id)
    : await supabase.from('case_studies').insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteCaseStudy(id: string) {
  const { supabase } = await requireEditor();
  const { error } = await supabase.from('case_studies').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function setCaseStudyStatus(id: string, status: 'draft' | 'published') {
  const { supabase } = await requireEditor();
  const { error } = await supabase.from('case_studies').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin');
}
