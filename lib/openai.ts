import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "sk-proj-9aGLOLe4PLAnVo1wXbtbT3BlbkFJk2SPZLgQPGuZG3eQHipf",
});

export const generateCaruselContentFromTopic = async (
  topic: string,
  numSlides: number,
  maxTokens = 1000,
  temperature = 0.4
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert content creator for LinkedIn carousels. Generate engaging and informative carousel slides based on the given topic and number of slides. Answer them in this format example:
          
          [Intro]
          type:"intro"
          Tagline: 
          Title: 
          Paragraph: 
          
          [Slide 1]
          Title: 
          Paragraph:
          
          [rest of the slides]
          ...
          
          [Outro]
          Tagline: 
          Title: 
          Paragraph:
          Call to action:
          
          All titles and taglines should be a maximum of 100 characters. Paragraphs should be under 200 characters. Please generate content for ${numSlides} slides.`,
        },
        {
          role: "user",
          content: `${topic}`,
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
  Tagline?: string;
  Title?: string;
  Paragraph?: string;
  "Call to action"?: string;
};

const isValidSlideKey = (key: string): key is keyof Slide => {
  return ["Tagline", "Title", "Paragraph", "Call to action"].includes(key);
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
