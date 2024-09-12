import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/services/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/authOption";
import { adminStorage } from "@/services/firebase-admin";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;

  try {
    const client = await clientPromise;
    const db = client.db();

    const image = await db.collection("images").findOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    });

    if (!image) {
      return NextResponse.json(
        { error: "Image not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete from Firebase Storage
    try {
      const bucket = adminStorage.bucket();
      const fileName = image.url.split("/").pop();
      await bucket.file(`images/${session.user.id}/${fileName}`).delete();
    } catch (firebaseError) {
      console.error("Firebase deletion error:", firebaseError);
      // Continue with MongoDB deletion even if Firebase deletion fails
    }

    // Delete from MongoDB
    const result = await db.collection("images").deleteOne({
      _id: new ObjectId(id),
      userId: session.user.id,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete image error:", error);
    return NextResponse.json(
      { error: "Failed to delete image", details: error.message },
      { status: 500 }
    );
  }
}
