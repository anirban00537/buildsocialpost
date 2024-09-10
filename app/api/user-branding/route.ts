import { NextResponse } from "next/server";
import dbConnect from "@/services/mongodb";
import UserBranding from "@/models/UserBranding";

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const userBranding = await UserBranding.findOne({ userId });
    if (!userBranding) {
      return NextResponse.json({
        success: true,
        data: { name: "", handle: "", headshot: null },
      });
    }
    return NextResponse.json({ success: true, data: userBranding.branding });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch branding settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();
  const { userId, brandingData } = await req.json();

  try {
    const userBranding = await UserBranding.findOneAndUpdate(
      { userId },
      { branding: brandingData },
      { new: true, upsert: true }
    );
    return NextResponse.json({ success: true, data: userBranding.branding });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update branding settings" },
      { status: 500 }
    );
  }
}
