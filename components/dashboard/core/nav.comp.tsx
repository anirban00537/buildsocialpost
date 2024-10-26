"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Plus,
  Users,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import SubscriptionInfo from "@/components/subscription/status";

const Navbar = () => {
  const { workspaces, currentWorkspace } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <header className="bg-white sticky top-0 z-40 border-b border-borderColor">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.svg"
                height={120}
                width={120}
                alt="Buildsocialpost.com"
                className=""
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 px-3 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-full transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">
                      {currentWorkspace?.name}
                    </span>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 p-1 bg-white rounded-lg shadow-lg border border-gray-200">
                <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold text-gray-900">
                  Choose workspace
                </DropdownMenuLabel>
                <div className="max-h-64 overflow-y-auto">
                  {workspaces.map((workspace) => (
                    <DropdownMenuItem
                      key={workspace.id}
                      className={`flex items-center px-2 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
                        currentWorkspace?.id === workspace.id
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex-1 flex items-center space-x-3">
                        {currentWorkspace?.id === workspace.id ? (
                          <Check className="h-4 w-4 text-blue-600" />
                        ) : (
                          <div className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">
                          {workspace.name}
                          {workspace.isDefault && (
                            <span className="ml-1 text-xs text-gray-500">
                              (Default)
                            </span>
                          )}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem className="flex items-center px-2 py-2 rounded-md cursor-pointer text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                  <Plus className="h-4 w-4 text-gray-500 mr-3" />
                  <span className="text-sm font-medium">Create Workspace</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/carousel-editor">
              <Button
                variant="default"
                size="xs"
                className="py-4 px-4 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Create Carousel
              </Button>
            </Link>
            <SubscriptionInfo />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative h-8 w-8 rounded-full overflow-hidden focus:ring-2 border-2 border-primary focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                  <Image
                    src="/creator.jpg"
                    alt="User avatar"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
