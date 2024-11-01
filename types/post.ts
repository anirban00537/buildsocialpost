import { POST_STATUS } from "@/lib/core-constants";

// Base Post Types
export interface Post {
  time?: string;
  lastEdited?: string;
  publishedAt?: string;
  failedAt?: string;
  content: string;
  platform: string;
  status: PostType;
  errorMessage?: string;
  id: number;
}

export interface PostGroup<T extends Post = Post> {
  date?: string;
  posts: T[];
}

// Post Status Types
export type PostType = typeof POST_STATUS[keyof typeof POST_STATUS];

export enum PostTypeEnum {
  SCHEDULED = "scheduled",
  DRAFT = "draft",
  PUBLISHED = "published",
  FAILED = "failed",
}

export type PostTabId = "scheduled" | "draft" | "published" | "failed";

// UI Configuration Types
export interface PostSectionConfig {
  id: PostTabId;
  status: PostType;
  title: string;
  icon: React.ReactNode;
  count?: number;
  badgeText?: string;
  emptyStateMessage?: string;
}

// API Request Types
export type GetPostsType = {
  page: number;
  pageSize: number;
  status: PostType;
  workspace_id: number;
};

// Draft Creation Types
export type PostContentType = "text" | "image" | "video" | "document";

export interface CreateDraftParams {
  content: string;
  postType?: PostContentType;
  workspaceId?: number;
  linkedInProfileId?: number;
  imageUrls?: string[];
  videoUrl?: string;
  documentUrl?: string;
  hashtags?: string[];
  mentions?: string[];
}

export interface CreateDraftPostType extends Required<Omit<CreateDraftParams, 'postType'>> {
  postType: PostContentType;
  carouselTitle?: string;
  videoTitle?: string;
  id?: number;
}

// API Response Types
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PostsResponse {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
    pagination: PaginationState;
  };
}
