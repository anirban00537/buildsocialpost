import { lemonSqueezyApiInstance } from "@/utils/axios";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const reqData: { productId: string } = await req.json();
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
              user_id: "123",
            },
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

    // Store the purchase data in Firestore
    const purchaseData = {
      userId: "123",
      productId: reqData.productId,
      checkoutUrl,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    await addDoc(collection(db, "purchases"), purchaseData);

    return new Response(JSON.stringify({ checkoutUrl }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
}
