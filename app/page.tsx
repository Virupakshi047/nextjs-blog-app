import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import { Button } from '@/components/ui/button';
import { PlusCircle, Clock, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Modern Blog</h1>
            <p className="text-muted-foreground">Explore the latest insights and stories</p>
          </div>
          <Link href="/create">
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="mr-2 h-4 w-4" />
              Write a Post
            </Button>
          </Link>
        </div>

        <div className="grid gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/posts/${post.id}`}
              className="group"
            >
              <article className="bg-card rounded-lg shadow-lg p-6 border border-border transition-all duration-200 hover:border-primary/50 hover:shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-semibold text-primary group-hover:text-primary/90 transition-colors">
                    {post.title}
                  </h2>
                  <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-primary font-medium">{post.author}</span>
                    <span className="text-muted-foreground">
                      {format(new Date(post.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}