"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  ChevronsUpDown,
} from "lucide-react";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import SubscriptionInfo from "@/components/subscription/status";
import { cn } from "@/lib/utils";
import CreateWorkspaceModal from "@/components/dashboard/workspace/CreateWorkspaceModal";

const Navbar = () => {
  const { workspaces, currentWorkspace } = useSelector(
    (state: RootState) => state.user
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentWorkspace?.id?.toString() || "");
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredWorkspaces = useMemo(() => {
    if (!search) return workspaces;
    return workspaces.filter((workspace) =>
      workspace.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [workspaces, search]);

  const handleCreateWorkspace = (name: string) => {
    // Implement the logic to create a new workspace
    console.log(`Creating new workspace: ${name}`);
    // You might want to dispatch an action here to update your Redux store
  };

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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="h-9 px-3 bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-full transition-colors duration-200"
                >
                  <Users className="h-4 w-4 text-gray-500 mr-2" />
                  <span className="text-sm font-medium">
                    {value
                      ? workspaces.find(
                          (workspace) => workspace.id.toString() === value
                        )?.name
                      : "Select workspace..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search workspace..." 
                    value={search}
                    onValueChange={setSearch}
                  />
                  <CommandList>
                    <CommandEmpty>No workspace found.</CommandEmpty>
                    <CommandGroup>
                      {filteredWorkspaces.map((workspace) => (
                        <CommandItem
                          key={workspace.id}
                          value={workspace.id.toString()}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                            setSearch("");
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === workspace.id.toString()
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {workspace.name}
                          {workspace.isDefault && (
                            <span className="ml-1 text-xs text-gray-200">
                              (Default)
                            </span>
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setIsCreateModalOpen(true);
                        setOpen(false);
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Workspace
                    </CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

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

      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateWorkspace={handleCreateWorkspace}
      />
    </header>
  );
};

export default Navbar;
