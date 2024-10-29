import { useMutation } from "react-query";
import { generateLinkedInPosts } from "@/services/ai-content";
import { GenerateLinkedInPostsDTO } from "@/types";
import toast from "react-hot-toast";
import { useState } from "react";

interface Post {
  title: string;
  content: string;
}

export const useGenerateLinkedInPosts = () => {
  const [content, setContent] = useState("");
  const [generatedPosts, setGeneratedPosts] = useState<Post[]>([]);

  const {
    mutateAsync: generateLinkedinPosts,
    isLoading: isGeneratingLinkedinPosts,
  } = useMutation(
    (dto: GenerateLinkedInPostsDTO) => generateLinkedInPosts(dto),
    {
      onSuccess: (response) => {
        if (response.success) {
          const posts = response.data.posts || [];
          console.log(posts, "generated posts from useGenerateLinkedInPosts");
          setGeneratedPosts(posts);
          toast.success("Content generated successfully!");
        } else {
          setGeneratedPosts([]);
          toast.error(response.message || "Failed to generate content");
        }
      },
      onError: (error: Error) => {
        toast.error(`Error generating content: ${error.message}`);
        console.error("Generation error:", error);
      },
    }
  );

  const handleLinkedInTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleGenerateLinkedIn = async () => {
    if (!content.trim()) {
      toast.error("Please enter a topic or prompt");
      return;
    }

    if (content.length < 10) {
      toast.error(
        "Please enter a more detailed prompt (minimum 10 characters)"
      );
      return;
    }

    try {
      await generateLinkedinPosts({
        prompt: content.trim(),
        numPosts: 5,
        language: "en",
        tone: "professional",
      });
    } catch (error) {
      console.error("Error in handleGenerate:", error);
    }
  };

  return {
    content,
    setContent,
    generatedPosts,
    isGeneratingLinkedinPosts,
    handleGenerateLinkedIn,
    handleLinkedInTextChange,
  };
};
