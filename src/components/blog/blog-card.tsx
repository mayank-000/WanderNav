import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <Badge variant="secondary" className="mb-2">{post.category}</Badge>
          <CardTitle className="font-headline text-xl leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          <p className="mt-3 text-muted-foreground text-sm line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0 text-xs text-muted-foreground">
          <span>By {post.author} on {new Date(post.date).toLocaleDateString()}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
