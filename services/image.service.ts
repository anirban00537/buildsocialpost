import request from "@/lib/request";

export const uploadImage = async (imageData: any) => {
  const response = await request.post("/images/upload-image", imageData);
  return response.data;
};

export const deleteImage = async (imageId: string) => {
  const response = await request.delete(`/images/delete-image/${imageId}`);
  return response.data;
};

export const getImages = async () => {
  const response = await request.get("/images/get-images");
  return response.data;
};

export const getImageUsage = async () => {
  const response = await request.get("/images/get-image-usage");
  return response.data;
};
