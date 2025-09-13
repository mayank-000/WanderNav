"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Plane, Search, User } from "lucide-react";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/trip-planner", label: "AI Planner" },
];

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const isUserLoggedIn = false; // Mock state

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("flex items-center gap-4", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === link.href ? "text-primary" : "text-muted-foreground",
             "lg:text-base"
          )}
          onClick={() => setSheetOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <NavLinks className="hidden md:flex" />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-9 w-48" />
          </div>

          <div className="hidden md:flex items-center gap-2">
             {isUserLoggedIn ? (
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/profile"><User /></Link>
                </Button>
            ) : (
                <>
                    <Button variant="ghost" asChild>
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Sign Up</Link>
                    </Button>
                </>
            )}
          </div>


          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open main menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-4 mb-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground"
                      )}
                      onClick={() => setSheetOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2">
                    {isUserLoggedIn ? (
                         <Button asChild>
                            <Link href="/profile">Profile</Link>
                        </Button>
                    ) : (
                        <>
                             <Button variant="outline" asChild>
                                <Link href="/login">Log In</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Sign Up</Link>
                            </Button>
                        </>
                    )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
