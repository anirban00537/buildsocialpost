import { POST_STATUS } from "@/lib/core-constants";

export interface Post {
  time?: string;
  lastEdited?: string;
  publishedAt?: string;
  failedAt?: string;
  content: string;
  platform: string;
  status: PostType;
  errorMessage?: string;
}

export interface PostGroup {
  date?: string;
  posts: Post[];
}

export type PostType = typeof POST_STATUS[keyof typeof POST_STATUS];

export enum PostTypeEnum {
  SCHEDULED = "scheduled",
  DRAFT = "draft",
  PUBLISHED = "published",
  FAILED = "failed",
}

export interface PostSectionConfig {
  id: PostTabId;
  status: PostType;
  title: string;
  icon: React.ReactNode;
  count?: number;
  badgeText?: string;
  emptyStateMessage?: string;
}

export type CreateDraftPostType = {
  content: string;
  postType: "text" | "image" | "video" | "document";
  workspaceId: number;
  linkedInProfileId: number;
  imageUrls?: string[];
  videoUrl?: string;
  documentUrl?: string;
  hashtags?: string[];
  mentions?: string[];
  carouselTitle?: string;
  videoTitle?: string;
};

export type GetPostsType = {
  page: number;
  pageSize: number;
  status: PostType;
  workspace_id: number;
};

export type PostTabId = "scheduled" | "draft" | "published" | "failed";
