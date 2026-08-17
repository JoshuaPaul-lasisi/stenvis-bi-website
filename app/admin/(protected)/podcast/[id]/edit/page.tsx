import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import EpisodeForm from '@/components/admin/EpisodeForm';

export default async function EditEpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: episode } = await supabase.from('podcast_episodes').select('*').eq('id', id).maybeSingle();
  if (!episode) notFound();

  return (
    <div className="admin-page">
      <h1>Edit Episode</h1>
      <EpisodeForm episode={episode} />
    </div>
  );
}
