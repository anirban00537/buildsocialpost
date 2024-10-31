"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, FileText, CheckCircle2, XCircle } from "lucide-react";
import PostSection from "@/components/post/Post-Section";
import { Button } from "@/components/ui/button";
import { PostType, PostSectionConfig, PostTabId } from "@/types/post";
import { useContentManagement } from "@/hooks/useContent";
import { POST_STATUS } from "@/lib/core-constants";
import { Pagination } from "@/components/ui/pagination";

const postConfigs: PostSectionConfig[] = [
  {
    id: "scheduled",
    status: POST_STATUS.SCHEDULED,
    title: "Scheduled Posts",
    icon: <Calendar className="w-7 h-7 mr-2 text-primary" />,
    badgeText: "AI Enhanced",
    emptyStateMessage: "No scheduled posts",
  },
  {
    id: "draft",
    status: POST_STATUS.DRAFT,
    title: "Drafts",
    icon: <FileText className="w-7 h-7 mr-2 text-primary" />,
    badgeText: "AI Enhanced",
    emptyStateMessage: "No draft posts",
  },
  {
    id: "published",
    status: POST_STATUS.PUBLISHED,
    title: "Published Posts",
    icon: <CheckCircle2 className="w-7 h-7 mr-2 text-green-500" />,
    badgeText: "Published",
    emptyStateMessage: "No published posts",
  },
  {
    id: "failed",
    status: POST_STATUS.FAILED,
    title: "Failed Posts",
    icon: <XCircle className="w-7 h-7 mr-2 text-red-500" />,
    badgeText: "Failed",
    emptyStateMessage: "No failed posts",
  },
];

const ContentManager = () => {
  const {
    activeTab,
    postsData,
    isLoadingPosts,
    handleTabChange,
    pagination,
    handlePageChange,
  } = useContentManagement();

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
      {/* Enhanced Title and Description Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Content Manager
            </h1>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-2xl">
              Manage your scheduled posts and drafts for LinkedIn. Schedule,
              edit, and organize your content efficiently.
            </p>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg
                     flex items-center gap-2 shadow-sm hover:shadow transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            Schedule New Post
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: "Scheduled Posts", value: "12", trend: "+2 this week" },
            { label: "Draft Posts", value: "4", trend: "Last edited 2h ago" },
            {
              label: "Engagement Rate",
              value: "24%",
              trend: "+5% vs last week",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-200 
                                      hover:border-primary/20 transition-colors duration-200"
            >
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border mt-8 border-gray-200">
        {/* Enhanced Tab List */}
        <div className="flex gap-2 px-6 pt-4">
          {postConfigs.map((config) => (
            <button
              key={config.id}
              onClick={() => handleTabChange(config.id)}
              className={`
                px-4 py-2.5 -mb-px border-b-2 relative
                ${
                  activeTab === config.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }
                font-medium text-sm
                transition-all duration-200
                focus:outline-none
                group
              `}
            >
              <div className="flex items-center gap-2">
                <span
                  className={
                    activeTab === config.id ? "text-primary" : "text-gray-400"
                  }
                >
                  {config.icon}
                </span>
                {config.title}
                {postsData[config.id] && (
                  <span
                    className={`
                    ml-1 px-2 py-0.5 rounded-full text-xs
                    ${
                      activeTab === config.id
                        ? "bg-primary/10 text-primary"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
                  >
                    {postsData[config.id].reduce(
                      (acc, group) => acc + group.posts.length,
                      0
                    )}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="border-b border-gray-200" />

        {/* Tab Content */}
        <div className="p-6">
          {isLoadingPosts ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : (
            <>
              <PostSection
                title={postConfigs.find((config) => config.id === activeTab)?.title || ""}
                icon={postConfigs.find((config) => config.id === activeTab)?.icon}
                posts={postsData[activeTab] || []}
                type={activeTab as any}
                badgeText={postConfigs.find((config) => config.id === activeTab)?.badgeText}
                emptyStateMessage={
                  postConfigs.find((config) => config.id === activeTab)?.emptyStateMessage
                }
              />
              
              {pagination.totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
