import { Slide } from "@/types";

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
    description: "Summarize your key points and provide a clear call to action for your audience.",
    imageUrl: null,
    backgroundImage: null,
    showImage: false,
    showTagline: true,
    showTitle: true,
    showDescription: true,
  },
];
