'use client'

import { usePathname } from "next/navigation"
import { unTokenedNavbar as UnTokenedNavbar } from "../landing/untokenedNavbar"
import { TokenedNavbar } from "../landing/tokenedNavbar"
import { useUser } from "@clerk/nextjs"

export default function Navbar() {

    const pathname = usePathname();
    const {isSignedIn, isLoaded } = useUser();

    const hideNavbar = pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up')
    if(hideNavbar) return null

    // Show loading state while checking authentication---
    if(!isLoaded) return null

    // Showing Navbar based on User Authentication---
    if(isSignedIn) {
        return <TokenedNavbar />
    } else {
        return <UnTokenedNavbar />
    }
}