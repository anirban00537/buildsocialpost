import { CarouselState, Slide } from "@/types";
import { sharedElements } from "./core-constants";

export const initialSlides: Slide[] = [
  {
    type: "intro",
    title: "Your Intro Title Goes Here",
    tagline: "A Catchy Tagline for Your Presentation",
    description:
      "Welcome to this demo presentation. Here you can add a brief introduction to your topic.",
    imageUrl: null,
    backgroundImage: null,
    showImage: false,
    showTagline: true,
    showTitle: true,
    showDescription: true,
  },
  {
    type: "slide",
    title: "Main Content Slide",
    description:
      "This is where you can put your main content. Add key points, data, or any information relevant to your presentation.",
    imageUrl: null,
    backgroundImage: null,
    showImage: true,
    showTagline: false,
    showTitle: true,
    showDescription: true,
  },
  {
    type: "outro",
    title: "Conclusion and Call to Action",
    tagline: "What's Next?",
    description:
      "Summarize your key points and provide a clear call to action for your audience.",
    imageUrl: null,
    backgroundImage: null,
    showImage: false,
    showTagline: true,
    showTitle: true,
    showDescription: true,
  },
];

export const initialCarousel: CarouselState = {
  name: "New Carousel",
  slides: initialSlides,
  background: {
    color1: "#081022",
    color2: "#F7FAFC",
    color3: "#2D3748",
    color4: "#63B3ED",
  },
  sharedSelectedElement: {
    id: sharedElements[0].id,
    opacity: 0.099,
  },
  titleTextSettings: {
    alignment: "left",
    fontSize: 48,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  descriptionTextSettings: {
    alignment: "left",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
  },
  taglineTextSettings: {
    alignment: "left",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "normal",
  },
  layout: {
    height: 600,
    width: 600,
    pattern: 7,
    backgroundOpacity: 0.02,
    gradient: true,
  },
  fontFamily: "poppins",
  globalBackground: null,
};
import { FileText, Youtube, Globe, Newspaper, BookOpen, MessageSquare } from "lucide-react";

export const contentSources = [
  {
    id: "text",
    label: "Custom Text",
    icon: FileText,
    placeholder: "What would you like to write about? Be specific to get better results..."
  },
  {
    id: "youtube",
    label: "YouTube Video",
    icon: Youtube,
    placeholder: "Paste your YouTube video URL here..."
  },
  {
    id: "blog",
    label: "Blog Post",
    icon: Globe,
    placeholder: "Paste your blog post URL here..."
  },
  {
    id: "article",
    label: "News Article",
    icon: Newspaper,
    placeholder: "Paste the article URL here..."
  },
  {
    id: "book",
    label: "Book Summary",
    icon: BookOpen,
    placeholder: "Enter the book title or paste Goodreads URL..."
  },
  {
    id: "thread",
    label: "Twitter Thread",
    icon: MessageSquare,
    placeholder: "Paste the Twitter thread URL here..."
  }
];

export const carouselTemplates = [
  {
    id: 1,
    name: "How-To Guide",
    slides: 5,
    icon: "📝"
  },
  {
    id: 2,
    name: "Case Study",
    slides: 6,
    icon: "📊"
  },
  {
    id: 3,
    name: "Tips & Tricks",
    slides: 4,
    icon: "💡"
  },
  {
    id: 4,
    name: "Industry Insights",
    slides: 5,
    icon: "🎯"
  },
  {
    id: 5,
    name: "Product Launch",
    slides: 6,
    icon: "🚀"
  },
  {
    id: 6,
    name: "Success Story",
    slides: 4,
    icon: "🏆"
  }
];
