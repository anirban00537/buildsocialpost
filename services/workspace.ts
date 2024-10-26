import request from "@/lib/request";

export const getWorkspace = async () => {
  const response = await request.get("/workspace/get-my-workspaces");
  return response.data;
};
