"use client";

import { usePathname } from "next/navigation";
import { unTokenedNavbar as UnTokenedNavbar } from "../home/untokenedNavbar";
import { TokenedNavbar } from "../home/tokenedNavbar";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  const noNavbarPages = ["/sign-in", "/sign-up", "/profile", "/explore"];
  const hideNavbar = noNavbarPages.some((route) => pathname?.startsWith(route));
  if (hideNavbar) return null;

  // Show loading state while checking authentication---
  if (!isLoaded) return null;

  // Showing Navbar based on User Authentication---
  if (isSignedIn) {
    return <TokenedNavbar />;
  } else {
    return <UnTokenedNavbar />;
  }
}
