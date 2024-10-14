import request from "@/lib/request";

export const getCarousels = async () => {
  const response = await request.get("/carousels/get-carousels");
  return response.data;
};

export const createCarousel = async (carouselData: any) => {
  const response = await request.post(
    "/carousels/create-carousel",
    carouselData
  );
  return response.data;
};

export const updateCarousel = async (carouselId: string, carouselData: any) => {
  const response = await request.put(
    `/carousels/update-carousel/${carouselId}`,
    carouselData
  );
  return response.data;
};

export const deleteCarousel = async (carouselId: string) => {
  const response = await request.delete(
    `/carousels/delete-carousel/${carouselId}`
  );
  return response.data;
};

export const getCarouselDetails = async (carouselId: string) => {
  const response = await request.get(`/carousels/get-carousel-details/${carouselId}`);
  return response.data;
};

