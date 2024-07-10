import {
  generateCaruselContentFromTopic,
  parseCarouselContentToJSON,
} from "@/lib/openai";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

    const start = Date.now();

    const content: any = await generateCaruselContentFromTopic(
      topic,
      numSlides,
      temperature,
      language,
      mood
    );

    console.log(content, "content");

    const response = parseCarouselContentToJSON(content);

    const elapsed = Date.now() - start;
    const remainingTime = 15000 - elapsed;

    if (remainingTime > 0) {
      await delay(remainingTime);
    }

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
