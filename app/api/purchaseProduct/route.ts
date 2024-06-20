export const dynamic = "force-dynamic";
import { lemonSqueezyApiInstance } from "@/utils/axios";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert, getApps } from "firebase-admin/app";

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCYkzXoDwAC+BXC\nNIuTQ2eh6M1IFDi1kWK1T2Fd9kSZYtRf0eUXKn7zcOX2JklKPlD7E+6bIgLf/aMJ\nEv7degzVsll+vHPDG9A/VTz+yGYLt+yWPO85sYbixB+EkrZPW7i+rmtLuriQGXoB\nX3ErCdzmWyv87WvLCmK/B11Ebgb3aMiKgePaQOOIJAlIYbFkT34QAdvix1xlQD/z\nPAJwtrKBOTWHbWl2oWmKI+NnuqptGZovCExX7W+GYssoR0gYMnT0mL+ntxB0Dgiz\nZP3ZTW75gQ18RGJMHxWmMd3HdaNvzqC26hhVQ3heiSJpd8mPuN52YAWIms/mW8wp\n9zyDB2ytAgMBAAECggEAA5zsIvOPUJgEgeMMfBSq9KdRNyKoHh/pemQnvi8e/D0z\nd2ppFkruvdU0/jF1Z6vr7yokwBPb2ryERWp8/Qx5wdS1mv3w8CmYMpZnjvFQE052\nwdmttjbJPCpLRHB/Sd1Llb5byEENbkzKz2itwshlbKdeNmDT6OIKfmi4/BjD6Ey6\nR4/iE71n7wyCYcdfqTLKaQRajNiJk09bAP6+HXw1IWv946fuKhq63XJJt3AN4/te\nSJhw2VWjn6/mJ8IIosnwtX32A1rV4rwDDa7OIY2BTA0NMAGJvdVL9TSxo//+DPT3\nuJalt24pzSTJECTDZ6xEtfWav7S/gZKTV8qG3KwsEQKBgQDU05b5gqrQQwUhh5DD\nRG7WSo8jJDaDjwtS+uuOM1XjH4Zi5SGS6gyLV5Bnlx0Yp5+ljQ0pjBXKUS4KAK/k\nfjZs24E/xFv7EBhjJFfbGhYD2dTbs3NUcT+qaPRASFzHbN3Fmq39/oFKnizTufs9\nF9t0DK+WSQnfB41XnWe7f42TMQKBgQC3hqsU2nSE4Mf06n6SSVE8C23RHIWklY4M\nDD9HwoqtKL2XBM42Itx98YCxYAPUfZvIdSh3lIPQCvyq4xNNou9C9Sv7HTZJMHRs\nhSnXbRYmOyY1tNjZSEY8S3F28mvru2a+V+4HG8rXjUO1V4Yw0UVKCyvwgoaOCRc+\nLSd8owZ6PQKBgHtX/aGxhwmYLfsWtGFW4d2z7GzzadypJGj9H1OUkOxGsv3Rybl5\nh7eiEgDXZXeKfk3WB5DSrTZKAiKt70K/mw9P0AKC7MP+ugOLZpeG8MdekayavfZs\ng/dhSF2REqRJheYmFTylKY1zSouSt/baQsdpKsIwplXp7JKgmSPjcsuhAoGANDTv\n5++446/Z0db/CHgozq7ln23AqrAMh2rYeX5i2p1TSWmJi6bhGEah+FM647CTpzOE\nvneWA5GMjMQp0pT+AQsjZrzJm4pYJCLBY1HZ0ihTV0XJxg2kRTSk41RU1OsrcAwt\nXwJN8oFx+F0chDiTwFtrNXC7/B2j6gEIUZFCn3UCgYAPjralbXuLx0u87gn0VTUu\nLs3Qazu2Ui+5+3DdhU/D70QndBZMYpyeM83VFjHgpqL/NS/AEfUJ0Va5KNWNVKV6\nCPODvuWyMbYrng6r3Ki1IQI6IDC7MvAfDzvNxbH8AyCBtVzw64D50rIM29ZN/R0a\nETFbeWzIdshtjVhnuHgcew==\n-----END PRIVATE KEY-----\n`,
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
