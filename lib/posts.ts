import { z } from 'zod';

export const postSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required").max(100),
  author: z.string().min(1, "Author is required").max(50),
  content: z.string().min(1, "Content is required"),
  createdAt: z.string(),
  excerpt: z.string(),
  readingTime: z.number(),
});

export type Post = z.infer<typeof postSchema>;

// In-memory store for development
let posts: Post[] = [
  {
    id: "1",
    title: "The Future of Web Development with Next.js",
    author: "Sarah Chen",
    content: `Next.js has revolutionized how we build web applications, offering a perfect blend of developer experience and performance. In this comprehensive guide, we'll explore the key features that make Next.js the framework of choice for modern web development.

The App Router represents a paradigm shift in how we structure our applications. With nested layouts, parallel routes, and intercepting routes, we can create more intuitive and performant user experiences.

Server Components have changed the game by moving heavy lifting to the server, resulting in smaller bundle sizes and faster initial page loads. This approach allows us to write React components that execute entirely on the server, sending only the necessary HTML to the client.

Let's dive deep into these features and understand how they can benefit your next project.`,
    createdAt: "2024-03-20",
    excerpt: "Explore the revolutionary features of Next.js and how they're shaping the future of web development.",
    readingTime: 5
  },
  {
    id: "2",
    title: "Mastering TypeScript: A Practical Guide",
    author: "Michael Rodriguez",
    content: `TypeScript has become an essential tool in modern JavaScript development. This guide will help you understand its powerful type system and how to leverage it effectively in your projects.

We'll cover advanced types, generics, and best practices that will help you write more maintainable and scalable code. TypeScript's type inference capabilities allow you to write safer code without sacrificing productivity.

Understanding concepts like union types, intersection types, and mapped types will take your TypeScript skills to the next level.`,
    createdAt: "2024-03-19",
    excerpt: "Learn how to leverage TypeScript's powerful features to write safer and more maintainable code.",
    readingTime: 7
  }
];

export async function getPosts() {
  return posts;
}

export async function getPost(id: string) {
  return posts.find(post => post.id === id);
}

export async function createPost(post: Omit<Post, 'id' | 'createdAt' | 'readingTime'>) {
  const newPost: Post = {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
    readingTime: Math.ceil(post.content.split(' ').length / 200), // Rough estimate: 200 words per minute
  };
  
  posts.unshift(newPost);
  return newPost;
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...updates };
  return posts[index];
}

export async function deletePost(id: string) {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) return false;
  
  posts.splice(index, 1);
  return true;
}