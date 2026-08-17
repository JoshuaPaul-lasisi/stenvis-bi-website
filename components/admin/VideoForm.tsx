'use client';

import { saveVideo } from '@/app/actions/videos';
import type { Video } from '@/lib/content/types';

export default function VideoForm({ video }: { video?: Video }) {
  return (
    <form action={saveVideo} className="admin-form">
      {video && <input type="hidden" name="id" value={video.id} />}

      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" defaultValue={video?.title} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>YouTube URL or Video ID</label>
          <input
            type="text"
            name="youtube_url"
            defaultValue={video?.youtube_id}
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" defaultValue={video?.category ?? ''} placeholder="e.g. Explainer" />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" defaultValue={video?.description ?? ''} rows={4} />
      </div>

      <div className="admin-form-actions">
        <label className="admin-status-toggle">
          <input type="checkbox" name="status" value="published" defaultChecked={video?.status === 'published'} />
          Publish immediately
        </label>
        <button type="submit" className="btn-teal">
          {video ? 'Save Changes' : 'Add Video'}
        </button>
      </div>
    </form>
  );
}
