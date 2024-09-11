import { NextResponse } from "next/server";
import clientPromise from "@/services/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (userId !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const subscription = await db
      .collection("subscriptions")
      .findOne({ userId }, { sort: { endDate: -1 } });

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
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  const subscriptionData = await req.json();

  if (subscriptionData.userId !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await db.collection("subscriptions").insertOne({
      ...subscriptionData,
      userId: new ObjectId(subscriptionData.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: {
        ...subscriptionData,
        _id: result.insertedId,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
