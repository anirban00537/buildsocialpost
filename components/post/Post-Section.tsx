import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Clock,
  Edit,
  MoreHorizontal,
  Calendar,
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PostType, Post, PostGroup } from "@/types/post";
import { POST_STATUS } from "@/lib/core-constants";
import { useRouter } from "next/navigation";

interface PostSectionProps {
  title: string;
  icon: React.ReactNode;
  posts: PostGroup[];
  type: PostType;
  badgeText?: string;
  badgeColor?: string;
  emptyStateMessage?: string;
}

const getTimeDisplay = (post: Post, type: PostType) => {
  switch (type) {
    case POST_STATUS.SCHEDULED:
      return post.time;
    case POST_STATUS.DRAFT:
      return post.lastEdited;
    case POST_STATUS.PUBLISHED:
      return post.publishedAt;
    case POST_STATUS.FAILED:
      return post.failedAt;
    default:
      return "";
  }
};

const getStatusColor = (type: PostType) => {
  switch (type) {
    case POST_STATUS.PUBLISHED:
      return "text-green-600 bg-green-50 border-green-100";
    case POST_STATUS.FAILED:
      return "text-red-600 bg-red-50 border-red-100";
    default:
      return "text-primary bg-primary/10 border-primary/20";
  }
};

const PostSection: React.FC<PostSectionProps> = ({
  title,
  icon,
  posts,
  type,
  badgeText = "AI Enhanced",
  emptyStateMessage = "No posts found",
}) => {
  const router = useRouter();
  const statusColor = getStatusColor(type);

  const handleEditPost = (postId: number) => {
    router.push(`/compose?draft_id=${postId}`);
  };

  return (
    <Card className="bg-white border-none shadow-none p-0">
      <CardHeader className="p-0 pb-2 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="flex items-center text-xl font-medium text-gray-800">
              {icon}
              {title}
            </h2>
            {badgeText && (
              <div
                className={`flex items-center gap-1 text-[11px] font-medium 
                              px-2 py-0.5 rounded-full border ${statusColor}`}
              >
                <Sparkles className="h-3 w-3" />
                <span>{badgeText}</span>
              </div>
            )}
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" size="sm" className="text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">More options</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-0 mt-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {emptyStateMessage}
          </div>
        ) : (
          posts.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
              {group.date && (
                <h3 className="text-sm font-medium text-gray-600 bg-gray-50/80 p-2 rounded-md">
                  {group.date}
                </h3>
              )}
              {group.posts.map((post, postIndex) => (
                <Card
                  key={postIndex}
                  className="group border border-gray-100 hover:border-primary/20 
                             shadow-sm hover:shadow-md transition-all duration-200 
                             cursor-pointer bg-white hover:bg-primary/[0.02]"
                >
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div
                      className="flex-shrink-0 w-28 text-xs font-medium text-gray-600 
                                    flex items-center gap-2 group-hover:text-primary"
                    >
                      <Clock className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                      {getTimeDisplay(post, type)}
                    </div>
                    <div className="flex-grow">
                      <p
                        className="text-sm text-gray-700 line-clamp-2 group-hover:line-clamp-none 
                                   transition-all duration-300 group-hover:text-gray-900"
                      >
                        {post.content}
                      </p>
                      {type === POST_STATUS.FAILED && post.errorMessage && (
                        <p className="text-xs text-red-500 mt-1">
                          {post.errorMessage}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/linkedin-logo.webp"
                          alt="linkedin"
                          width={20}
                          height={20}
                          className="opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                        />
                        <span className="text-xs text-gray-500">LinkedIn</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {type !== POST_STATUS.PUBLISHED && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 bg-white hover:bg-gray-50 text-gray-700 
                                         ring-1 ring-gray-200 hover:ring-blue-200 
                                         rounded-lg transition-all duration-200
                                         hover:text-gray-700"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent any parent click handlers
                                  handleEditPost(post.id);
                                }}
                              >
                                <Edit className="w-3.5 h-3.5 mr-1.5" />
                                Edit
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Edit post</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 bg-white hover:bg-gray-50 text-gray-700 
                                       ring-1 ring-gray-200 hover:ring-blue-200 
                                       rounded-lg transition-all duration-200
                                       hover:text-gray-700"
                            >
                              <MoreHorizontal className="w-3.5 h-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">More options</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default PostSection;
