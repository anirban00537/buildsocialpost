import { NextResponse } from "next/server";
import dbConnect from "@/services/mongodb";
import Subscription from "@/models/Subscription";
import { auth } from "firebase-admin";
import { initializeApp, getApps } from "firebase-admin/app";

if (!getApps().length) {
  initializeApp();
}

async function verifyToken(req: Request) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];
  if (!token) {
    return null;
  }
  try {
    const decodedToken = await auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export async function GET(req: Request) {
  const decodedToken = await verifyToken(req);
  console.log("decodedToken", decodedToken);
  if (!decodedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (userId !== decodedToken.uid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscription = await Subscription.findOne({ userId }).sort({
      endDate: -1,
    });
    if (!subscription) {
      return NextResponse.json({
        success: true,
        isSubscribed: false,
        endDate: null,
      });
    }
    const isExpired = new Date(subscription.endDate) < new Date();
    return NextResponse.json({
      success: true,
      isSubscribed: !isExpired,
      endDate: subscription.endDate,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch subscription status" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const decodedToken = await verifyToken(req);
  if (!decodedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const subscriptionData = await req.json();

  if (subscriptionData.userId !== decodedToken.uid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscription = new Subscription(subscriptionData);
    await subscription.save();
    return NextResponse.json({ success: true, data: subscription });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
