"use client";
import { SignOutButton } from "@clerk/nextjs";

export default function LogoutButton() {
  return (
    <SignOutButton redirectUrl="/">
      <span className="flex align-center justify-center px-2 py-2 bg-red-400 text-white rounded-lg cursor-pointer">
        LogOut
      </span>
    </SignOutButton>
  );
}