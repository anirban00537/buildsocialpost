import request from "@/lib/request";
import { CreateDraftPostType, GetPostsType } from "@/types/post";

export const createDraft = async (data: CreateDraftPostType) => {
  const response = await request.post(
    "/content-posting/create-or-update-draft",
    data
  );
  return response.data;
};
export const getPosts = async (data: GetPostsType) => {
  const response = await request.get(
    `/content-posting/get-posts?workspace_id=${data.workspace_id}&status=${data.status}&page=${data.page}&pageSize=${data.pageSize}`
  );
  return response.data;
};
export const getDraftPostDetails = async (id: number) => {
  const response = await request.get(
    `/content-posting/get-draft-post-details/${id}`
  );
  return response.data;
};
