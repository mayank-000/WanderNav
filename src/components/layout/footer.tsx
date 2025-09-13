import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your ultimate travel companion.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/trip-planner" className="text-muted-foreground hover:text-foreground">AI Trip Planner</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Destinations</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">About</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="flex items-center space-x-4 mt-4">
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} WanderNav. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
