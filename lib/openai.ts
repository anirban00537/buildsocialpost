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
