import { db } from "@/services/firebase";
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
      const orderCreatedAt = new Date(body.data.attributes.created_at);
      
      
      const firstOrderItem = body.data.attributes.first_order_item;
      const variantName = firstOrderItem.variant_name.toLowerCase();
      
      // Determine subscription length
      let subscriptionLengthInMonths = 1; // Default to monthly
      if (variantName.includes('yearly') || variantName.includes('annual')) {
        subscriptionLengthInMonths = 12;
      } else if (variantName.includes('monthly')) {
        subscriptionLengthInMonths = 1;
      } else {
        // Log a warning if the variant name doesn't clearly indicate the subscription length
        console.warn(`Unrecognized subscription length for variant: ${variantName}`);
      }

      // Set end date based on subscription length
      const endDate = new Date(orderCreatedAt);
      endDate.setMonth(endDate.getMonth() + subscriptionLengthInMonths);

      const subscriptionData = {
        userId,
        orderId: body.data.id,
        status: isSuccessful ? "active" : "pending",
        endDate: endDate.toISOString(),
        createdAt: orderCreatedAt.toISOString(),
        productName: firstOrderItem.product_name,
        variantName: firstOrderItem.variant_name,
        subscriptionLengthInMonths,
        totalAmount: body.data.attributes.total,
        currency: body.data.attributes.currency,
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
