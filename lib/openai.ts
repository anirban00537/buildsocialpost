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
    console.log("topic", topic);
    console.log("numSlides", numSlides);
    console.log("maxTokens", maxTokens);
    console.log("temperature", temperature);
    console.log("model", model);
    console.log("language", language);
    console.log("mood", mood);

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: `You are an expert content creator for LinkedIn carousels. Generate engaging and informative carousel slides based on the given topic Answer them in this format example:
          
          [Intro]
          type:intro
          tagline: 
          title: 
          description: 
          
          [Slide 1]
          type:slide
          title: 
          description:
          
          [rest of the slides]
          ...
          
          [Outro]
          type:outro
          tagline: 
          title: 
          description:
          
          All titles and taglines should be a maximum of 60 characters.Each descriptions should be under 300 characters min 150 charecters. The content should be in ${language} and convey a ${mood} mood. Please generate content for ${numSlides} slides on the topic: ${topic}. Please only include the content in the format above. Do not include any additional text. Do not include any additional text.`,
        },
        {
          role: "user",
          content: topic,
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
