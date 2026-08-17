'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="admin-auth-shell">
      <form className="admin-auth-card" onSubmit={handleSubmit}>
        <div className="logo admin-logo">
          <div className="logo-icon">📊</div>
          Stenvis <span>BI</span>
        </div>
        <h1>Content Admin</h1>
        <p className="form-sub">Sign in to publish posts, videos, and podcast episodes.</p>
        {error && <div className="admin-error">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button
          type="submit"
          className="btn-teal"
          disabled={loading}
          style={{ width: '100%', justifyContent: 'center', border: 'none' }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
        <p className="admin-auth-note">
          Accounts are created by an existing admin in the Supabase dashboard — this page is sign-in only.
        </p>
      </form>
    </div>
  );
}
