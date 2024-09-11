import { NextResponse } from "next/server";
import clientPromise from "@/services/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOption";

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
      return NextResponse.json({
        success: true,
        data: existingUser,
        message: "User already exists",
      });
    }

    const newUser = await User.create(userData);
    return NextResponse.json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error checking/storing user data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to check/store user data" },
      { status: 500 }
    );
  }
}
