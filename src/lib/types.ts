export type Post = {
  slug: string;
  title: string;
  image: string;
  gallery: string[];
  category: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  featured?: boolean;
};

export type Category = {
  slug: string;
  name: string;
};

export type Tag = {
  slug: string;
  name: string;
};
