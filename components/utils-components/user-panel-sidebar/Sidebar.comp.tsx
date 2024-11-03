"use client";
import React, { useState, useEffect } from "react";
import {
  FileText,
  Layers,
  Calendar,
  LayoutTemplate,
  Zap,
  Plus,
  Users,
  ChevronDown,
  ImageIcon,
  Linkedin,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Image from "next/image";
import SubscriptionInfo from "@/components/subscription/Status.comp";
import UserMenu from "./User-Menu.comp";
import ManageWorkspacesModal from "../../workspace/Manage-Workspaces-Modal.comp";
import ManageAccountsModal from "./ManageAccountsModal";

const tools = [
  {
    id: "ai-writer",
    name: "AI Writer",
    icon: FileText,
    href: "/ai-writer",
  },
  {
    id: "carousel-editor",
    name: "Carousel Editor",
    icon: Layers,
    href: "/carousel-editor",
  },
  {
    id: "content-manager",
    name: "Scheduled/Drafts",
    icon: Calendar,
    href: "/content-manager",
  },

  {
    id: "carousel-templates",
    name: "Carousel Templates",
    icon: LayoutTemplate,
    href: "/carousel-templates",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userinfo, currentWorkspace, wordUsage } = useSelector(
    (state: RootState) => state.user
  );
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return (tokens / 1000000).toFixed(1) + "M";
    } else if (tokens >= 1000) {
      return (tokens / 1000).toFixed(0) + "k";
    } else {
      return tokens.toString();
    }
  };

  // Example accounts data - replace with your actual data
  const accounts = [
    {
      id: 1,
      name: "John Doe",
      profileImage: "https://github.com/shadcn.png", // Replace with actual image
      type: "linkedin" as const,
      status: "connected" as const,
    },
  ];

  const handleConnectLinkedIn = () => {
    // Implement LinkedIn OAuth connection
    console.log("Connecting LinkedIn account...");
  };

  const handleDisconnectAccount = (accountId: number) => {
    // Implement account disconnection
    console.log("Disconnecting account:", accountId);
  };

  return (
    <div className="w-72 h-screen flex flex-col bg-white text-gray-500 border-r border-gray-100 shadow-sm">
      {/* Logo Section */}
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

      {/* Workspace Selector */}
      <div className="px-4 py-3">
        <Button
          variant="ghost"
          onClick={() => setIsManageModalOpen(true)}
          className="w-full h-10 justify-between bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-700 ring-1 ring-gray-200 hover:ring-blue-200 rounded-lg transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium">
              {currentWorkspace?.name || "Select workspace..."}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </div>

      {/* Create Button */}
      <div className="px-4 py-2">
        <Link href="/compose" className="w-full">
          <Button
            variant="gradient"
            className="w-full py-3 rounded-lg font-medium"
          >
            <Plus className="h-4 w-4" />
            Create New
            <div className="flex items-center gap-1 text-[10px] opacity-70 bg-white/10 px-1.5 py-0.5 rounded ml-auto">
              <span>{navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}</span>
              <span>⌥</span>
              <span>N</span>
            </div>
          </Button>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-0.5">
        {tools.map((tool) => (
          <Link key={tool.id} href={tool.href} passHref>
            <Button
              variant="ghost"
              className={`group w-full justify-start text-sm h-11 transition-all rounded-lg duration-200
                ${
                  pathname === tool.href || pathname.startsWith(tool.href + "/")
                    ? "bg-blue-50 border border-blue-200 text-blue-700 font-medium hover:bg-blue-100"
                    : "bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-700"
                }
                focus:outline-none focus:ring-0
                active:scale-[0.98]
              `}
            >
              <tool.icon
                className={`w-4 h-4 mr-3 transition-transform group-hover:scale-105 ${
                  pathname === tool.href || pathname.startsWith(tool.href + "/")
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              <span className="flex-grow text-left">{tool.name}</span>
            </Button>
          </Link>
        ))}
      </nav>

      {/* Usage Stats */}
      <div className="px-4 py-3 border-t border-gray-50">
        <div className="p-3 bg-gray-50/50 rounded-lg ring-1 ring-gray-200 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700 font-medium">AI Token Usage</span>
            </div>
            <span className="text-xs bg-white px-2 py-1 rounded-md text-gray-500 font-medium ring-1 ring-gray-200">
              {formatTokens(wordUsage?.usage.used || 0)} /{" "}
              {formatTokens(wordUsage?.usage.total || 0)}
            </span>
          </div>
          <div className="w-full bg-gray-200/50 rounded-full h-1">
            <div
              className="bg-blue-600 h-1 rounded-full transition-all duration-300"
              style={{ 
                width: `${wordUsage?.percentage.used || 0}%` 
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-gray-50 bg-gray-50/30">
        <div className="flex items-center gap-3">
          <UserMenu />
          <div className="h-8 w-[1px] bg-gray-200" />
          <SubscriptionInfo />
        </div>
      </div>

      {/* Add Accounts Section */}
      <div className="px-4 py-3 border-t border-gray-50">
        <Button
          variant="outline"
          onClick={() => setIsAccountsModalOpen(true)}
          className="w-full justify-between text-gray-600 hover:text-gray-700"
        >
          <div className="flex items-center gap-2">
            <Linkedin className="h-4 w-4 text-[#0A66C2]" />
            <span className="text-sm font-medium">
              Connected Accounts ({accounts.length})
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </div>

      <ManageAccountsModal
        isOpen={isAccountsModalOpen}
        onClose={() => setIsAccountsModalOpen(false)}
      />

      <ManageWorkspacesModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
