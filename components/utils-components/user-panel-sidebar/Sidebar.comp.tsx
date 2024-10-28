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
  Users,
  ChevronDown,
  ImageIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import SubscriptionInfo from "@/components/subscription/Status.comp";
import UserMenu from "./User-Menu.comp";
import ManageWorkspacesModal from "../../workspace/Manage-Workspaces-Modal.comp";

const tools = [
  {
    id: "schedule-post",
    name: "Schedule Post",
    icon: Calendar,
    href: "/dashboard/schedule-post",
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
  { id: "drafts", name: "Drafts", icon: FileEdit, href: "/dashboard/drafts" },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { userinfo, currentWorkspace } = useSelector(
    (state: RootState) => state.user
  );
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  const usedTokens = 150000; // Example: 150k tokens
  const totalTokens = 1000000; // Example: 1M tokens

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return (tokens / 1000000).toFixed(1) + "M";
    } else if (tokens >= 1000) {
      return (tokens / 1000).toFixed(0) + "k";
    } else {
      return tokens.toString();
    }
  };

  return (
    <div className="w-72 h-full flex flex-col bg-white text-gray-500 border-r border-gray-100 shadow-sm">
      {/* Logo Section - Simplified */}
      <div className="px-6 py-5 border-b border-gray-50">
        <Link href="/" className="block">
          <Image
            src="/logo.svg"
            height={28}
            width={120}
            alt="Buildsocialpost.com"
            className="w-auto"
          />
        </Link>
      </div>

      {/* Workspace Selector - More Elegant */}
      <div className="px-4 py-3">
        <Button
          variant="ghost"
          onClick={() => setIsManageModalOpen(true)}
          className="w-full h-10 justify-between bg-gray-50/50 hover:bg-gray-50 text-gray-700 border-0 rounded-xl transition-all duration-200"
        >
          <div className="flex items-center">
            <Users className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm">
              {currentWorkspace?.name || "Select workspace..."}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </div>

      {/* Create Button - More Prominent */}
      <div className="px-4 py-2">
        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow rounded-xl h-10">
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </Button>
      </div>

      {/* Main Navigation - Refined */}
      <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-0.5">
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.href} passHref>
            <Button
              variant="ghost"
              className={`w-full justify-start text-sm h-11 transition-all rounded-xl duration-200 ${
                pathname === tool.href || pathname.startsWith(tool.href + "/")
                  ? "bg-blue-50/50 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50/50 hover:text-gray-800"
              }`}
            >
              <tool.icon
                className={`w-[18px] h-[18px] mr-3 ${
                  pathname === tool.href || pathname.startsWith(tool.href + "/")
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              />
              <span className="flex-grow text-left">{tool.name}</span>
            </Button>
          </Link>
        ))}
      </nav>

      {/* Usage Stats - More Subtle */}
      <div className="px-4 py-3 border-t border-gray-50">
        <div className="p-3 bg-gray-50/50 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-gray-700 text-sm">AI Token Usage</span>
            </div>
            <span className="text-xs bg-white px-2 py-1 rounded-md text-gray-500 font-medium">
              {formatTokens(usedTokens)} / {formatTokens(totalTokens)}
            </span>
          </div>
          <div className="w-full bg-gray-200/50 rounded-full h-1">
            <div
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(usedTokens / totalTokens) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* User Section - Cleaner */}
      <div className="p-4 border-t border-gray-50 bg-gray-50/30">
        <div className="flex items-center gap-3">
          <UserMenu />
          <div className="h-8 w-[1px] bg-gray-200" />
          <SubscriptionInfo />
        </div>
      </div>

      <ManageWorkspacesModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
