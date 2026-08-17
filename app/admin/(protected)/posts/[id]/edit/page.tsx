import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PostForm from '@/components/admin/PostForm';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase.from('posts').select('*').eq('id', id).maybeSingle();
  if (!post) notFound();

  return (
    <div className="admin-page">
      <h1>Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
