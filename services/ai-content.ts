import request from "@/lib/request";

export const generateLinkedInPosts = async (dto: {
  prompt: string;
  numPosts: number;
  language?: string;
  tone?: string;
}) => {
  const response = await request.post(
    "/ai-content/generate-linkedin-posts",
    dto
  );
  return response.data;
};
