"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubscriptionInfo from "@/components/subscription/status";
import useUser from "@/hooks/useUser";
import { useLogout } from "@/hooks/useAuth";
import useCarousel from "@/hooks/useCarousel";

const EditorNavbar = () => {
  const { exportSlidesToPDF, exportLoading } = useCarousel();
  const { user, loading } = useUser();
  const { handleLogout } = useLogout();

  return (
    <header className="bg-white sticky top-0 h-[65px] flex items-center justify-between border-b border-gray-200 z-50 px-4">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="Logo" className="h-14 object-cover" />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Button onClick={exportSlidesToPDF} disabled={exportLoading}>
          {exportLoading ? (
            <div className="flex items-center gap-3">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Downloading...
            </div>
          ) : (
            "Download"
          )}
        </Button>
        <SubscriptionInfo />
        {!loading && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.photoURL || "https://thispersondoesnotexist.com/"}
                  alt="User Avatar"
                />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="w-4 h-4 mr-2" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login" className="gap-1.5 text-sm">
            <Button variant="outline">Sign in</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default EditorNavbar;
