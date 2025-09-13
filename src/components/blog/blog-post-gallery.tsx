import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface BlogPostGalleryProps {
  images: string[];
  title: string;
}

export default function BlogPostGallery({ images, title }: BlogPostGalleryProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Carousel className="w-full" opts={{ loop: true }}>
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="relative aspect-video flex items-center justify-center p-0">
                  <Image
                    src={src}
                    alt={`${title} gallery image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 1200px) 90vw, 800px"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4" />
      <CarouselNext className="absolute right-4" />
    </Carousel>
  );
}
