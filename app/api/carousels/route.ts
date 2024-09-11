import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/services/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/authOption";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const client = await clientPromise;
  const db = client.db();

  if (id) {
    const carousel = await db.collection("carousels").findOne({ _id: new ObjectId(id) });
    if (!carousel) {
      return NextResponse.json({ error: "Carousel not found" }, { status: 404 });
    }
    return NextResponse.json(carousel);
  } else {
    const carousels = await db.collection("carousels").find({ userId: session.user.id }).toArray();
    return NextResponse.json(carousels);
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const carouselData = await req.json();
  carouselData.userId = session.user.id;

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("carousels").insertOne(carouselData);
  return NextResponse.json({ id: result.insertedId, ...carouselData });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, ...carouselData } = await req.json();
  
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("carousels").updateOne(
    { _id: new ObjectId(id), userId: session.user.id },
    { $set: carouselData }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Carousel not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ id, ...carouselData });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing carousel id" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("carousels").deleteOne({ _id: new ObjectId(id), userId: session.user.id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Carousel not found or unauthorized" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
