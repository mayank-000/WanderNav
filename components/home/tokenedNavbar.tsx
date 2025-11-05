"use client";

import { useState, useEffect } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import LogoutButton from "../auth/LogoutButton";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StatsProps {
  userData: User | null;
}

export function TokenedNavbar({ userData }: StatsProps) {
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
    { name: "Home", href: "/home" },
    { name: "Profile", href: "/profile" },
    { name: "AI Trip Planner", href: "/trip-planner" },
    { name: "AI ChatBot", href: "/ai-chatbot" },
  ];

  const handleNavClick = (
    href: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();
    router.push(href);
  };

  // Get user initials for fallback
  const getInitials = () => {
    if (userData?.username) {
      return userData.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return "U";
  };

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
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="text-white hover:text-gray-200 transition-colors duration-200 font-medium cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Profile */}
          <div className="hidden md:block">
            <Avatar className="w-10 h-10 border-2 border-white shadow-md cursor-pointer">
              <AvatarImage
                src={userData?.profilePhoto || undefined}
                alt="Profile"
              />
              <AvatarFallback className="bg-blue-600 text-white font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Profile Section */}
              <div className="px-3 py-4 border-b border-border/30 mb-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 border-2 border-blue-600 shadow-md">
                    <AvatarImage
                      src={userData?.profilePhoto || undefined}
                      alt={userData?.username || "User"}
                    />
                    <AvatarFallback className="bg-blue-600 text-white font-semibold">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {userData?.username || "User"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {userData?.email || ""}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(link.href, e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
              ))}

              {/* Logout Button */}
              <div className="pt-4 px-3 border-t border-border/30">
                <LogoutButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}