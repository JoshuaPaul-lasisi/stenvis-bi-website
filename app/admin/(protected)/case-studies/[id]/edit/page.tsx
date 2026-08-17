import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import CaseStudyForm from '@/components/admin/CaseStudyForm';

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: caseStudy } = await supabase.from('case_studies').select('*').eq('id', id).maybeSingle();
  if (!caseStudy) notFound();

  return (
    <div className="admin-page">
      <h1>Edit Case Study</h1>
      <CaseStudyForm caseStudy={caseStudy} />
    </div>
  );
}
