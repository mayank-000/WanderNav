'use client';

import { useState } from 'react';
import type { Post, Category } from '@/lib/types';
import BlogCard from './blog-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';

interface BlogFiltersProps {
  posts: Post[];
  categories: Category[];
}

export default function BlogFilters({ posts, categories }: BlogFiltersProps) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post => {
    const categoryMatch = filter === 'all' || post.category.toLowerCase().replace(' ', '-') === filter;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        post.category.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input 
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="font-headline text-2xl">No Posts Found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
