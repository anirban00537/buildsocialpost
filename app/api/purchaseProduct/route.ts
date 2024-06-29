export const dynamic = "force-dynamic";
import { lemonSqueezyApiInstance } from "@/utils/axios";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { db } from "@/lib/firebase";

// Initialize Firebase Admin SDK
if (!process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY) {
  throw new Error(
    "The NEXT_PUBLIC_FIREBASE_PRIVATE_KEY environment variable is not defined"
  );
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(
        /\\n/g,
        "\n"
      ),
    }),
  });
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header missing" }),
        {
          status: 401,
        }
      );
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await getAuth().verifyIdToken(token);
    const userId = decodedToken.uid;

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
              user_id: userId,
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

    // Store the subscription data in Firestore
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // Example: setting the subscription duration to 1 month

    const subscriptionData = {
      userId,
      productId: reqData.productId,
      checkoutUrl,
      status: "pending",
      endDate: endDate.toISOString(),
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "subscriptions", userId), subscriptionData);

    return new Response(JSON.stringify({ checkoutUrl }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred", { status: 500 });
  }
}
