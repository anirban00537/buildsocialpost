import request from "@/lib/request";

export const getBrandingData = async () => {
  const response = await request.get("/branding/get-branding-data");
  return response.data;
};

export const createOrUpdateBranding = async (brandingData: any) => {
  const response = await request.post("/branding/create-update-branding", brandingData);
  return response.data;
};
