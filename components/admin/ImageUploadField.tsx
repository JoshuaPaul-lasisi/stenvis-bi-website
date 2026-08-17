'use client';

import { useState, type ChangeEvent } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ImageUploadField({
  name,
  label = 'Cover Image',
  defaultValue,
}: {
  name: string;
  label?: string;
  defaultValue?: string | null;
}) {
  const [url, setUrl] = useState(defaultValue || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error: uploadError } = await supabase.storage.from('content-images').upload(path, file);

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('content-images').getPublicUrl(path);
    setUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="image-upload-field">
        <input type="hidden" name={name} value={url} />
        {url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="image-upload-preview" />
        )}
        <div className="image-upload-controls">
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
          <input
            type="url"
            placeholder="or paste an image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="image-upload-url"
          />
        </div>
        {uploading && <span className="image-upload-status">Uploading…</span>}
        {error && <span className="admin-error">{error}</span>}
      </div>
    </div>
  );
}
