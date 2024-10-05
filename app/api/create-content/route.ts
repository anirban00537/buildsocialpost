export const maxDuration = 20;

import {
  generateCarouselColorPaletteFromPromptTopic,
  generateCaruselContentFromTopic,
  parseCarouselContentToJSON,
  parseColorPaletteToJSON,
} from "@/lib/openai";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { NextResponse } from "next/server";
if (!process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY) {
  throw new Error(
    "The NEXT_PUBLIC_FIREBASE_PRIVATE_KEY environment variable is not defined"
  );
}
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(
        /\\n/g,
        "\n"
      ),
    }),
  });
}
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
