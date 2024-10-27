"use client";
import React, { useState } from "react";
import {
  Home,
  FileText,
  Layers,
  Calendar,
  FileEdit,
  LayoutTemplate,
  Zap,
  Plus,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const tools = [
  { id: "home", name: "Home", icon: Home, href: "/dashboard" },
  {
    id: "create-post",
    name: "Create Post",
    icon: FileText,
    href: "/dashboard/create-post",
  },
  {
    id: "carousel-editor",
    name: "Carousel Editor",
    icon: Layers,
    href: "/dashboard/carousel-editor",
  },
  {
    id: "carousel-templates",
    name: "Carousel Templates",
    icon: LayoutTemplate,
    href: "/dashboard/carousel-templates",
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: Calendar,
    href: "/dashboard/calendar",
  },
  { id: "drafts", name: "Drafts", icon: FileEdit, href: "/dashboard/drafts" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { userinfo } = useSelector((state: RootState) => state.user);

  const usedTokens = 150000; // Example: 150k tokens
  const totalTokens = 1000000; // Example: 1M tokens

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return (tokens / 1000000).toFixed(1) + 'M';
    } else if (tokens >= 1000) {
      return (tokens / 1000).toFixed(0) + 'k';
    } else {
      return tokens.toString();
    }
  };

  return (
    <div className="w-72 h-full flex flex-col bg-white text-gray-500 border-r border-borderColor shadow-sm">
      <nav className="flex-grow overflow-y-auto px-2 gap-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent py-4">
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.href} passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start text-sm py-2.5 px-4 transition-all rounded-lg duration-200 ${
                pathname === tool.href || pathname.startsWith(tool.href + "/")
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-gray-600 hover:text-white hover:bg-primary/80"
              }`}
            >
              <tool.icon
                className={`w-5 h-5 mr-3 ${
                  pathname === tool.href || pathname.startsWith(tool.href + "/")
                    ? "text-primary"
                    : ""
                }`}
              />
              <span className="flex-grow text-left">{tool.name}</span>
            </Button>
          </Link>
        ))}
      </nav>
      <Card className="m-4 border-t border-borderColor">
        <CardContent className="p-4">
          <div className="flex items-center text-sm text-gray-600">
            <Zap className="w-4 h-4 mr-2 text-primary" />
            <span>
              AI Word tokens: {formatTokens(usedTokens)} / {formatTokens(totalTokens)}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${(usedTokens / totalTokens) * 100}%` }}
            ></div>
          </div>
        </CardFooter>
      </Card>
      <div className="p-4 border-t border-borderColor">
        <Button
          className="w-full bg-primary text-white hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
