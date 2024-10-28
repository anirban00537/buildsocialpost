"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Users } from "lucide-react";
import SubscriptionInfo from "@/components/subscription/Status.comp";
import ManageWorkspacesModal from "@/components/dashboard/workspace/Manage-Workspaces-Modal.comp";
import { RootState } from "@/state/store";
import UserMenu from "./User-Menu.comp";

const Navbar = () => {
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-borderColor">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.svg"
                height={250}
                width={250}
                alt="Buildsocialpost.com"
                className=""
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsManageModalOpen(true)}
              className="h-9 px-3 bg-white text-gray-700 hover:bg-gray-50 border hover:text-gray-900 border-gray-300 rounded-full transition-colors duration-200"
            >
              <Users className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium">
                {currentWorkspace?.name || "Select workspace..."}
              </span>
            </Button>
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
            <UserMenu />
          </div>
        </div>
      </div>
      <ManageWorkspacesModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
