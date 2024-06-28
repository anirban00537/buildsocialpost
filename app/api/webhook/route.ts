import { db } from "@/lib/firebase";
import crypto from "crypto";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    // Verify signature
    const secret = process.env.NEXT_PUBLIC_LEMONSQUEEZY_WEBHOOK_SIGNATURE || "";
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    // Logic based on event type
    if (eventType === "order_created") {
      const userId = body.meta.custom_data.user_id;
      const isSuccessful = body.data.attributes.status === "paid";
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      const subscriptionData = {
        userId,
        orderId: body.data.id,
        status: isSuccessful ? "paid" : "pending",
        endDate: endDate.toISOString(),
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "subscriptions", userId), subscriptionData);
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
