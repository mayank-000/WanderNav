"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function unTokenedNavbar() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
  ];

  const handleSignIn = useCallback(() => {
    router.push("/sign-in");
  }, [router])

  const handleSignUp = useCallback(() => {
    router.push("/sign-up")
  }, [router])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-black/10 backdrop-blur-sm"
      )}
    >
      <div className="container w-max-full">
        <div className="max-w-full flex items-center justify-between h-16 lg:h-20 bg-white/30 pl-5 pr-5">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-sans text-white">WanderNav AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 cursor-pointer">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-accent transition-colors duration-200 font-medium text-pretty"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleSignIn}
              variant="ghost"
              className="text-black bg-green-400"
            >
              SignIn
            </Button>
            <Button
              onClick={handleSignUp}
              className="text-black bg-blue-400 hover:bg-white"
            >
              SignUp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors bg-white hover:cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-white/30 backdrop-blur-md rounded-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-foreground hover:bg-white rounded-md transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-0 space-y-3">
                <Button
                  onClick={handleSignIn}
                  variant="ghost"
                  className="w-full text-xl p-1 bg-green-400 hover:bg-green-500 hover:cursor-pointer"
                >
                  SignIn
                </Button>
                <Button
                  onClick={handleSignUp}
                  variant="ghost"
                  className="w-full text-xl bg-blue-400 hover:bg-blue-500 hover:cursor-pointer"
                >
                  SignUp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
