import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "sk-proj-9aGLOLe4PLAnVo1wXbtbT3BlbkFJk2SPZLgQPGuZG3eQHipf",
});

export const generateCaruselContentFromTopic = async (
  topic: string,
  numSlides: number,
  maxTokens = 1000,
  temperature = 0.4,
  language = "en",
  model = "gpt-3.5-turbo",
  mood = "neutral"
) => {
  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "user",
          content: `You are an expert LinkedIn carousel content creator. Generate ${numSlides} engaging and informative carousel slides on the topic "${topic}". Use the following format and guidelines:

          [Intro]
          type: intro
          tagline: [max 60 characters]
          title: [max 60 characters]
          description: [150-300 characters]

          [Slide {n}]
          type: slide
          title: [max 60 characters]
          description: [150-300 characters]

          [Outro]
          type: outro
          tagline: [max 60 characters]
          title: [max 60 characters]
          description: [150-300 characters]

          The content should be in ${language} and convey a ${mood} mood. Do not include any additional text or explanations.`,
        },
      ],
      max_tokens: Number(maxTokens),
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

type Slide = {
  tagline?: string;
  title?: string;
  pagrgraph?: string;
  "Call to action"?: string;
};

const isValidSlideKey = (key: string): key is keyof Slide => {
  return ["type", "tagline", "title", "description"].includes(key);
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
