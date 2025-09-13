import { getPostBySlug, getPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import BlogPostGallery from '@/components/blog/blog-post-gallery';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderImages } from '@/lib/placeholder-images';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - WanderNav`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  const authorAvatar = placeholderImages.find(p => p.description.includes(post.author));


  return (
    <article className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <header className="mb-8">
        <div className="text-center mb-4">
          <Badge variant="secondary">{post.category}</Badge>
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-center leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={post.author}/>}
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          <span>&bull;</span>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        </div>
      </header>

      <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div
        className="prose dark:prose-invert max-w-none prose-p:font-body prose-headings:font-headline prose-p:text-foreground/80 prose-li:text-foreground/80"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <div className="my-12">
        <h2 className="font-headline text-3xl font-bold text-center mb-6">Image Gallery</h2>
        <BlogPostGallery images={post.gallery} title={post.title} />
      </div>

      <div className="mt-8 flex gap-2">
        {post.tags.map(tag => (
          <Badge key={tag} variant="outline">{tag}</Badge>
        ))}
      </div>
    </article>
  );
}
