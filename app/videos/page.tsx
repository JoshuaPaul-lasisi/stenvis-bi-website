import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import WaFloat from '@/components/WaFloat';
import EmptyState from '@/components/EmptyState';
import { getPublishedVideos } from '@/lib/content/queries';
import { isSupabaseConfigured } from '@/lib/supabase/is-configured';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Business intelligence explainers and walkthroughs from the Stenvis BI YouTube channel.',
};

export const revalidate = 60;

export default async function VideosPage() {
  const videos = await getPublishedVideos();

  return (
    <>
      <SiteNav />
      <WaFloat />

      <section className="content-hero">
        <div className="content-hero-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>Watch</div>
          <h1 className="section-title">
            Stenvis BI <span className="grad-text">Videos</span>
          </h1>
          <p className="section-sub">
            Walkthroughs, explainers, and behind-the-scenes from our YouTube channel.
          </p>
        </div>
      </section>

      <section className="content-section">
        <div className="max-w">
          {videos.length === 0 ? (
            <EmptyState
              title={isSupabaseConfigured() ? "Our channel is coming soon" : 'Videos not yet connected'}
              body={
                isSupabaseConfigured()
                  ? "We're setting up our YouTube channel — first videos will appear here shortly."
                  : 'This site is not yet connected to its content database. See the setup instructions in the README.'
              }
            />
          ) : (
            <div className="media-grid">
              {videos.map((video) => (
                <div key={video.id} className="media-card">
                  <div className="media-embed">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtube_id}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="media-card-body">
                    {video.category && <div className="case-tag">{video.category}</div>}
                    <h3>{video.title}</h3>
                    {video.description && <p className="challenge">{video.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
