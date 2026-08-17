import Link from 'next/link';
import type { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/server';
import { deletePost, setPostStatus } from '@/app/actions/posts';
import { deleteVideo, setVideoStatus } from '@/app/actions/videos';
import { deleteEpisode, setEpisodeStatus } from '@/app/actions/podcast';
import { deleteCaseStudy, setCaseStudyStatus } from '@/app/actions/case-studies';
import { deleteTestimonial, setTestimonialStatus } from '@/app/actions/testimonials';
import { deleteTeamMember, setTeamMemberStatus } from '@/app/actions/team';
import ConfirmSubmitButton from '@/components/admin/ConfirmSubmitButton';
import type {
  Post,
  Video,
  PodcastEpisode,
  CaseStudy,
  Testimonial,
  TeamMember,
  ContentStatus,
} from '@/lib/content/types';

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { data: posts },
    { data: videos },
    { data: episodes },
    { data: caseStudies },
    { data: testimonials },
    { data: team },
  ] = await Promise.all([
    supabase.from('posts').select('*').order('created_at', { ascending: false }),
    supabase.from('videos').select('*').order('created_at', { ascending: false }),
    supabase.from('podcast_episodes').select('*').order('created_at', { ascending: false }),
    supabase.from('case_studies').select('*').order('display_order', { ascending: true }),
    supabase.from('testimonials').select('*').order('display_order', { ascending: true }),
    supabase.from('team_members').select('*').order('display_order', { ascending: true }),
  ]);

  return (
    <div className="admin-page">
      <h1>Dashboard</h1>

      <AdminSection title="Posts" newHref="/admin/posts/new" count={posts?.length ?? 0}>
        {(posts ?? []).map((post: Post) => (
          <AdminRow
            key={post.id}
            title={post.title}
            meta={post.category ?? 'Uncategorized'}
            status={post.status}
            editHref={`/admin/posts/${post.id}/edit`}
            toggleAction={setPostStatus.bind(null, post.id, post.status === 'published' ? 'draft' : 'published')}
            deleteAction={deletePost.bind(null, post.id)}
          />
        ))}
        {(posts ?? []).length === 0 && <p className="admin-empty-row">No posts yet.</p>}
      </AdminSection>

      <AdminSection title="Videos" newHref="/admin/videos/new" count={videos?.length ?? 0}>
        {(videos ?? []).map((video: Video) => (
          <AdminRow
            key={video.id}
            title={video.title}
            meta={video.category ?? 'Uncategorized'}
            status={video.status}
            editHref={`/admin/videos/${video.id}/edit`}
            toggleAction={setVideoStatus.bind(null, video.id, video.status === 'published' ? 'draft' : 'published')}
            deleteAction={deleteVideo.bind(null, video.id)}
          />
        ))}
        {(videos ?? []).length === 0 && <p className="admin-empty-row">No videos yet.</p>}
      </AdminSection>

      <AdminSection title="Podcast Episodes" newHref="/admin/podcast/new" count={episodes?.length ?? 0}>
        {(episodes ?? []).map((ep: PodcastEpisode) => (
          <AdminRow
            key={ep.id}
            title={ep.title}
            meta={ep.episode_number ? `Episode ${ep.episode_number}` : 'Unnumbered'}
            status={ep.status}
            editHref={`/admin/podcast/${ep.id}/edit`}
            toggleAction={setEpisodeStatus.bind(null, ep.id, ep.status === 'published' ? 'draft' : 'published')}
            deleteAction={deleteEpisode.bind(null, ep.id)}
          />
        ))}
        {(episodes ?? []).length === 0 && <p className="admin-empty-row">No episodes yet.</p>}
      </AdminSection>

      <AdminSection title="Case Studies" newHref="/admin/case-studies/new" count={caseStudies?.length ?? 0}>
        {(caseStudies ?? []).map((cs: CaseStudy) => (
          <AdminRow
            key={cs.id}
            title={cs.title}
            meta={cs.tag}
            status={cs.status}
            editHref={`/admin/case-studies/${cs.id}/edit`}
            toggleAction={setCaseStudyStatus.bind(null, cs.id, cs.status === 'published' ? 'draft' : 'published')}
            deleteAction={deleteCaseStudy.bind(null, cs.id)}
          />
        ))}
        {(caseStudies ?? []).length === 0 && <p className="admin-empty-row">No case studies yet.</p>}
      </AdminSection>

      <AdminSection title="Testimonials" newHref="/admin/testimonials/new" count={testimonials?.length ?? 0}>
        {(testimonials ?? []).map((t: Testimonial) => (
          <AdminRow
            key={t.id}
            title={t.author_name}
            meta={t.author_role}
            status={t.status}
            editHref={`/admin/testimonials/${t.id}/edit`}
            toggleAction={setTestimonialStatus.bind(null, t.id, t.status === 'published' ? 'draft' : 'published')}
            deleteAction={deleteTestimonial.bind(null, t.id)}
          />
        ))}
        {(testimonials ?? []).length === 0 && <p className="admin-empty-row">No testimonials yet.</p>}
      </AdminSection>

      <AdminSection title="Team" newHref="/admin/team/new" count={team?.length ?? 0}>
        {(team ?? []).map((member: TeamMember) => (
          <AdminRow
            key={member.id}
            title={member.name}
            meta={member.role}
            status={member.status}
            editHref={`/admin/team/${member.id}/edit`}
            toggleAction={setTeamMemberStatus.bind(null, member.id, member.status === 'published' ? 'draft' : 'published')}
            deleteAction={deleteTeamMember.bind(null, member.id)}
          />
        ))}
        {(team ?? []).length === 0 && <p className="admin-empty-row">No team members yet.</p>}
      </AdminSection>
    </div>
  );
}

function AdminSection({
  title,
  newHref,
  count,
  children,
}: {
  title: string;
  newHref: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <h2>
          {title} <span className="admin-count">{count}</span>
        </h2>
        <Link href={newHref} className="btn-teal admin-new-btn">
          + New
        </Link>
      </div>
      <div className="admin-table">{children}</div>
    </section>
  );
}

function AdminRow({
  title,
  meta,
  status,
  editHref,
  toggleAction,
  deleteAction,
}: {
  title: string;
  meta: string;
  status: ContentStatus;
  editHref: string;
  toggleAction: () => Promise<void>;
  deleteAction: () => Promise<void>;
}) {
  return (
    <div className="admin-row">
      <div className="admin-row-info">
        <span className={`admin-status-badge ${status}`}>{status}</span>
        <div>
          <div className="admin-row-title">{title}</div>
          <div className="admin-row-meta">{meta}</div>
        </div>
      </div>
      <div className="admin-row-actions">
        <Link href={editHref} className="s-link">
          Edit →
        </Link>
        <form action={toggleAction}>
          <button type="submit" className="admin-icon-btn">
            {status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
        </form>
        <form action={deleteAction}>
          <ConfirmSubmitButton
            className="admin-icon-btn admin-icon-btn-danger"
            confirmMessage={`Delete "${title}"? This can't be undone.`}
          >
            Delete
          </ConfirmSubmitButton>
        </form>
      </div>
    </div>
  );
}
