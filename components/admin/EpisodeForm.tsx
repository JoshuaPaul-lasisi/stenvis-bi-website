'use client';

import { saveEpisode } from '@/app/actions/podcast';
import ImageUploadField from '@/components/admin/ImageUploadField';
import type { PodcastEpisode } from '@/lib/content/types';

export default function EpisodeForm({ episode }: { episode?: PodcastEpisode }) {
  return (
    <form action={saveEpisode} className="admin-form">
      {episode && <input type="hidden" name="id" value={episode.id} />}

      <div className="form-row">
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" defaultValue={episode?.title} required />
        </div>
        <div className="form-group">
          <label>Episode Number</label>
          <input type="number" name="episode_number" defaultValue={episode?.episode_number ?? ''} min={1} />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" defaultValue={episode?.description ?? ''} rows={4} />
      </div>

      <ImageUploadField name="cover_image_url" label="Cover Art" defaultValue={episode?.cover_image_url} />

      <div className="form-row">
        <div className="form-group">
          <label>Audio File URL</label>
          <input type="url" name="audio_url" defaultValue={episode?.audio_url ?? ''} placeholder="https://..." />
        </div>
        <div className="form-group">
          <label>Spotify Link</label>
          <input type="url" name="spotify_url" defaultValue={episode?.spotify_url ?? ''} placeholder="https://open.spotify.com/..." />
        </div>
      </div>

      <div className="form-group">
        <label>Apple Podcasts Link</label>
        <input type="url" name="apple_url" defaultValue={episode?.apple_url ?? ''} placeholder="https://podcasts.apple.com/..." />
      </div>

      <div className="admin-form-actions">
        <label className="admin-status-toggle">
          <input type="checkbox" name="status" value="published" defaultChecked={episode?.status === 'published'} />
          Publish immediately
        </label>
        <button type="submit" className="btn-teal">
          {episode ? 'Save Changes' : 'Add Episode'}
        </button>
      </div>
    </form>
  );
}
