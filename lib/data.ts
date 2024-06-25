import { Slide } from "@/types";

export const initialSlides: Slide[] = [
  {
    type: "intro",
    title: "Amazing Catchy Title Goes Right Here!",
    tagline: "Your amazing tagline goes here",
    description: "Your amazing description goes here.",
    imageUrl: null,
  },
  {
    type: "slide",
    title: "Section Title",
    description: "Put your content here.",
    imageUrl:
      "https://images.unsplash.com/photo-1719242086474-426087b8e0d3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    type: "slide",
    title: "Section Title",
    description: "Put your content here.",
    imageUrl:
      "https://images.unsplash.com/photo-1719263233866-a4e4908cf3af?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    type: "outro",
    title: "Section Title",
    tagline: "Your amazing tagline goes here",
    description: "Put your content here.",
    imageUrl: null,
  },
];
