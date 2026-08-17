import Logo from '@/components/Logo';
import LoginForm from '@/components/admin/LoginForm';
import { getSiteSettings } from '@/lib/content/queries';

export default async function AdminLoginPage() {
  const settings = await getSiteSettings();

  return (
    <div className="admin-auth-shell">
      <div className="admin-auth-card">
        <div className="logo admin-logo">
          <Logo url={settings.logo_url} />
          Stenvis <span>BI</span>
        </div>
        <h1>Content Admin</h1>
        <p className="form-sub">Sign in to publish posts, videos, and podcast episodes.</p>
        <LoginForm />
      </div>
    </div>
  );
}
