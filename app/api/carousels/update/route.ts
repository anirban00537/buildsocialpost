// app/api/carousels/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CarouselState } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const { id, data }: { id: string; data: CarouselState } = await req.json();

    // Destructure CarouselState to ensure it matches the expected format for Firestore
    const updateData = {
      ...data,
      generalSettings: {
        ...data.generalSettings,
      },
      background: {
        ...data.background,
      },
      textSettings: {
        ...data.textSettings,
      },
      layout: {
        ...data.layout,
      },
    };

    const docRef = doc(db, "carousels", id);
    await updateDoc(docRef, updateData);
    return NextResponse.json(
      { message: "Carousel updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating carousel:", error);
    return NextResponse.json(
      { error: "Failed to update carousel" },
      { status: 500 }
    );
  }
}
