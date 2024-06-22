import crypto from "crypto";
import { databases, ID } from "@/lib/appwrite";

export async function POST(req: Request) {
  try {
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();
    console.log(
      process.env.NEXT_PUBLIC_LEMONSQUEEZY_WEBHOOK_SIGNATURE,
      "process.env.NEXT_PUBLIC_LEMONSQUEEZY_WEBHOOK_SIGNATURE"
    );
    const secret = process.env.NEXT_PUBLIC_LEMONSQUEEZY_WEBHOOK_SIGNATURE || "";
    const hmac = crypto.createHmac("sha256", secret);
    const requestBodyText = await clonedReq.text();
    const digest = hmac.update(requestBodyText).digest("hex");
    const signature = req.headers.get("X-Signature");

    if (
      !signature ||
      !crypto.timingSafeEqual(
        Buffer.from(digest, "hex"),
        Buffer.from(signature, "hex")
      )
    ) {
      throw new Error("Invalid signature.");
    }

    if (eventType === "order_created") {
      const userId = body.meta.custom_data.user_id;
      const isSuccessful = body.data.attributes.status === "paid";
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      const subscriptionData = {
        userId: userId.toString(),
        orderId: body.data.id.toString(),
        status: isSuccessful ? "paid" : "pending",
        endDate: endDate.toISOString(),
        createdAt: new Date().toISOString(),
      };

      // await databases.createDocument(
      //   "6676798b000501b76612",
      //   "6676799900328c7c1974",
      //   ID.unique(),
      //   subscriptionData
      // );

      console.log("Subscription created:", subscriptionData);
    }

    return new Response(JSON.stringify({ message: "Webhook received" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
