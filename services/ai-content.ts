import request from "@/lib/request";

export const generateLinkedInPosts = async (dto: {
  prompt: string;
  language?: string;
  tone?: string;
}) => {
  const response = await request.post(
    "/ai-content/generate-linkedin-posts",
    dto
  );
  return response.data;
};
export const generateCarouselContent = async (
  topic: string,
  numSlides: number,
  language: string,
  mood: string,
  theme: string,
  contentStyle: string,
  targetAudience: string,
  themeActive: boolean
) => {
  const response = await request.post("/ai-content/generate-carousel-content", {
    topic,
    numSlides,
    language,
    mood,
    theme,
    contentStyle,
    targetAudience,
    themeActive,
  });
  return response.data;
};