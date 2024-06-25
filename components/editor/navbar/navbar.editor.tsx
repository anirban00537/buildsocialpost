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

const getColorByAlphabet = (alphabet) => {
  const colors = {
    A: "#FFB6C1",
    B: "#FF69B4",
    C: "#FF1493",
    D: "#C71585",
    E: "#DB7093",
    F: "#FF6347",
    G: "#FF4500",
    H: "#FF8C00",
    I: "#FFD700",
    J: "#ADFF2F",
    K: "#7FFF00",
    L: "#7CFC00",
    M: "#00FA9A",
    N: "#00FF7F",
    O: "#3CB371",
    P: "#20B2AA",
    Q: "#00CED1",
    R: "#1E90FF",
    S: "#4682B4",
    T: "#5F9EA0",
    U: "#6A5ACD",
    V: "#8A2BE2",
    W: "#9400D3",
    X: "#9932CC",
    Y: "#8B008B",
    Z: "#556B2F",
  };
  return colors[alphabet.toUpperCase()] || "#000000"; // Default to black if not found
};

const getInitials = (email) => {
  return email ? email.charAt(0).toUpperCase() : "U";
};

const EditorNavbar = () => {
  const { exportSlidesToPDF, exportLoading } = useCarousel();
  const { logout } = useLogout();
  const user = useSelector((state: RootState) => state.user.userinfo);
  const initials = user?.email ? getInitials(user.email) : null;
  const bgColor = initials ? getColorByAlphabet(initials) : "#000000"; // Default to black if no initials

  return (
    <header className="bg-white sticky top-0 h-[65px] flex items-center justify-between border-b border-gray-200 z-40 px-4">
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
