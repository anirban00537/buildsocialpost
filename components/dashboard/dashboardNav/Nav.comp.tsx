"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import SubscriptionInfo from "@/components/subscription/Status.comp";
import CreateWorkspaceModal from "@/components/dashboard/workspace/Create-Workspace-Modal.comp";
import WorkspaceSelector from "./Workspace-Selector.comp";
import UserMenu from "./User-Menu.,comp";

const Navbar = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
            <WorkspaceSelector
              onCreateWorkspace={() => setIsCreateModalOpen(true)}
            />
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
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
