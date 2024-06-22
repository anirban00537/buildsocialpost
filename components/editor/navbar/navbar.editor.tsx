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
import { useAuthUser, useLogout } from "@/hooks/useAuth";
import useCarousel from "@/hooks/useCarousel";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const getRandomColor = () => {
  const colors = [
    "#FFB6C1",
    "#FF69B4",
    "#FF1493",
    "#C71585",
    "#DB7093",
    "#FF6347",
    "#FF4500",
    "#FF8C00",
    "#FFD700",
    "#ADFF2F",
    "#7FFF00",
    "#7CFC00",
    "#00FA9A",
    "#00FF7F",
    "#3CB371",
    "#20B2AA",
    "#00CED1",
    "#1E90FF",
    "#4682B4",
    "#5F9EA0",
    "#6A5ACD",
    "#8A2BE2",
    "#9400D3",
    "#9932CC",
    "#8B008B",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const getInitials = (email: string) => {
  return email ? email.charAt(0).toUpperCase() : "U";
};

const EditorNavbar = () => {
  const { exportSlidesToPDF, exportLoading } = useCarousel();
  const { logout } = useLogout();
  const bgColor = getRandomColor();
  const user: any = useSelector((state: RootState) => state.user.userinfo);
  const initials = user?.email ? getInitials(user.email) : null;

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
        {user && user.email ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span>
                {user.photoURL ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.photoURL}
                    alt="User Avatar"
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: bgColor }}
                  >
                    {initials}
                  </div>
                )}
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
              <DropdownMenuItem onClick={logout}>
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
