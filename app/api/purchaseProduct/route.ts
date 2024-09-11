export const dynamic = "force-dynamic";
import { lemonSqueezyApiInstance } from "@/utils/axios";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/services/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/authOption";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const userId = session.user.id;

    const reqData: { productId: string; redirectUrl: string } = await req.json();
    if (!reqData.productId) {
      return new Response(JSON.stringify({ error: "productId is required" }), {
        status: 400,
      });
    }

    const response = await lemonSqueezyApiInstance.post("/checkouts", {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            custom: {
              user_id: userId,
            },
          },
          product_options: {
            redirect_url: "https://buildcarousel.com/editor",
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID?.toString(),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: reqData.productId.toString(),
            },
          },
        },
      },
    });

    const checkoutUrl = response.data.data.attributes.url;

    // Store the subscription data in MongoDB
    const client = await clientPromise;
    const db = client.db();

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // Example: setting the subscription duration to 1 month

    const subscriptionData = {
      userId: new ObjectId(userId),
      productId: reqData.productId,
      checkoutUrl,
      status: "pending",
      endDate: endDate,
      createdAt: new Date(),
    };

    await db.collection("subscriptions").insertOne(subscriptionData);

    return new Response(JSON.stringify({ checkoutUrl }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
}
