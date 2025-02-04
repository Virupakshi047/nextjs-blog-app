import { Metadata } from 'next';
import { getPost, getPosts } from '@/lib/posts';
import { EditPostForm } from './EditPostForm';

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `Edit: ${post.title}`,
    description: `Edit blog post: ${post.title}`,
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function EditPostPage({ params }: Props) {
  const post = await getPost(params.id);
  if (!post) return null;
  
  return <EditPostForm post={post} />;
}