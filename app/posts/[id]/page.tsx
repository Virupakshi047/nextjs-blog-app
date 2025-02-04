import { Metadata } from 'next';
import { getPost, getPosts } from '@/lib/posts';
import { ClientPostPage } from './ClientPostPage';

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id);
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.id);
  if (!post) return null;
  
  return <ClientPostPage post={post} />;
}