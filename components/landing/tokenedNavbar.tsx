"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import LogoutButton from "../auth/LogoutButton";

export function TokenedNavbar() {

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
    { name: "Home", href:"/home"},
    { name: "Profile", href:"/profile"},
    { name: "AI Trip Planner", href: "/trip-planner" },
    { name: "AI ChatBot", href: "/ai-chatbot" },
    { name: "DashBoard", href: "/dashboard" },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-black/10 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
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
                onClick={(e) => handleNavClick(link.href, e)}
                className="text-foreground hover:text-black transition-colors duration-200 font-medium text-pretty"
              >
                {link.name}
              </a>
            ))}
          </nav>

          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
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
          <div className="md:hidden border-t border-border/50 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-foreground hover:text-black hover:bg-muted/50 rounded-md transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <LogoutButton  />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
