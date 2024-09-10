import { NextResponse } from "next/server";
import dbConnect from "@/services/mongodb";
import Carousel from "@/models/Carousel";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const carousels = await Carousel.find({ userId });
    return NextResponse.json({ success: true, data: carousels });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch carousels" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();
  const carouselData = await req.json();

  try {
    const carousel = new Carousel(carouselData);
    await carousel.save();
    return NextResponse.json({ success: true, data: carousel });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create carousel" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  const { id, ...updateData } = await req.json();

  try {
    const carousel = await Carousel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!carousel) {
      return NextResponse.json(
        { success: false, error: "Carousel not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: carousel });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update carousel" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const carousel = await Carousel.findByIdAndDelete(id);
    if (!carousel) {
      return NextResponse.json(
        { success: false, error: "Carousel not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: carousel });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete carousel" },
      { status: 500 }
    );
  }
}
