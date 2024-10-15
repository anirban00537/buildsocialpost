import request from "@/lib/request";
import fRequest from "@/lib/f-request";

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await fRequest.post("/files/upload", formData);
  return response.data;
};

export const getImages = async ({ page, pageSize }: PaginationParams = {}) => {
  const response = await request.get("/files", {
    params: { page, pageSize },
  });
  return response.data;
};

export const getImage = async (id: string) => {
  const response = await request.get(`/files/${id}`);
  return response.data;
};

export const deleteImage = async (id: string) => {
  const response = await request.delete(`/files/${id}`);
  return response.data;
};

export const getImageUsage = async () => {
  const response = await request.get("/files/usages");
  return response.data;
};
