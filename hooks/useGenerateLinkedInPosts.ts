import { useMutation, useQueryClient } from "react-query";
import { generateLinkedInPosts } from "@/services/ai-content";
import { GenerateLinkedInPostsDTO } from "@/types";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

export const useGenerateLinkedInPosts = () => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [generatedPost, setGeneratedPost] = useState<string>("");
  const [postTone, setPostTone] = useState("Professional");
  const {
    mutateAsync: generateLinkedinPosts,
    isLoading: isGeneratingLinkedinPosts,
  } = useMutation(
    (dto: GenerateLinkedInPostsDTO) => generateLinkedInPosts(dto),
    {
      onSuccess: async (response) => {
        if (response.success) {
          const post = response.data.post;
          console.log(post, "generated post from useGenerateLinkedInPosts");
          setGeneratedPost(post);
          toast.success("Content generated successfully!");

          // Refetch subscription data to update usage
          await queryClient.refetchQueries(["subscription"]);
        } else {
          setGeneratedPost("");
          toast.error(response.message || "Failed to generate content");
        }
      },
      onError: (error: Error) => {
        toast.error(`Error generating content: ${error.message}`);
        console.error("Generation error:", error);
      },
    }
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        if (!isGeneratingLinkedinPosts) {
          handleGenerateLinkedIn();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [content, isGeneratingLinkedinPosts]);

  const handleLinkedInTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
        language: "en",
        tone: postTone,
      });
    } catch (error) {
      console.error("Error in handleGenerate:", error);
      // Refetch subscription data even on error to ensure usage is up to date
      await queryClient.refetchQueries(["subscription"]);
    }
  };

  return {
    content,
    setContent,
    generatedPost,
    isGeneratingLinkedinPosts,
    handleGenerateLinkedIn,
    handleLinkedInTextChange,
    postTone,
    setPostTone,
  };
};
