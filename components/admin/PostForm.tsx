'use client';

import { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import { savePost } from '@/app/actions/posts';
import ImageUploadField from '@/components/admin/ImageUploadField';
import type { Post } from '@/lib/content/types';

export default function PostForm({ post }: { post?: Post }) {
  const [body, setBody] = useState(post?.body_markdown ?? '');
  const [showPreview, setShowPreview] = useState(false);

  const previewHtml = showPreview ? DOMPurify.sanitize(marked.parse(body, { async: false }) as string) : '';

  return (
    <form action={savePost} className="admin-form">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="form-group">
        <label>Title</label>
        <input type="text" name="title" defaultValue={post?.title} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Slug (URL) — leave blank to auto-generate from title</label>
          <input type="text" name="slug" defaultValue={post?.slug} placeholder="e.g. retail-inventory-case-study" />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" defaultValue={post?.category ?? ''} placeholder="e.g. Case Study" />
        </div>
      </div>

      <div className="form-group">
        <label>Excerpt</label>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ''}
          rows={2}
          placeholder="One or two sentences shown on the blog listing"
        />
      </div>

      <ImageUploadField name="cover_image_url" defaultValue={post?.cover_image_url} />

      <div className="form-group">
        <label>Tags (comma-separated)</label>
        <input type="text" name="tags" defaultValue={post?.tags?.join(', ') ?? ''} placeholder="e.g. retail, forecasting" />
      </div>

      <div className="form-group">
        <div className="admin-form-label-row">
          <label>Body (Markdown)</label>
          <button type="button" className="s-link" onClick={() => setShowPreview((p) => !p)}>
            {showPreview ? 'Edit' : 'Preview'} →
          </button>
        </div>
        {showPreview ? (
          <div className="article-body admin-markdown-preview" dangerouslySetInnerHTML={{ __html: previewHtml }} />
        ) : (
          <textarea
            name="body_markdown"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={16}
            required
          />
        )}
      </div>

      <div className="admin-form-actions">
        <label className="admin-status-toggle">
          <input type="checkbox" name="status" value="published" defaultChecked={post?.status === 'published'} />
          Publish immediately
        </label>
        <button type="submit" className="btn-teal">
          {post ? 'Save Changes' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}
