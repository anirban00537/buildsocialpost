export const maxDuration = 20; 

import {
  generateCaruselContentFromTopic,
  parseCarouselContentToJSON,
} from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { topic, numSlides, temperature, language, mood } = await req.json();

    if (!topic || !numSlides) {
      return new Response(
        JSON.stringify({ message: "Missing required parameters" }),
        {
          status: 400,
        }
      );
    }

    const content: any = await generateCaruselContentFromTopic(
      topic,
      numSlides,
      temperature,
      language,
      // model,
      mood
    );
    // Generate carousel content
    console.log(content, "content");

    const response = parseCarouselContentToJSON(content);

    return new Response(
      JSON.stringify({ message: "Carousel content generated", response }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
