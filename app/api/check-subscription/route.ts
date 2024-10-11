import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: userId,
        status: "active",
        endDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!subscription) {
      return NextResponse.json(
        { hasActiveSubscription: false },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        hasActiveSubscription: true,
        subscription: {
          id: subscription.id,
          status: subscription.status,
          productName: subscription.productName,
          variantName: subscription.variantName,
          endDate: subscription.endDate,
          subscriptionLengthInMonths: subscription.subscriptionLengthInMonths,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
