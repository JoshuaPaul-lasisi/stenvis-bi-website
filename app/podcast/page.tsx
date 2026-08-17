import type { Metadata } from 'next';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import WaFloat from '@/components/WaFloat';
import EmptyState from '@/components/EmptyState';
import { getPublishedEpisodes, getSiteSettings } from '@/lib/content/queries';
import { isSupabaseConfigured } from '@/lib/supabase/is-configured';

export const metadata: Metadata = {
  title: 'Podcast',
  description: 'Conversations on business, data, and growth from the Stenvis BI podcast.',
};

export const revalidate = 60;

export default async function PodcastPage() {
  const [episodes, settings] = await Promise.all([getPublishedEpisodes(), getSiteSettings()]);

  return (
    <>
      <SiteNav logoUrl={settings.logo_url} />
      <WaFloat number={settings.whatsapp_number} />

      <section className="content-hero">
        <div className="content-hero-inner">
          <div className="section-label" style={{ justifyContent: 'center' }}>Listen</div>
          <h1 className="section-title">
            The Stenvis BI <span className="grad-text">Podcast</span>
          </h1>
          <p className="section-sub">Conversations on business, data, and growth across Africa's growth economy.</p>
        </div>
      </section>

      <section className="content-section">
        <div className="max-w">
          {episodes.length === 0 ? (
            <EmptyState
              title={isSupabaseConfigured() ? 'First episode dropping soon' : 'Podcast not yet connected'}
              body={
                isSupabaseConfigured()
                  ? "We're recording our first episodes — check back soon, or follow us for the launch."
                  : 'This site is not yet connected to its content database. See the setup instructions in the README.'
              }
            />
          ) : (
            <div className="episode-list">
              {episodes.map((ep) => (
                <div key={ep.id} className="episode-card">
                  {ep.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ep.cover_image_url} alt="" className="episode-cover" />
                  ) : (
                    <div className="episode-cover episode-cover-fallback">🎙️</div>
                  )}
                  <div className="episode-body">
                    {ep.episode_number !== null && <div className="case-tag">Episode {ep.episode_number}</div>}
                    <h3>{ep.title}</h3>
                    {ep.description && <p className="challenge">{ep.description}</p>}
                    <div className="episode-links">
                      {ep.audio_url && (
                        <audio controls src={ep.audio_url} className="episode-audio">
                          Your browser does not support the audio element.
                        </audio>
                      )}
                      <div className="episode-platform-links">
                        {ep.spotify_url && (
                          <a href={ep.spotify_url} target="_blank" rel="noreferrer" className="s-link">
                            Spotify →
                          </a>
                        )}
                        {ep.apple_url && (
                          <a href={ep.apple_url} target="_blank" rel="noreferrer" className="s-link">
                            Apple Podcasts →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter logoUrl={settings.logo_url} />
    </>
  );
}
