// app/api/carousels/create/route.ts
import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import { CarouselState } from "@/types";
import { db } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const data: CarouselState = await req.json();
    const docRef = await addDoc(collection(db, "carousels"), data);
    return NextResponse.json({ id: docRef.id }, { status: 201 });
  } catch (error) {
    console.error("Error creating carousel:", error);
    return NextResponse.json(
      { error: "Failed to create carousel" },
      { status: 500 }
    );
  }
}
