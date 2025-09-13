import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { getFeaturedPosts, getPosts } from '@/lib/data';
import BlogCard from '@/components/blog/blog-card';
import { placeholderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const heroImage = placeholderImages.find(p => p.id === 'hero-background');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center gap-6 p-4">
          <h1 className="font-headline text-5xl md:text-7xl font-bold drop-shadow-lg">
            Your Next Adventure Awaits
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow">
            Discover breathtaking destinations and create unforgettable memories with WanderNav.
          </p>
          <div className="w-full max-w-lg flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search for a destination (e.g., 'Paris')"
              className="h-12 text-lg text-foreground"
            />
            <Button size="lg" aria-label="Search">
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Featured Trips</h2>
            <p className="text-muted-foreground mt-2 text-lg">
              Get inspired by our most popular travel stories.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/blog">Explore All Posts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
