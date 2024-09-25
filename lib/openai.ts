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
  mood = "neutral",
  contentStyle = "Professional",
  industry = "",
  targetAudience = "General",
  contentStructure = "Problem-Solution",
  keyPoints = "",
  contentPurpose = "Educate"
) => {
  try {
    const maxTokensPerSlide = 100;
    const maxTokens = Math.min(numSlides * maxTokensPerSlide, 1000);

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
          - Use a consistent tone that matches the specified mood (${mood}) and content style (${contentStyle}).
          - Tailor the content for the ${industry} industry and ${targetAudience} audience.
          - Structure the content following the ${contentStructure} format.
          - Incorporate these key points if provided: ${keyPoints}
          - The main purpose of this content is to ${contentPurpose}.
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
  theme: string,
  industry: string
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "user",
          content: `You are an expert color palette generator. Generate a ${theme} theme color palette for the topic "${topic}" in the ${industry} industry. The color palette should be a list of hex color codes. Give me only 4 colors. This is for an AI carousel generator application. The colors will be used for LinkedIn, Instagram, and TikTok carousels.

Guidelines:
- Identify if the topic or industry has associated brand colors. This could be for companies, products, sports teams, universities, or any other entity with established color schemes.
- For light theme:
  - Use brand colors (if any) for accent (color4) or text (color2). Randomize this choice.
  - Background (color1) should be a light, flat color that complements the brand colors or theme.
- For dark theme:
  - Use brand colors (if any) for background (color1), text (color2), or accent (color4). Randomize this choice.
  - If brand color is used for background, ensure it's a darker shade.
- color3 should be a tint that complements the other colors and fits the ${theme} theme.
- If the brand has multiple colors, distribute them across different color slots.
- Always use flat colors for background (color1) and accent (color4).
- Ensure high contrast between background and text colors for readability.
- The brand color and accent color must be different if brand colors are used.
- Only provide the color palette in the format below. No additional text or explanations.
- Ensure the palette is cohesive, appropriate for the topic and industry, maintains good contrast for readability, and fits the ${theme} theme.

Format:
color1: [hex color code]
color2: [hex color code]
color3: [hex color code]
color4: [hex color code]
`,
        },
      ],
      max_tokens: 100,
      temperature: 0.6,
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
