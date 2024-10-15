import request from "@/lib/request";

export const getCarousels = async (page: number, pageSize: number) => {
  const response = await request.get("/my-carousels/get", {
    params: { page, pageSize },
  });
  return response.data;
};

export const createCarousel = async (carouselData: any) => {
  const response = await request.post("/my-carousels/create", carouselData);
  return response.data;
};

export const updateCarousel = async (carouselData: any) => {
  const response = await request.put("/my-carousels/update", carouselData);
  return response.data;
};

export const deleteCarousel = async (id: string) => {
  const response = await request.delete("/my-carousels/delete", { data: id });
  return response.data;
};

export const getCarouselDetails = async (id: string) => {
  const response = await request.get("/my-carousels/get-details", {
    params: { id },
  });
  return response.data;
};

export const generateCarouselContent = async (dto: any) => {
  const response = await request.get(
    "/my-carousels/generate-carousel-content",
    {
      data: dto,
    }
  );
  return response.data;
};
