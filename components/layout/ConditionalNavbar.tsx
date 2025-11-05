"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { unTokenedNavbar as UnTokenedNavbar } from "../home/untokenedNavbar";
import { TokenedNavbar } from "../home/tokenedNavbar";
import { useUser } from "@clerk/nextjs";
import { User } from "@/types/user";
import axios from "axios";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if(!isSignedIn) return;
      try {
        const response = await axios.get("/api/profile/get/user");
        
        if (response.data.success) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [isSignedIn]);

  const noNavbarPages = ["/sign-in", "/sign-up", "/profile", "/explore"];
  const hideNavbar = noNavbarPages.some((route) => pathname?.startsWith(route));
  if (hideNavbar) return null;

  // Show loading state while checking authentication---
  if (!isLoaded) return null;
  
  // Showing Navbar based on User Authentication---
  if (isSignedIn) {
    return <TokenedNavbar userData={userData} />;
  } else {
    return <UnTokenedNavbar />;
  }
}
