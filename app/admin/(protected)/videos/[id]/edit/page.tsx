import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import VideoForm from '@/components/admin/VideoForm';

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: video } = await supabase.from('videos').select('*').eq('id', id).maybeSingle();
  if (!video) notFound();

  return (
    <div className="admin-page">
      <h1>Edit Video</h1>
      <VideoForm video={video} />
    </div>
  );
}
