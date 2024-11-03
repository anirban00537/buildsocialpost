"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, FileText, CheckCircle2, XCircle, Pencil, Trash2 } from "lucide-react";
import { PostPreview, DropdownItem } from "@/components/content-create/PostPreview";
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
  const router = useRouter();
  const {
    activeTab,
    postsData,
    isLoadingPosts,
    handleTabChange,
    pagination,
    handlePageChange,
  } = useContentManagement();

  const handleCreatePost = () => {
    router.push('/compose');
  };

  const handleEdit = (postId: string) => {
    router.push(`/compose?draft_id=${postId}`);
  };

  const handleDelete = async (postId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      console.log('Deleting post:', postId);
    }
  };

  const getDropdownItems = (post: any): DropdownItem[] => {
    const items: DropdownItem[] = [];
    
    // Add edit option only for draft posts
    if (activeTab === 'draft') {
      items.push({
        label: 'Edit',
        icon: <Pencil className="h-4 w-4" />,
        href: `/compose?draft_id=${post.id}`
      });
    }
    
    // Add delete option for all posts
    items.push({
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => handleDelete(post.id),
      className: 'text-red-600'
    });

    return items;
  };

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
            onClick={handleCreatePost}
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg
                     flex items-center gap-2 shadow-sm hover:shadow transition-all duration-200"
          >
            <Calendar className="w-4 h-4" />
            Schedule New Post
          </Button>
        </div>
      </div>

      <div className="bg-cardBackground rounded-xl border mt-8 border-gray-200">
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
              </div>
            </button>
          ))}
        </div>

        <div className="border-b border-gray-200" />

        {/* Updated Tab Content with Grid Layout */}
        <div className="p-6">
          {isLoadingPosts ? (
            <div className="flex justify-center items-center h-40">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : (
            <div className="space-y-6">
              {postsData[activeTab]?.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.date && (
                    <h3 className="text-sm font-medium text-gray-600 bg-gray-50/80 p-2 rounded-md mb-3">
                      {group.date}
                    </h3>
                  )}
                  {/* Grid Container */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.posts.map((post, postIndex) => (
                      <div key={postIndex} className="flex">
                        <PostPreview
                          title=""
                          content={post.content}
                          isGenerating={false}
                          hideViewModeSelector
                          status={activeTab as 'scheduled' | 'draft' | 'failed'}
                          dropdownItems={getDropdownItems(post)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {(!postsData[activeTab] || postsData[activeTab].length === 0) && (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-16 h-16 mb-4">
                    {postConfigs.find((config) => config.id === activeTab)?.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {activeTab === 'published' 
                      ? "Ready to share your story?" 
                      : postConfigs.find((config) => config.id === activeTab)?.title}
                  </h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    {activeTab === 'published'
                      ? "Start sharing your content with your network. Your published posts will appear here."
                      : postConfigs.find((config) => config.id === activeTab)?.emptyStateMessage}
                  </p>
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
