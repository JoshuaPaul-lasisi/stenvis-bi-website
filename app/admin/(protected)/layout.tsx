import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/is-configured';
import SignOutButton from '@/components/admin/SignOutButton';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="admin-shell">
        <main className="admin-main">
          <div className="admin-setup-notice">
            <h2>Content database not connected</h2>
            <p>
              Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, run the
              migration, then redeploy. See the README for setup steps.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).maybeSingle();
  if (!profile || (profile.role !== 'editor' && profile.role !== 'admin')) {
    redirect('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="logo admin-logo">
          <div className="logo-icon">📊</div>
          Stenvis <span>BI</span>
        </Link>
        <nav className="admin-sidebar-nav">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/posts/new">+ New Post</Link>
          <Link href="/admin/videos/new">+ New Video</Link>
          <Link href="/admin/podcast/new">+ New Episode</Link>
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-user">{profile.full_name || user.email}</div>
          <SignOutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
