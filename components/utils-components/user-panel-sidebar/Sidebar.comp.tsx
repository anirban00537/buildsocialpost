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
  User,
  BarChart2,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  Key,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SubscriptionInfo from "@/components/subscription/Status.comp";
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
  description?: string;
}

// Define specific types for each section
type ToolItem = BaseNavigationItem & {
  shortcut: string;
};

type FeatureItem = BaseNavigationItem & {
  badge?: string;
  badgeColor?: string;
};

type ManagementItem = BaseNavigationItem & {
  counter?: number;
};

type SettingsItem = BaseNavigationItem & {
  badgeColor?: string;
};

interface SettingsSection {
  id: string;
  name: string;
  icon: LucideIcon;
  items: SettingsItem[];
}

const features: FeatureItem[] = [
  {
    id: "ai-writer",
    name: "AI Writer",
    icon: Wand2,
    href: "/ai-writer",
    badge: "Pro",
    badgeColor: "bg-gradient-to-r from-indigo-500 to-blue-500 text-white",
  },
  {
    id: "carousel-editor",
    name: "Carousel Editor",
    icon: Layers,
    href: "/carousel-editor",
    badge: "New",
    badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
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
    id: "media",
    name: "Media",
    icon: ImageIcon,
    href: "/media",
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

// Define the settings items array with simplified structure
const settingsItems: SettingsItem[] = [
  {
    id: "settings-general",
    name: "General",
    icon: Settings,
    href: "/settings/general",
  },
  {
    id: "settings-profile",
    name: "Profile",
    icon: User,
    href: "/settings/profile",
  },
  {
    id: "settings-workspace",
    name: "Workspace",
    icon: Users,
    href: "/settings/workspace",
  },
  {
    id: "settings-linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    href: "/settings/linkedin",
  },
  {
    id: "settings-ai",
    name: "AI Settings",
    icon: Wand2,
    href: "/settings/ai",
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
  <div className="space-y-1">
    <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
      {title}
    </h3>
    {children}
  </div>
);

// Simplified NavigationItem component with updated styling
const NavigationItem: React.FC<{
  item: FeatureItem | ManagementItem;
  isActive: boolean;
  hasSubItems?: boolean;
}> = ({ item, isActive, hasSubItems }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isSettings = item.id === "settings";
  const showSubItems = isSettings && isExpanded;

  useEffect(() => {
    if (isSettings && pathname.startsWith('/settings')) {
      setIsExpanded(true);
    }
  }, [isSettings, pathname]);

  return (
    <div>
      <div
        onClick={() => isSettings && setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-x-3 px-3 py-2 rounded-lg cursor-pointer",
          isActive || (isSettings && pathname.startsWith('/settings'))
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "group"
        )}
      >
        <item.icon className={cn(
          "h-4 w-4",
          isActive || (isSettings && pathname.startsWith('/settings'))
            ? "text-blue-600"
            : "text-gray-400 group-hover:text-gray-500"
        )} />
        <span className="text-sm font-medium flex-1">{item.name}</span>
        {hasSubItems && (
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform duration-200",
            isActive || (isSettings && pathname.startsWith('/settings'))
              ? "text-blue-600"
              : "text-gray-400",
            isExpanded && "transform rotate-180"
          )} />
        )}
      </div>

      {/* Settings Sub-items */}
      {showSubItems && (
        <div className="ml-7 space-y-1 mt-1">
          {settingsItems.map((subItem) => (
            <Link
              key={subItem.id}
              href={subItem.href}
              className={cn(
                "flex items-center gap-x-3 px-3 py-2 text-sm rounded-lg",
                pathname === subItem.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <subItem.icon className={cn(
                "h-4 w-4",
                pathname === subItem.href
                  ? "text-blue-600"
                  : "text-gray-400 group-hover:text-gray-500"
              )} />
              <span>{subItem.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Settings Navigation Section Component
const SettingsNavigationSection: React.FC<{
  section: SettingsSection;
  isActive: boolean;
}> = ({ section, isActive }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (section.items.some((item) => pathname.startsWith(item.href))) {
      setIsExpanded(true);
    }
  }, [pathname, section.items]);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200",
          isActive ? "bg-gray-50" : "hover:bg-gray-50/50",
          "group"
        )}
      >
        <div className="flex items-center gap-3">
          <section.icon className="h-4 w-4 text-gray-400 group-hover:text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {section.name}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-400 transition-transform duration-200",
            isExpanded && "transform rotate-180"
          )}
        />
      </button>

      {isExpanded && (
        <div className="ml-4 pl-4 border-l border-gray-100 space-y-1 py-1">
          {section.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group",
                pathname === item.href
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4",
                  pathname === item.href
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Main Navigation Component
const Navigation = () => {
  const pathname = usePathname();

  // Create settings section
  const settingsSection: SettingsSection = {
    id: "settings-section",
    name: "Settings",
    icon: Settings,
    items: settingsItems
  };

  return (
    <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-6">
      <NavigationSection title="TOOLS">
        {features.map((feature) => (
          <NavigationItem
            key={feature.id}
            item={feature}
            isActive={pathname === feature.href}
          />
        ))}
      </NavigationSection>

      <NavigationSection title="MANAGEMENT">
        {management.map((item) => (
          item.id === "settings" ? (
            <SettingsNavigationSection
              key={item.id}
              section={settingsSection}
              isActive={pathname.startsWith('/settings')}
            />
          ) : (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={pathname === item.href}
            />
          )
        ))}
      </NavigationSection>
    </nav>
  );
};

const Sidebar = () => {
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
    <div className="w-72 h-screen flex flex-col bg-white border-r border-gray-200">
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

        {/* AI Usage Section */}
        <div className="px-4 py-2.5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">AI Usage</span>
            <span className="text-xs text-gray-500">
              {formatTokens(aiUsage.used)} / {formatTokens(aiUsage.total)} words
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{
                width: `${aiUsage.percentage}%`,
              }}
            />
          </div>
        </div>

        <SubscriptionInfo />

        {/* User Profile */}
        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              {userinfo?.first_name?.charAt(0) || "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {userinfo?.first_name || "User"}
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
