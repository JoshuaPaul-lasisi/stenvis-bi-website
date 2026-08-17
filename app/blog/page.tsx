import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import WaFloat from '@/components/WaFloat';
import EmptyState from '@/components/EmptyState';
import { getPublishedPosts } from '@/lib/content/queries';
import { isSupabaseConfigured } from '@/lib/supabase/is-configured';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Business intelligence insights, case analyses, and lessons from the field — from the Stenvis BI team.',
};

export const revalidate = 60;

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = await getPublishedPosts();
  const categories = Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => Boolean(c))));
  const filtered = category ? posts.filter((p) => p.category === category) : posts;

  return (
    <>
      <SiteNav />
      <WaFloat />

      <section className="content-hero">
        <div className="content-hero-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>Insights</div>
          <h1 className="section-title">
            The Stenvis BI <span className="grad-text">Blog</span>
          </h1>
          <p className="section-sub">
            Long and short-form articles, business case analyses, and lessons from the field.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="max-w">
          {categories.length > 0 && (
            <div className="category-filter">
              <Link href="/blog" className={!category ? 'cat-chip active' : 'cat-chip'}>
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/blog?category=${encodeURIComponent(c)}`}
                  className={category === c ? 'cat-chip active' : 'cat-chip'}
                >
                  {c}
                </Link>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              title={isSupabaseConfigured() ? 'No articles published yet' : 'Blog not yet connected'}
              body={
                isSupabaseConfigured()
                  ? "We're working on our first case analyses — check back soon."
                  : 'This site is not yet connected to its content database. See the setup instructions in the README.'
              }
            />
          ) : (
            <div className="post-grid">
              {filtered.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="post-card">
                  <div
                    className="post-card-media"
                    style={post.cover_image_url ? { backgroundImage: `url(${post.cover_image_url})` } : undefined}
                  >
                    {!post.cover_image_url && <span className="post-card-media-fallback">📊</span>}
                  </div>
                  <div className="post-card-body">
                    {post.category && <div className="case-tag">{post.category}</div>}
                    <h3>{post.title}</h3>
                    {post.excerpt && <p className="challenge">{post.excerpt}</p>}
                    {post.published_at && (
                      <div className="post-card-date">
                        {new Date(post.published_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
