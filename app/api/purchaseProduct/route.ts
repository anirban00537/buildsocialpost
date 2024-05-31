import { lemonSqueezyApiInstance } from "@/utils/axios";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const reqData: { productId: string } = await req.json();
    if (!reqData.productId)
      return Response.json({ error: "productId is required" }, { status: 400 });
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
              id:
                process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID &&
                process.env.NEXT_PUBLIC_LEMONSQUEEZY_STORE_ID.toString(),
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
    console.log(response.data);

    return Response.json({ checkoutUrl });
  } catch (error) {
    console.log(error);
    return new Response("An error occurred", { status: 500 });
  }
}
