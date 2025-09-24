"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Home,
  Camera,
  Video,
  Map,
  MapPin,
  Settings,
  HelpCircle,
  Menu,
  X,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LogoutButton from "../auth/LogoutButton";

const navigation = [
  { name: "Dashboard", icon: Home, href: "/dashboard", current: false },
  { name: "My Photos", icon: Camera, href: "#", current: false },
  { name: "My Videos", icon: Video, href: "#", current: false },
  { name: "AI Trip Planner", icon: Map, href: "/trip-planner", current: false },
  { name: "AI Chat Bot", icon: Bot, href: "/ai-chatbot", current: false },
  { name: "Destinations", icon: MapPin, href: "#", current: false },
  { name: "Settings", icon: Settings, href: "#", current: false },
  { name: "Help & Support", icon: HelpCircle, href: "#", current: false },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "lg:hidden fixed top-4 z-50 transition-all duration-300",
          isOpen
            ? "right-4 bg-white border-gray-200 shadow-lg hover:bg-gray-50"
            : "left-4 border-none bg-accent hover:bg-accent/90"
        )}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile overlay - only show when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out shadow-xl lg:translate-x-0 lg:shadow-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                WanderNav
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group text-gray-600 hover:text-purple-700 hover:bg-purple-50 hover:border-l-4 hover:border-purple-500 active:bg-purple-100"
                onClick={() => setIsOpen(false)} // Close sidebar on mobile when item is clicked
              >
                <item.icon 
                  className="mr-3 h-5 w-5 transition-colors text-gray-400 group-hover:text-purple-600" 
                />
                <span className="truncate">{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}