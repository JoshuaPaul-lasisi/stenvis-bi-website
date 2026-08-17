import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import WaFloat from '@/components/WaFloat';
import { getPostBySlug } from '@/lib/content/queries';
import { renderMarkdown } from '@/lib/markdown';

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
      type: 'article',
      publishedTime: post.published_at ?? undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.body_markdown);
  const dateLabel = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <>
      <SiteNav />
      <WaFloat />
      <article className="article">
        <div className="article-inner">
          <Link href="/blog" className="article-back">← Back to Blog</Link>
          {post.category && <div className="case-tag">{post.category}</div>}
          <h1 className="article-title">{post.title}</h1>
          {dateLabel && <div className="article-meta">{dateLabel}</div>}
          {post.cover_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.cover_image_url} alt="" className="article-cover" />
          )}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />
          {post.tags.length > 0 && (
            <div className="article-tags">
              {post.tags.map((t) => (
                <span key={t} className="skill-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
      <SiteFooter />
    </>
  );
}
