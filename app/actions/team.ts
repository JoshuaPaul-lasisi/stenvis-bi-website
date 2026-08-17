'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireEditor } from '@/app/actions/require-editor';

export async function saveTeamMember(formData: FormData) {
  const { supabase } = await requireEditor();

  const id = formData.get('id')?.toString() || undefined;
  const name = formData.get('name')?.toString().trim() || '';
  const role = formData.get('role')?.toString().trim() || '';
  const bio = formData.get('bio')?.toString().trim() || '';
  const avatar_initials = formData.get('avatar_initials')?.toString().trim().slice(0, 3).toUpperCase() || '';
  const skills = (formData.get('skills')?.toString() || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const display_order = Number.parseInt(formData.get('display_order')?.toString() || '0', 10) || 0;
  const status = formData.get('status')?.toString() === 'published' ? 'published' : 'draft';

  if (!name || !role) {
    throw new Error('Name and role are required.');
  }

  const payload = { name, role, bio, avatar_initials, skills, display_order, status, updated_at: new Date().toISOString() };

  const { error } = id
    ? await supabase.from('team_members').update(payload).eq('id', id)
    : await supabase.from('team_members').insert(payload);

  if (error) throw new Error(error.message);

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteTeamMember(id: string) {
  const { supabase } = await requireEditor();
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function setTeamMemberStatus(id: string, status: 'draft' | 'published') {
  const { supabase } = await requireEditor();
  const { error } = await supabase.from('team_members').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/');
  revalidatePath('/admin');
}
