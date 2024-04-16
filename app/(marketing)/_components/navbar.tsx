"use client";
import { useConvexAuth } from "convex/react";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    // we will have a fixed border which will come to down till scrolled
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {/* when loading before login button a spinner is seen */}
        {isLoading && (
          <Spinner />
        )}
        {/* when not logged in and not loading then this is shown */}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">
                Get Jotion free
              </Button>
            </SignInButton>
          </>
        )}
        {/* when we are authenticated and not loading */}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">
                Enter Jotion
              </Link>
            </Button>
            {/* after sign out we are redirected to '/' page */}
            <UserButton
              afterSignOutUrl="/"
            />
          </>
        )}
        {/* using the mode-toggle component which we used from shadcn-ui */}
        <ModeToggle />
      </div>
    </div>
  );
};



