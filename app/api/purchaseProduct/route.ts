export const dynamic = "force-dynamic";
import { lemonSqueezyApiInstance } from "@/utils/axios";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const auth = await authenticateAndGetUser();
    if ("error" in auth) {
      return new NextResponse(JSON.stringify({ error: auth.error }), {
        status: auth.status,
      });
    }

    if (!auth.user.email) {
      return new NextResponse(JSON.stringify({ error: "User email not found" }), {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: auth.user.email },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

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
    const reqData: { productId: string; redirectUrl: string } =
      await req.json();
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
              user_id: user.id,
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

    return new Response(JSON.stringify({ checkoutUrl }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}
