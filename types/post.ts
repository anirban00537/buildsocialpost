export type PostType = "scheduled" | "draft" | "published" | "failed";

export interface Post {
  time?: string;
  lastEdited?: string;
  publishedAt?: string;
  failedAt?: string;
  content: string;
  platform: string;
  status?: string;
  errorMessage?: string;
}

export interface PostGroup {
  date?: string;
  posts: Post[];
}

export interface PostSectionConfig {
  id: PostType;
  title: string;
  icon: React.ReactNode;
  count?: number;
  badgeText?: string;
  emptyStateMessage?: string;
}
