import request from "@/lib/request";

export const checkSubscription = async () => {
  const response = await request.get("/subscription/check-subscription");
  return response.data;
};
