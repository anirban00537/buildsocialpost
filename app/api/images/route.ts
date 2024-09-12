import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/services/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/authOption";
import { adminStorage } from "@/services/firebase-admin";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const client = await clientPromise;
    const db = client.db();
    const images = await db.collection("images").find({ userId }).toArray();

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { file, ...imageData } = await req.json();
  imageData.userId = session.user.id;

  try {
    const client = await clientPromise;
    const db = client.db();

    // Upload file to Firebase Storage
    const bucket = adminStorage.bucket();
    const fileName = `images/${session.user.id}/${Date.now()}_${imageData.name}`;
    const fileBuffer = Buffer.from(file, 'base64');
    const fileUpload = bucket.file(fileName);
    await fileUpload.save(fileBuffer, {
      metadata: { contentType: imageData.type }
    });

    // Get the public URL
    const [url] = await fileUpload.getSignedUrl({
      action: 'read',
      expires: '03-01-2500'
    });

    const result = await db.collection("images").insertOne({
      ...imageData,
      url,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: result.insertedId, ...imageData, url });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}
