import request from "@/lib/request";

export const checkSubscription = async () => {
  const response = await request.get("/subscription/check-subscription");
  return response.data;
};
// create-checkout
export const createCheckout = async ({
  productId,
  redirectUrl,
}: {
  productId: string;
  redirectUrl: string;
}) => {
  const response = await request.post("/subscription/create-checkout", {
    productId,
    redirectUrl,
  });
  return response.data;
};

