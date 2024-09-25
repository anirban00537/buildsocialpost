export const maxDuration = 20;

import {
  generateCarouselColorPaletteFromPromptTopic,
  generateCaruselContentFromTopic,
  parseCarouselContentToJSON,
  parseColorPaletteToJSON,
} from "@/lib/openai";

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { topic, numSlides, temperature, language, mood, theme } = await req.json();

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
      mood
    );
    // Generate carousel content
    const colorPaletteResponse =
      await generateCarouselColorPaletteFromPromptTopic(topic, theme);

    const response = parseCarouselContentToJSON(content ?? "");
    const colorPalette = parseColorPaletteToJSON(colorPaletteResponse ?? "");
    console.log(colorPaletteResponse, "colorPaletteResponse");
    console.log(colorPalette, "colorPalette");

    return NextResponse.json({
      message: "Carousel content generated",
      carousels: response,
      colorPalette,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
