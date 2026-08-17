import 'server-only';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

/**
 * App-layer gate for a nicer redirect UX. RLS policies (see
 * supabase/migrations/0001_content_hub.sql) are the real enforcement — every
 * write below still goes through the RLS-respecting session client, so a bug
 * here can't grant unauthorized writes.
 */
export async function requireEditor() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle();
  if (!profile || (profile.role !== 'editor' && profile.role !== 'admin')) {
    redirect('/admin/login');
  }

  return { supabase, user };
}
