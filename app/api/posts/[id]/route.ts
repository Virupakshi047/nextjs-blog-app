import { NextResponse } from 'next/server';
import { getPost, updatePost, deletePost } from '@/lib/posts';
import { postSchema } from '@/lib/posts';
import { z } from 'zod';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = await getPost(params.id);
  
  if (!post) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(post);
}

const updatePostSchema = postSchema.pick({
  title: true,
  author: true,
  content: true,
  excerpt: true,
}).partial();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updatePostSchema.parse(body);
    
    const post = await updatePost(params.id, validatedData);
    
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const success = await deletePost(params.id);
  
  if (!success) {
    return NextResponse.json(
      { error: "Post not found" },
      { status: 404 }
    );
  }

  return new NextResponse(null, { status: 204 });
}