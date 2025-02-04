// app/posts/[id]/edit/EditPost.server.tsx
import EditPostClient from "./EditPostClient";

// Dummy data for development (could come from a database)
const posts = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    author: "John Doe",
    content: "Next.js is a powerful framework for building React applications...",
  },
  {
    id: "2",
    title: "The Power of Server Components",
    author: "Jane Smith",
    content: "Server Components are revolutionizing how we build React apps...",
  },
];

export function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default function EditPostServer({ params }: { params: { id: string } }) {
  // You can pass the post data as a prop if needed
  const post = posts.find((p) => p.id === params.id) || posts[0];

  return <EditPostClient post={post} params={params} />;
}
