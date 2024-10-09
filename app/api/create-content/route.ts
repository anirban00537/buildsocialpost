export const maxDuration = 20;
import {
  generateCarouselColorPaletteFromPromptTopic,
  generateCaruselContentFromTopic,
  parseCarouselContentToJSON,
  parseColorPaletteToJSON,
} from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      topic,
      numSlides,
      language,
      mood,
      theme,
      contentStyle,
      targetAudience,
      themeActive,
    } = await req.json();

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
      language,
      mood,
      contentStyle,
      targetAudience
    );

    let colorPaletteResponse = null;

    if (themeActive) {
      colorPaletteResponse = await generateCarouselColorPaletteFromPromptTopic(
        topic,
        theme
      );
    }

    const response = parseCarouselContentToJSON(content ?? "");
    const colorPalette =
      colorPaletteResponse !== null
        ? parseColorPaletteToJSON(colorPaletteResponse ?? "")
        : null;

    return NextResponse.json({
      message: "Carousel content generated",
      carousels: response,
      colorPalette: colorPalette ?? null,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
