import { useMutation, useQuery } from "react-query";
import { createDraft, getPosts } from "@/services/content-posting";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Post, PostGroup, PostType } from "@/types/post";
import { toast } from "react-hot-toast";
import { useState, useCallback, useEffect } from "react";
import { POST_STATUS } from "@/lib/core-constants";
import { PostTabId } from "@/types/post";

export const useContentPosting = () => {
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const { mutateAsync: createDraftMutation, isLoading: isCreatingDraft } =
    useMutation({
      mutationFn: createDraft,
    });

  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  const handleCreateDraft = useCallback(async () => {
    if (!currentWorkspace?.id) {
      toast.error("Please select a workspace first");
      return;
    }

    if (!content.trim()) {
      toast.error("Please add some content first");
      return;
    }

    try {
      console.log("Creating draft");
      await createDraftMutation({
        content: content,
        postType: "text",
        workspaceId: currentWorkspace.id,
        linkedInProfileId: 1,
        imageUrls: [],
        videoUrl: "",
        documentUrl: "",
        hashtags: [],
        mentions: [],
      });

      toast.success("Draft saved successfully");
      // Optionally clear content
      // setContent("");
    } catch (error) {
      toast.error("Failed to save draft");
      console.error("Draft save error:", error);
    }
  }, [content, currentWorkspace?.id, createDraftMutation]);

  const handleSchedule = useCallback((date: Date) => {
    setScheduledDate(date);
    setIsScheduleModalOpen(false);
    console.log("Post scheduled for:", date);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleCreateDraft();
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [handleCreateDraft]);

  return {
    // State
    content,
    setContent,
    isGenerating,
    setIsGenerating,
    isScheduleModalOpen,
    setIsScheduleModalOpen,
    scheduledDate,
    isCreatingDraft,

    // Actions
    handleCreateDraft,
    handleSchedule,
  };
};

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface PostsResponse {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
    pagination: PaginationState;
  };
}

export const useContentManagement = () => {
  const { currentWorkspace } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState<PostTabId>("scheduled");
  const [postsData, setPostsData] = useState<Record<PostTabId, PostGroup[]>>({
    scheduled: [],
    draft: [],
    published: [],
    failed: [],
  });
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 1,
  });

  // Map tab ID to status number
  const getStatusFromTab = (tab: PostTabId): PostType => {
    const statusMap: Record<PostTabId, PostType> = {
      draft: POST_STATUS.DRAFT,
      scheduled: POST_STATUS.SCHEDULED,
      published: POST_STATUS.PUBLISHED,
      failed: POST_STATUS.FAILED,
    };
    return statusMap[tab];
  };

  // Query for fetching posts
  const {
    data,
    isLoading: isLoadingPosts,
    refetch: refetchPosts,
  } = useQuery<PostsResponse>(
    ["posts", currentWorkspace?.id, activeTab, pagination.currentPage],
    () =>
      getPosts({
        workspace_id: currentWorkspace?.id || 0,
        status: getStatusFromTab(activeTab),
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
      }),
    {
      enabled: !!currentWorkspace?.id,
      onSuccess: (response) => {
        setPostsData((prev) => ({
          ...prev,
          [activeTab]: organizePostsByDate(response.data.posts),
        }));
        setPagination(response.data.pagination);
      },
      onError: (error) => {
        toast.error("Failed to fetch posts");
        console.error("Error fetching posts:", error);
      },
    }
  );

  // Helper function to organize posts by date
  const organizePostsByDate = (posts: Post[]): PostGroup[] => {
    if (!Array.isArray(posts)) return [];

    const grouped = posts.reduce((acc: Record<string, Post[]>, post) => {
      const date = getPostDate(post);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        ...post,
        time: post.scheduledTime || post.createdAt,
        content: post.content,
        platform: "linkedin",
        status: post.statusLabel,
      });
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, posts]) => ({
      date,
      posts,
    }));
  };

  // Helper function to get relevant date from post
  const getPostDate = (post: Post): string => {
    if (post.publishedAt)
      return new Date(post.publishedAt).toLocaleDateString();
    if (post.failedAt) return new Date(post.failedAt).toLocaleDateString();
    if (post.time) return new Date(post.time).toLocaleDateString();
    return "No Date";
  };

  const handleTabChange = useCallback((tab: PostTabId) => {
    setActiveTab(tab);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage,
    }));
  }, []);

  return {
    activeTab,
    postsData,
    isLoadingPosts,
    handleTabChange,
    refetchPosts,
    pagination,
    handlePageChange,
  };
};

