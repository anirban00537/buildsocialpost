import { NextRequest, NextResponse } from "next/server";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(req: NextRequest) {
  try {
    const { id }: { id: string } = await req.json();
    const docRef = doc(db, "carousels", id);
    await deleteDoc(docRef);
    return NextResponse.json(
      { message: "Carousel deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting carousel:", error);
    return NextResponse.json(
      { error: "Failed to delete carousel" },
      { status: 500 }
    );
  }
}
