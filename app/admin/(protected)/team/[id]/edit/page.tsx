import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import TeamMemberForm from '@/components/admin/TeamMemberForm';

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: member } = await supabase.from('team_members').select('*').eq('id', id).maybeSingle();
  if (!member) notFound();

  return (
    <div className="admin-page">
      <h1>Edit Team Member</h1>
      <TeamMemberForm member={member} />
    </div>
  );
}
