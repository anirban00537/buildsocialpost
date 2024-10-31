import { useMutation } from "react-query";
import { generateLinkedInPosts } from "@/services/ai-content";
import { GenerateLinkedInPostsDTO } from "@/types";
import toast from "react-hot-toast";
import { useState } from "react";

export const useGenerateLinkedInPosts = () => {
  const [content, setContent] = useState("");
  const [generatedPost, setGeneratedPost] = useState<string>("");
  const [postTone, setPostTone] = useState("Professional");
  const [writingStyle, setWritingStyle] = useState("Direct");
  const {
    mutateAsync: generateLinkedinPosts,
    isLoading: isGeneratingLinkedinPosts,
  } = useMutation(
    (dto: GenerateLinkedInPostsDTO) => generateLinkedInPosts(dto),
    {
      onSuccess: (response) => {
        if (response.success) {
          const post = response.data.post;
          console.log(post, "generated post from useGenerateLinkedInPosts");
          setGeneratedPost(post);
          toast.success("Content generated successfully!");
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
        writingStyle: writingStyle,
      });
    } catch (error) {
      console.error("Error in handleGenerate:", error);
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
    writingStyle,
    setWritingStyle,
  };
};
