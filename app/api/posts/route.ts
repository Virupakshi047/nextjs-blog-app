import { NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/posts';
import { postSchema } from '@/lib/posts';
import { z } from 'zod';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

const createPostSchema = postSchema.pick({
  title: true,
  author: true,
  content: true,
  excerpt: true,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validatedData = createPostSchema.parse(body);
    const post = await createPost(validatedData);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}