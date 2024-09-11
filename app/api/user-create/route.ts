import { NextResponse } from "next/server";
import dbConnect from "@/services/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();
  const userData = await req.json();

  try {
    if (!userData.uid) {
      throw new Error("User ID is required");
    }
    const existingUser = await User.findOne({ uid: userData.uid });
    if (existingUser) {
      return NextResponse.json({ success: true, data: existingUser });
    }

    const user = await User.findOneAndUpdate(
      { uid: userData.uid },
      {
        uid: userData.uid,
        email: userData.email || "",
        displayName: userData.displayName || "",
        photoURL: userData.photoURL || "",
      },
      { upsert: true, new: true }
    );
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Error storing user data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to store user data" },
      { status: 500 }
    );
  }
}
