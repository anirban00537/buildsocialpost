import request from "@/lib/request";

export const generateLinkedInPosts = async (dto: {
  prompt: string;
  language?: string;
  tone?: string;
  writingStyle?: string;
}) => {
  const response = await request.post(
    "/ai-content/generate-linkedin-posts",
    dto
  );
  return response.data;
};
