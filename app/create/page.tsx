"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  author: z.string().min(1, "Author is required").max(50, "Author must be less than 50 characters"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required").max(200, "Excerpt must be less than 200 characters"),
});

type FormData = z.infer<typeof createPostSchema>;

export default function CreatePost() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create post');

      const post = await response.json();
      toast({
        title: "Success!",
        description: "Your blog post has been published.",
      });
      router.push(`/posts/${post.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-block mb-8">
          <Button variant="ghost" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <h1 className="text-3xl font-bold text-primary mb-8">Create New Post</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-card-foreground mb-2">
                Title
              </label>
              <Input
                id="title"
                {...register('title')}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-card-foreground mb-2">
                Author
              </label>
              <Input
                id="author"
                {...register('author')}
                className={errors.author ? 'border-destructive' : ''}
              />
              {errors.author && (
                <p className="mt-1 text-sm text-destructive">{errors.author.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-card-foreground mb-2">
                Excerpt
              </label>
              <Input
                id="excerpt"
                {...register('excerpt')}
                className={errors.excerpt ? 'border-destructive' : ''}
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-destructive">{errors.excerpt.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-card-foreground mb-2">
                Content
              </label>
              <Textarea
                id="content"
                {...register('content')}
                className={`min-h-[300px] ${errors.content ? 'border-destructive' : ''}`}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-destructive">{errors.content.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}