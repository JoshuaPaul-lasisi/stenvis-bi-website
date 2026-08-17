'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireEditor } from '@/app/actions/require-editor';

function parseRows<T>(formData: FormData, field: string): T[] {
  const raw = formData.get(field)?.toString() || '[]';
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveSiteContent(formData: FormData) {
  const { supabase } = await requireEditor();

  const settingsPayload = {
    id: true,
    logo_url: formData.get('logo_url')?.toString().trim() || null,
    phone: formData.get('phone')?.toString().trim() || '',
    email: formData.get('email')?.toString().trim() || '',
    whatsapp_number: formData.get('whatsapp_number')?.toString().trim().replace(/\D/g, '') || '',
    location_line1: formData.get('location_line1')?.toString().trim() || '',
    location_line2: formData.get('location_line2')?.toString().trim() || '',
    stat_businesses: Number.parseInt(formData.get('stat_businesses')?.toString() || '0', 10) || 0,
    stat_satisfaction: Number.parseInt(formData.get('stat_satisfaction')?.toString() || '0', 10) || 0,
    stat_dashboards: Number.parseInt(formData.get('stat_dashboards')?.toString() || '0', 10) || 0,
    stat_years: Number.parseInt(formData.get('stat_years')?.toString() || '0', 10) || 0,
    updated_at: new Date().toISOString(),
  };

  const { error: settingsError } = await supabase.from('site_settings').upsert(settingsPayload);
  if (settingsError) throw new Error(settingsError.message);

  const industries = parseRows<{ label: string; percentage: number; color: string }>(formData, 'industries_json')
    .filter((row) => row.label?.trim())
    .map((row, i) => ({
      label: row.label.trim(),
      percentage: Math.max(0, Math.min(100, Number(row.percentage) || 0)),
      color: row.color || '#00AD8E',
      display_order: i + 1,
    }));

  const { error: deleteIndustriesError } = await supabase
    .from('client_industries')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteIndustriesError) throw new Error(deleteIndustriesError.message);
  if (industries.length > 0) {
    const { error: insertIndustriesError } = await supabase.from('client_industries').insert(industries);
    if (insertIndustriesError) throw new Error(insertIndustriesError.message);
  }

  const logos = parseRows<{ name: string }>(formData, 'logos_json')
    .filter((row) => row.name?.trim())
    .map((row, i) => ({ name: row.name.trim(), display_order: i + 1 }));

  const { error: deleteLogosError } = await supabase
    .from('client_logos')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');
  if (deleteLogosError) throw new Error(deleteLogosError.message);
  if (logos.length > 0) {
    const { error: insertLogosError } = await supabase.from('client_logos').insert(logos);
    if (insertLogosError) throw new Error(insertLogosError.message);
  }

  revalidatePath('/');
  revalidatePath('/admin/settings');
  redirect('/admin/settings');
}
