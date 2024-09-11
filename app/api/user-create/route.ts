import { NextResponse } from "next/server";
import clientPromise from "@/services/mongodb";
import User from "@/models/User";
import { authOptions } from "@/lib/authOption";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const client = await clientPromise;
  const db = client.db();
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
