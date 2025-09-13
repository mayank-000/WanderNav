import type { Post, Category, Tag } from '@/lib/types';
import { placeholderImages } from './placeholder-images';

const findImage = (id: string) => placeholderImages.find(img => img.id === id)?.imageUrl || '/placeholder.jpg';
const findGallery = (ids: string[]) => ids.map(id => findImage(id));

export const categories: Category[] = [
  { name: 'Adventure', slug: 'adventure' },
  { name: 'Budget Travel', slug: 'budget-travel' },
  { name: 'City Break', slug: 'city-break' },
  { name: 'Luxury', slug: 'luxury' },
  { name: 'Food & Drink', slug: 'food-drink' },
];

export const tags: Tag[] = [
  { name: 'Hiking', slug: 'hiking' },
  { name: 'Europe', slug: 'europe' },
  { name: 'Asia', slug: 'asia' },
  { name: 'Solo Travel', slug: 'solo-travel' },
  { name: 'Backpacking', slug: 'backpacking' },
  { name: 'Fine Dining', slug: 'fine-dining' },
];

export const posts: Post[] = [
  {
    slug: 'adventures-in-the-alps',
    title: 'Adventures in the Alps: A Hiker\'s Paradise',
    image: findImage('alps-cover'),
    gallery: findGallery(['alps-1', 'alps-2', 'alps-3']),
    category: 'Adventure',
    author: 'Alex Johnson',
    date: '2024-07-15',
    excerpt: 'Discover the breathtaking beauty of the Swiss Alps. This guide covers the best hiking trails, accommodation tips, and must-see viewpoints.',
    content: `
      <p>The Swiss Alps are a dream for any outdoor enthusiast. From towering peaks to serene alpine lakes, the landscape is nothing short of spectacular. Our journey began in the small town of Interlaken, the gateway to the Jungfrau region.</p>
      <p>One of our first hikes was the trail to Bachalpsee. The reflection of the snow-capped mountains in the crystal-clear lake was a sight to behold. We recommend starting early to avoid the crowds and to catch the best light for photography.</p>
      <h3>Essential Gear</h3>
      <ul>
        <li>Sturdy hiking boots</li>
        <li>Layered clothing</li>
        <li>Water and snacks</li>
        <li>Sunscreen and sunglasses</li>
      </ul>
      <p>For accommodation, we opted for a mix of mountain huts and cozy guesthouses. The huts offer an authentic alpine experience, though they are basic. Booking in advance is crucial, especially during peak season.</p>
    `,
    tags: ['Hiking', 'Europe'],
    featured: true,
  },
  {
    slug: 'paris-on-a-budget',
    title: 'Paris on a Budget: A Chic and Affordable Getaway',
    image: findImage('paris-cover'),
    gallery: findGallery(['paris-1', 'paris-2', 'paris-3']),
    category: 'Budget Travel',
    author: 'Maria Garcia',
    date: '2024-06-22',
    excerpt: 'Think Paris is expensive? Think again. Explore the City of Light without breaking the bank with our insider tips on free museums, cheap eats, and more.',
    content: `
      <p>Paris has a reputation for being pricey, but with a little planning, you can enjoy its magic on a tight budget. We found that the best experiences were often free, like strolling along the Seine or picnicking in front of the Eiffel Tower.</p>
      <h3>Free Museums</h3>
      <p>Many national museums in Paris are free on the first Sunday of the month. This includes the Louvre, Musée d'Orsay, and Centre Pompidou. Be prepared for long queues, but it's well worth the wait.</p>
      <h3>Cheap Eats</h3>
      <p>Avoid the tourist traps and head to the local boulangeries for delicious and affordable sandwiches. Creperies in the Latin Quarter also offer a fantastic, budget-friendly meal. A simple jambon-fromage (ham and cheese) crepe can be incredibly satisfying.</p>
    `,
    tags: ['Europe', 'City Break', 'Solo Travel'],
    featured: true,
  },
  {
    slug: 'tokyos-culinary-scene',
    title: 'A Culinary Tour of Tokyo: From Street Food to Michelin Stars',
    image: findImage('tokyo-cover'),
    gallery: findGallery(['tokyo-1', 'tokyo-2', 'tokyo-3']),
    category: 'Food & Drink',
    author: 'Kenji Tanaka',
    date: '2024-05-10',
    excerpt: 'Embark on a gastronomic journey through Tokyo. We explore everything from bustling street food markets to world-renowned Michelin-starred restaurants.',
    content: `
      <p>Tokyo is a food lover's paradise. The city boasts more Michelin stars than any other in the world, but its culinary scene is just as vibrant at the street level. Our first stop was the Tsukiji Outer Market for the freshest sushi breakfast imaginable.</p>
      <p>For lunch, we dove into the world of ramen. A visit to Ichiran Ramen, with its individual "flavor concentration" booths, is a must for any first-timer. In the evening, the narrow alleys of Omoide Yokocho (Memory Lane) offer a nostalgic glimpse into post-war Tokyo, with tiny yakitori stalls grilling skewers over charcoal.</p>
      <h3>Must-Try Foods</h3>
      <ul>
        <li>Sushi and Sashimi</li>
        <li>Ramen</li>
        <li>Yakitori</li>
        <li>Tempura</li>
        <li>Takoyaki</li>
      </ul>
    `,
    tags: ['Asia', 'Food & Drink', 'Fine Dining'],
    featured: true,
  },
  {
    slug: 'exploring-ancient-rome',
    title: 'Exploring Ancient Rome: A Walk Through History',
    image: findImage('rome-cover'),
    gallery: findGallery(['rome-1', 'rome-2', 'rome-3']),
    category: 'City Break',
    author: 'Sophia Rossi',
    date: '2024-04-18',
    excerpt: 'Step back in time as we explore the historic heart of Rome. From the Colosseum to the Roman Forum, this guide will help you navigate the ancient wonders.',
    content: `
      <p>Walking through Rome is like walking through a living museum. The sheer scale and history of the Colosseum are awe-inspiring. We highly recommend a guided tour to fully appreciate the stories of the gladiators and the spectacles that took place here.</p>
      <p>The Roman Forum and Palatine Hill are just a short walk away. This sprawling complex of ruins was once the center of Roman public life. It's easy to spend a full day wandering through the ancient temples and government buildings. Don't forget to climb Palatine Hill for a stunning panoramic view of the Forum and the city.</p>
      <h3>Travel Tip</h3>
      <p>Purchase a combination ticket for the Colosseum, Roman Forum, and Palatine Hill to save time and money. It's valid for two consecutive days, giving you plenty of time to explore.</p>
    `,
    tags: ['Europe', 'History'],
    featured: false,
  }
];

export function getPosts() {
  return posts;
}

export function getPostBySlug(slug: string) {
  return posts.find(post => post.slug === slug);
}

export function getFeaturedPosts() {
  return posts.filter(post => post.featured);
}

export function getCategories() {
  return categories;
}
