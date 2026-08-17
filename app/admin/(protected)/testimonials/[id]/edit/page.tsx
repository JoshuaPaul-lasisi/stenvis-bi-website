import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import TestimonialForm from '@/components/admin/TestimonialForm';

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: testimonial } = await supabase.from('testimonials').select('*').eq('id', id).maybeSingle();
  if (!testimonial) notFound();

  return (
    <div className="admin-page">
      <h1>Edit Testimonial</h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
