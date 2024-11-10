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
  Pen,
  Wand2,
  Settings,
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
import { LucideIcon } from "lucide-react";

// Define base interface for navigation items
interface BaseNavigationItem {
  id: string;
  name: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  badgeColor?: string;
  counter?: number;
  shortcut?: string;
}

// Define specific types for each section
type ToolItem = BaseNavigationItem & {
  shortcut: string; // Required for tools
};

type FeatureItem = BaseNavigationItem & {
  badge?: string;
  badgeColor?: string;
};

type ManagementItem = BaseNavigationItem & {
  counter?: number;
};

const features: FeatureItem[] = [
  {
    id: "ai-writer",
    name: "AI Writer",
    icon: Wand2,
    href: "/ai-writer",
    badge: "Pro",
    badgeColor: "bg-gradient-to-r from-indigo-500 to-blue-500",
  },
  {
    id: "carousel-editor",
    name: "Carousel Editor",
    icon: Layers,
    href: "/carousel-editor",
    badge: "New",
    badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
];

const management: ManagementItem[] = [
  {
    id: "carousels",
    name: "My Carousels",
    icon: LayoutTemplate,
    href: "/carousels",
    counter: 0,
  },
  {
    id: "my-posts",
    name: "My Posts",
    icon: Calendar,
    href: "/my-posts",
    counter: 5,
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    id: "media",
    name: "Media",
    icon: ImageIcon,
    href: "/media",
  },
];

// Navigation Section Component
const NavigationSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1 px-3">
    <h3 className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase">
      {title}
    </h3>
    {children}
  </div>
);

// Navigation Item Component
interface NavigationItemProps {
  item: BaseNavigationItem;
  isActive: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, isActive }) => (
  <Link href={item.href} passHref>
    <span
      className={`
        group relative w-full flex items-center px-3 py-2 rounded-lg transition-all duration-200
        ${
          isActive
            ? "bg-blue-50 text-blue-700"
            : "text-gray-600 hover:bg-gray-50"
        }
      `}
    >
      <item.icon
        className={`h-4 w-4 mr-3 ${
          isActive ? "text-blue-600" : "text-gray-400"
        }`}
      />
      <span className="text-sm">{item.name}</span>
      {item.badge && (
        <span
          className={`
            ml-auto text-xs text-white px-2 py-0.5 rounded-full
            ${item.badgeColor || "bg-blue-500"}
          `}
        >
          {item.badge}
        </span>
      )}
      {item.counter !== undefined && (
        <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded-full">
          {item.counter}
        </span>
      )}
    </span>
  </Link>
);

// Main Navigation Component
const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-6">
      <NavigationSection title="Tools">
        {features.map((feature) => (
          <NavigationItem
            key={feature.id}
            item={feature}
            isActive={
              pathname === feature.href ||
              pathname.startsWith(feature.href + "/")
            }
          />
        ))}
      </NavigationSection>

      <NavigationSection title="Management">
        {management.map((item) => (
          <NavigationItem
            key={item.id}
            item={item}
            isActive={
              pathname === item.href || pathname.startsWith(item.href + "/")
            }
          />
        ))}
      </NavigationSection>
    </nav>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { userinfo, currentWorkspace, wordUsage, subscription } = useSelector(
    (state: RootState) => state.user
  );
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);

  const aiUsage = {
    used: wordUsage?.usage?.used || 0,
    remaining: wordUsage?.usage?.remaining || 0,
    total: wordUsage?.usage?.total || 0,
    percentage: wordUsage?.percentage?.used || 0,
    isActive: wordUsage?.usage?.isActive || false,
  };

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
    <div className="w-72 h-screen flex flex-col bg-white border-r border-gray-100">
      {/* Logo Section */}
      <div className="px-6 py-4 border-b border-gray-100">
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
      <div className="p-3">
        <Button
          variant="outline"
          onClick={() => setIsManageModalOpen(true)}
          className="w-full h-9 justify-between text-gray-600 bg-gray-50/50 border border-gray-200 hover:bg-gray-100/50"
        >
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm">
              {currentWorkspace?.name || "Select workspace..."}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </Button>
      </div>

      {/* Create Button */}
      <div className="px-3 pb-2">
        <Link href="/compose" className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 h-9">
            <Plus className="h-4 w-4" />
            Create New
            <span className="ml-auto text-xs bg-white/10 px-1.5 py-0.5 rounded">
              Ctrl + N
            </span>
          </Button>
        </Link>
      </div>

      {/* Main Navigation */}
      <Navigation />

      {/* User Section */}
      <div className="mt-auto border-t border-gray-100">
        {/* LinkedIn Accounts Section */}
        <button
          onClick={() => setIsAccountsModalOpen(true)}
          className="w-full flex items-center px-4 py-2.5 text-gray-600 hover:bg-gray-50 border-b border-gray-100"
        >
          <Linkedin className="h-4 w-4 mr-2 text-[#0A66C2]" />
          <span className="text-sm">Manage LinkedIn Accounts</span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </button>
        <SubscriptionInfo />
        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              {userinfo?.first_name?.charAt(0) || "M"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-700">
                {userinfo?.first_name || "Mr"}
              </span>
              <span className="text-xs text-gray-500">
                {userinfo?.email || "user@email.com"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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
