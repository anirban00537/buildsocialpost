import { BackgroundColors } from "@/types";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export const generateCaruselContentFromTopic = async (
  topic: string,
  numSlides: number,
  temperature = 0.4,
  language = "en",
  mood = "neutral"
) => {
  try {
    const maxTokensPerSlide = 100;
    const maxTokens = Math.min(numSlides * maxTokensPerSlide, 1000); // Ensure max tokens do not exceed 1000

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "user",
          content: `You are an expert LinkedIn carousel content creator. Generate ${numSlides} engaging and informative carousel slides on the topic "${topic}". The ${numSlides} slides should exclude the intro and outro. Use the following format and guidelines:

          Guidelines:
          - Each slide should focus on a single idea or concept.
          - Ensure that the content is concise, clear, and engaging.
          - Reorganize and rephrase content to fit the slide format naturally.
          - **Wrap the most important keywords, phrases, and concepts in both the title and description within <strong></strong> tags.** This is crucial for highlighting key points.
          - Use a consistent tone that matches the specified mood (${mood}).
          - Avoid any additional text or explanations beyond the specified format.
          - Do not provide any markdown formatting.
          
          
          Format:

          [Intro]
          type: intro
          tagline: [max 60 characters]
          title: [max 60 characters]
          description: [200-300 characters]

          [Slide {n}]
          type: slide
          title: [max 60 characters, with important text wrapped in <strong></strong> tags]
          description: [200-300 characters, with important text wrapped in <strong></strong> tags]

          [Outro]
          type: outro
          tagline: [max 60 characters]
          title: [max 60 characters]
          description: [200-300 characters]

          The content should be in ${language} and convey a ${mood} mood. Ensure that important text is wrapped in <strong></strong> tags as instructed. Do not include any additional text or explanations.
          `,
        },
      ],
      max_tokens: maxTokens,
      temperature: Number(temperature),
    });

    if (response && response.choices && response.choices.length > 0) {
      return response.choices[0].message.content;
    } else {
      throw new Error("No response from OpenAI");
    }
  } catch (error) {
    console.error("Error generating carousel content:", error);
    throw error;
  }
};

export const generateCarouselColorPaletteFromPromptTopic = async (
  topic: string,
  theme: string
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "user",
          content: `You are an expert color palette generator. Generate a ${theme} theme color palette for the topic "${topic}". The color palette should be a list of hex color codes. Give me only 4 colors. This is for an AI carousel generator application. The colors will be used for LinkedIn, Instagram, and TikTok carousels.

Guidelines:
- color1: Background color of the carousel. If the topic is a well-known brand, use its primary color here. For ${theme} theme, use ${
            theme === "light" ? "lighter" : "darker"
          } shades.
- color2: Text color of the carousel. Ensure high contrast with the background for readability. For ${theme} theme, use ${
            theme === "light" ? "darker" : "lighter"
          } shades.
- color3: Tint color of the carousel. This should complement the other colors and fit the ${theme} theme.
- color4: Accent color of the carousel. This must be distinct from the brand color (if used) and provide good contrast. Ensure it's visible on the ${theme} background.
- If a brand color is used for the background, choose complementary colors for text and accent that maintain brand consistency and ensure readability.
- The brand color and accent color must be different.
- Only provide the color palette in the format below. No additional text or explanations.
- Ensure the palette is cohesive, appropriate for the topic, maintains good contrast for readability, and fits the ${theme} theme.

Format:
color1: [hex color code]
color2: [hex color code]
color3: [hex color code]
color4: [hex color code]
`,
        },
      ],
      max_tokens: 100,
      temperature: 0.4,
    });

    if (response && response.choices && response.choices.length > 0) {
      return response.choices[0].message.content;
    } else {
      throw new Error("No response from OpenAI");
    }
  } catch (error) {
    console.error("Error generating color palette:", error);
    throw error;
  }
};

type Slide = {
  tagline?: string;
  title?: string;
  pagrgraph?: string;
  "Call to action"?: string;
};

const isValidSlideKey = (key: string): key is keyof Slide => {
  return ["type", "tagline", "title", "description"].includes(key);
};

const isValidColorKey = (key: string): key is keyof BackgroundColors => {
  return ["color1", "color2", "color3", "color4"].includes(key);
};

export const parseCarouselContentToJSON = (content: string): Slide[] => {
  const slides: Slide[] = [];
  const sections = content
    .split(/\[|\]/)
    .filter((section) => section.trim() !== "");

  sections.forEach((section) => {
    const lines = section.split("\n").filter((line) => line.trim() !== "");
    if (lines.length === 0) return;

    const slide: Slide = {};
    lines.forEach((line) => {
      const [key, ...value] = line.split(":");
      if (key && value.length > 0) {
        const trimmedKey = key.trim();
        if (isValidSlideKey(trimmedKey)) {
          slide[trimmedKey] = value.join(":").trim();
        }
      }
    });

    // Only push the slide if it has at least one key-value pair
    if (Object.keys(slide).length > 0) {
      slides.push(slide);
    }
  });

  return slides;
};

export const parseColorPaletteToJSON = (content: string): BackgroundColors => {
  const colors: BackgroundColors = {
    color1: "",
    color2: "",
    color3: "",
    color4: "",
  };
  const lines = content.split("\n").filter((line) => line.trim() !== "");
  lines.forEach((line) => {
    const [key, ...value] = line.split(":");
    if (key && value.length > 0) {
      const trimmedKey = key.trim();
      if (isValidColorKey(trimmedKey)) {
        colors[trimmedKey] = value.join(":").trim();
      }
    }
  });
  return colors;
};
