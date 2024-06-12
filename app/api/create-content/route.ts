// /pages/api/create-content.js
import {
  generateCaruselContentFromTopic,
  parseCarouselContentToJSON,
} from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { topic, numSlides, maxTokens, temperature, language, model, mood } =
      await req.json();

    if (!topic || !numSlides) {
      return new Response(
        JSON.stringify({ message: "Missing required parameters" }),
        {
          status: 400,
        }
      );
    }

    // Generate carousel content
    const content: any = await generateCaruselContentFromTopic(
      topic,
      numSlides,
      maxTokens,
      temperature,
      language,
      model,
      mood
    );

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
