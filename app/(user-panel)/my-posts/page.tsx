"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  Filter,
  Plus,
  AlertCircle,
  Sun,
  Moon,
  Clock,
  CalendarDays,
} from "lucide-react";
import {
  PostPreview,
  DropdownItem,
} from "@/components/content-create/PostPreview";
import { Button } from "@/components/ui/button";
import { PostType, PostSectionConfig, PostTabId, Post } from "@/types/post";
import { useContentManagement } from "@/hooks/useContent";
import { POST_STATUS } from "@/lib/core-constants";
import { Pagination } from "@/components/ui/pagination";
import { PostPreviewNotRedux } from "@/components/content-create/PostPreviewNotRedux";
import moment from "moment";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface PostConfig {
  id: PostTabId;
  title: string;
  icon: React.ReactNode;
  emptyStateMessage: string;
}

const postConfigs: PostConfig[] = [
  {
    id: "draft",
    title: "Drafts",
    icon: <FileText className="w-4 h-4" />,
    emptyStateMessage:
      "Create drafts to save your content ideas and work on them later.",
  },
  {
    id: "scheduled",
    title: "Scheduled",
    icon: <Calendar className="w-4 h-4" />,
    emptyStateMessage:
      "Schedule your posts to be published at the perfect time for your audience.",
  },
  {
    id: "published",
    title: "Published",
    icon: <CheckCircle className="w-4 h-4" />,
    emptyStateMessage:
      "Start sharing your content with your network. Your published posts will appear here.",
  },
  {
    id: "failed",
    title: "Failed",
    icon: <AlertCircle className="w-4 h-4" />,
    emptyStateMessage:
      "Posts that failed to publish will appear here. You can retry or edit them.",
  },
];

interface TabHeaderProps {
  activeTab: PostTabId;
  onTabChange: (tabId: PostTabId) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Content Manager
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your drafts and scheduled posts
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/compose">
              <Button
                size="sm"
                className="gap-2 bg-primary text-white hover:bg-primary/90 border-primary"
              >
                <Plus className="w-4 h-4" />
                Create New
              </Button>
            </Link>
            <Link href="/ai-writer">
              <Button
                size="sm"
              className="gap-2 bg-primary text-white hover:bg-primary/90 border-primary"
            >
                <Plus className="w-4 h-4" />
                Viral Post Generator
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex gap-1">
          {postConfigs.map((config) => (
            <button
              key={config.id}
              onClick={() => onTabChange(config.id)}
              className={`
                group relative px-4 py-3 first:ml-0
                font-medium text-sm
                transition-all duration-200
                focus:outline-none
                ${
                  activeTab === config.id
                    ? config.id === "failed"
                      ? "text-red-600"
                      : "text-primary"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`
                    ${
                      activeTab === config.id
                        ? config.id === "failed"
                          ? "text-red-600"
                          : "text-primary"
                        : "text-gray-400 group-hover:text-gray-500"
                    }
                  `}
                >
                  {config.icon}
                </span>
                {config.title}
              </div>

              {/* Active Tab Indicator */}
              <div
                className={`
                absolute bottom-0 left-0 right-0 h-0.5
                transition-all duration-200
                ${
                  activeTab === config.id
                    ? config.id === "failed"
                      ? "bg-red-600"
                      : "bg-primary"
                    : "bg-transparent group-hover:bg-gray-200"
                }
              `}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContentManager = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    activeTab,
    postsData,
    isLoadingPosts,
    handleTabChange,
    pagination,
    handlePageChange,
  } = useContentManagement();

  // Handle URL query params for active tab
  useEffect(() => {
    const tab = searchParams.get("tab") as PostTabId;
    if (tab && postConfigs.some((config) => config.id === tab)) {
      handleTabChange(tab);
    } else if (!searchParams.get("tab")) {
      // Set default tab to 'draft' if none exists
      updateQueryParams("draft");
    }
  }, [searchParams, handleTabChange]);

  // Update URL when tab changes
  const updateQueryParams = (tab: PostTabId) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", tab);
    window.history.pushState({}, "", newUrl.toString());
    handleTabChange(tab);
  };

  // Update tab click handler
  const handleTabClick = (tabId: PostTabId) => {
    updateQueryParams(tabId);
  };

  const handleCreatePost = () => {
    router.push("/compose");
  };

  const handleDelete = async (postId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      console.log("Deleting post:", postId);
    }
  };

  const getDropdownItems = (post: any): DropdownItem[] => {
    const items: DropdownItem[] = [];

    // Add edit option only for draft posts
    if (activeTab === "draft") {
      items.push({
        label: "Edit",
        icon: <Pencil className="h-4 w-4" />,
        href: `/compose?draft_id=${post.id}`,
      });
    }

    // Add delete option for all posts
    items.push({
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => handleDelete(post.id),
      className: "text-red-600",
    });

    return items;
  };

  // Function to format the date group header
  const formatDateGroup = (date: string, tabType?: PostTabId) => {
    const momentDate = moment(date);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");
    const oneWeekAgo = moment().subtract(7, "days").startOf("day");
    const oneYearAgo = moment().subtract(1, "year").startOf("day");

    if (momentDate.isSame(today, "day")) {
      return "Today";
    } else if (momentDate.isSame(yesterday, "day")) {
      return "Yesterday";
    } else if (momentDate.isAfter(oneWeekAgo)) {
      return momentDate.format("dddd");
    } else if (momentDate.isAfter(oneYearAgo)) {
      return momentDate.format("dddd, MMMM D");
    } else {
      return momentDate.format("dddd, MMMM D, YYYY");
    }
  };

  const getDateIcon = (date: string, tabType?: PostTabId) => {
    const momentDate = moment(date);
    const today = moment().startOf("day");
    const yesterday = moment().subtract(1, "day").startOf("day");
    const oneWeekAgo = moment().subtract(7, "days").startOf("day");

    if (momentDate.isSame(today, "day")) {
      return <Clock className="w-4 h-4 text-primary" />;
    } else if (momentDate.isSame(yesterday, "day")) {
      return <Moon className="w-4 h-4 text-indigo-500" />;
    } else if (momentDate.isAfter(oneWeekAgo)) {
      return <Sun className="w-4 h-4 text-amber-500" />;
    } else {
      return <CalendarDays className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen">
      <TabHeader activeTab={activeTab} onTabChange={handleTabClick} />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <div className="p-6">
          {isLoadingPosts ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              {postsData[activeTab]?.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {/* Only show date section if not in draft tab */}
                  {group.date && activeTab !== "draft" && (
                    <div className="relative py-4">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-gray-200/70" />
                      </div>
                      <div className="relative flex justify-center">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="px-4 bg-white rounded-full shadow-sm border border-gray-100 hover:border-gray-200 transition-colors">
                              <div className="flex items-center gap-2.5 py-1.5 px-3">
                                {getDateIcon(group.date, activeTab)}
                                <span className="text-sm font-medium bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                  {formatDateGroup(group.date, activeTab)}
                                </span>
                                <div className="flex gap-1">
                                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                                  <div className="w-1 h-1 rounded-full bg-primary/60" />
                                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                                </div>
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              {moment(group.date).format("dddd, MMMM D, YYYY")}
                              <span className="text-gray-400 ml-1">
                                ({moment(group.date).fromNow()})
                              </span>
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  )}

                  {/* Grid Container */}
                  <div
                    className={`
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                    ${activeTab === "draft" ? "gap-6" : "gap-4"}
                  `}
                  >
                    {group.posts.map((post: Post, postIndex) => (
                      <div key={postIndex} className="flex">
                        <PostPreviewNotRedux
                          content={post.content}
                          isGenerating={false}
                          hideViewModeSelector
                          status={
                            activeTab as
                              | "scheduled"
                              | "draft"
                              | "published"
                              | "failed"
                          }
                          dropdownItems={getDropdownItems(post)}
                          linkedInProfile={post.linkedInProfile}
                          user={post.user}
                          postLogs={post.postLogs}
                          publishedAt={post.publishedAt}
                          scheduledTime={post.scheduledTime}
                          imageUrls={post.imageUrls}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {(!postsData[activeTab] || postsData[activeTab].length === 0) && (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  {/* Icon Container */}
                  <div className="w-16 h-16 mb-6 flex items-center justify-center text-gray-400">
                    {postConfigs.find((config) => config.id === activeTab)?.icon && (
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center
                        ${activeTab === 'failed' 
                          ? 'bg-red-50 text-red-500' 
                          : 'bg-primary/5 text-primary'
                        }
                      `}>
                        {React.cloneElement(
                          postConfigs.find((config) => config.id === activeTab)?.icon as React.ReactElement,
                          { className: 'w-8 h-8' }
                        )}
                      </div>
                    )}
                  </div>

                  {/* Text Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                    {activeTab === "published"
                      ? "Ready to share your story?"
                      : postConfigs.find((config) => config.id === activeTab)?.title}
                  </h3>
                  <p className="text-gray-500 text-center max-w-md mb-8">
                    {postConfigs.find((config) => config.id === activeTab)?.emptyStateMessage}
                  </p>

                  {/* Button */}
                  <Button
                    onClick={handleCreatePost}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg
                              flex items-center gap-2 shadow-sm hover:shadow transition-all duration-200"
                  >
                    <Calendar className="w-4 h-4" />
                    Create New Post
                  </Button>
                </div>
              )}

              {pagination.totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                    totalCount={pagination.totalCount}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
