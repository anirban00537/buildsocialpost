// app/api/carousels/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function GET(req: any) {
  const { id } = req.query;
  try {
    const docRef = doc(db, "carousels", id as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data(), { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Carousel not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error getting carousel details:", error);
    return NextResponse.json(
      { error: "Failed to get carousel details" },
      { status: 500 }
    );
  }
}
