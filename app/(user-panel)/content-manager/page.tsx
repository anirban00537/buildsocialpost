"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar, FileText, CheckCircle2, XCircle } from "lucide-react";
import PostSection from "@/components/post/Post-Section";
import { Button } from "@/components/ui/button";
import { PostType, PostSectionConfig } from "@/types/post";

// Define posts data for each type
const postsData = {
  scheduled: [
    {
      date: "Tomorrow | May 15",
      posts: [
        {
          time: "08:14 am",
          content: "Self-improvement isn't about perfection. It's about progress...",
          platform: "linkedin",
        },
        {
          time: "01:02 pm",
          content: "I've witnessed a lot of regular ol' Joe and Janes outperforming...",
          platform: "linkedin",
        },
      ],
    },
  ],
  draft: [
    {
      posts: [
        {
          lastEdited: "2 hours ago",
          content: "The biggest mistake I see people make on LinkedIn is...",
          platform: "linkedin",
        },
        {
          lastEdited: "Yesterday",
          content: "Here's what I learned after posting content for 30 days straight:",
          platform: "linkedin",
        },
      ],
    },
  ],
  published: [
    {
      date: "Today",
      posts: [
        {
          publishedAt: "3 hours ago",
          content: "Leadership isn't about being in charge. It's about taking care of those in your charge.",
          platform: "linkedin",
        },
      ],
    },
  ],
  failed: [
    {
      date: "Today",
      posts: [
        {
          failedAt: "1 hour ago",
          content: "The key to success in digital marketing is...",
          platform: "linkedin",
          errorMessage: "API Error: Connection timeout",
        },
      ],
    },
  ],
} as Record<PostType, Array<{ date?: string; posts: Array<any> }>>;

const postConfigs: PostSectionConfig[] = [
  {
    id: "scheduled",
    title: "Scheduled Posts",
    icon: <Calendar className="w-7 h-7 mr-2 text-primary" />,
    count: 12,
    badgeText: "AI Enhanced",
    emptyStateMessage: "No scheduled posts"
  },
  {
    id: "draft",
    title: "Drafts",
    icon: <FileText className="w-7 h-7 mr-2 text-primary" />,
    count: 4,
    badgeText: "AI Enhanced",
    emptyStateMessage: "No draft posts"
  },
  {
    id: "published",
    title: "Published Posts",
    icon: <CheckCircle2 className="w-7 h-7 mr-2 text-green-500" />,
    count: 24,
    badgeText: "Published",
    emptyStateMessage: "No published posts"
  },
  {
    id: "failed",
    title: "Failed Posts",
    icon: <XCircle className="w-7 h-7 mr-2 text-red-500" />,
    count: 1,
    badgeText: "Failed",
    emptyStateMessage: "No failed posts"
  }
];

const ContentManager = () => {
  const [activeTab, setActiveTab] = useState("scheduled");

  return (
    <div className="mx-auto p-6 space-y-8 max-w-[1200px]">
      {/* Enhanced Title and Description Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              Content Manager
            </h1>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed max-w-2xl">
              Manage your scheduled posts and drafts for LinkedIn. Schedule, edit, and organize your content efficiently.
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
            { label: 'Scheduled Posts', value: '12', trend: '+2 this week' },
            { label: 'Draft Posts', value: '4', trend: 'Last edited 2h ago' },
            { label: 'Engagement Rate', value: '24%', trend: '+5% vs last week' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 
                                      hover:border-primary/20 transition-colors duration-200">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Enhanced Tab List */}
        <div className="flex gap-2 px-6 pt-4">
          {postConfigs.map((config) => (
            <button
              key={config.id}
              onClick={() => setActiveTab(config.id)}
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
                <span className={`
                  ${activeTab === config.id ? 'text-primary' : 'text-gray-400'}
                  group-hover:scale-110 transition-transform duration-200
                `}>
                  {config.icon}
                </span>
                {config.title}
                {config.count && (
                  <span className={`
                    ml-1 px-2 py-0.5 rounded-full text-xs
                    ${activeTab === config.id 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-gray-100 text-gray-600'}
                  `}>
                    {config.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="border-b border-gray-200" />

        {/* Tab Content */}
        <div className="p-6">
          <PostSection
            title={postConfigs.find(config => config.id === activeTab)?.title || ""}
            icon={postConfigs.find(config => config.id === activeTab)?.icon}
            posts={postsData[activeTab as PostType] || []}
            type={activeTab as PostType}
            badgeText={postConfigs.find(config => config.id === activeTab)?.badgeText}
            emptyStateMessage={postConfigs.find(config => config.id === activeTab)?.emptyStateMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
