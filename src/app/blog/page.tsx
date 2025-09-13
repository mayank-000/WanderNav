import { getCategories, getPosts } from '@/lib/data';
import BlogFilters from '@/components/blog/blog-filters';

export const metadata = {
  title: 'Travel Blogs - WanderNav',
  description: 'Explore travel stories, tips, and guides from around the world.',
};

export default function BlogPage() {
  const posts = getPosts();
  const categories = getCategories();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Travel Blog</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Stories, tips, and guides from our adventures around the globe.
        </p>
      </div>
      <BlogFilters posts={posts} categories={categories} />
    </div>
  );
}
