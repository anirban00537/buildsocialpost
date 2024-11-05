import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  CreditCard,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UserMenu: React.FC = () => {
  const { userinfo } = useSelector((state: RootState) => state.user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200">
          <div className="relative h-8 w-8 rounded-full overflow-hidden ring-2 ring-white group-hover:ring-blue-200 transition-all duration-200">
            <Image
              src={userinfo?.photo || "/creator.jpg"}
              alt={
                userinfo?.first_name + " " + userinfo?.last_name ||
                "User avatar"
              }
              layout="fill"
              objectFit="cover"
              className="transform group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
              {userinfo?.first_name + " " + userinfo?.last_name || "Guest User"}
            </span>
            <span className="text-xs text-gray-500">
              {userinfo?.email || "guest@example.com"}
            </span>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-2" align="end">
        {/* User Info Section */}
        <div className="px-2 py-3 mb-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-white">
              <Image
                src={userinfo?.photo || "/creator.jpg"}
                alt="Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-900">
                {userinfo?.first_name + " " + userinfo?.last_name}
              </span>
              <span className="text-xs text-gray-500">{userinfo?.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              Pro Member
            </Badge>
            <Badge
              variant="secondary"
              className="bg-amber-100 text-amber-700 hover:bg-amber-200"
            >
              5 Workspaces
            </Badge>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50">
            <User className="w-4 h-4 text-gray-500" />
            <span>Profile Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50">
            <Bell className="w-4 h-4 text-gray-500" />
            <span>Notifications</span>
            <Badge className="ml-auto bg-red-100 text-red-700 hover:bg-red-200">
              3
            </Badge>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50">
            <CreditCard className="w-4 h-4 text-gray-500" />
            <span>Billing & Plans</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50">
            <Users className="w-4 h-4 text-gray-500" />
            <span>Team Management</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50">
            <Star className="w-4 h-4 text-amber-500" />
            <span>Upgrade to Pro</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50">
            <HelpCircle className="w-4 h-4 text-gray-500" />
            <span>Help & Support</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="flex items-center gap-2 px-2 py-2 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
