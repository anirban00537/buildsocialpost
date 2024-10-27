import request from "@/lib/request";

export const getMyWorkspaces = async () => {
  const response = await request.get("/workspace/get-my-workspaces");
  return response.data;
};

export const createWorkspace = async (data: {
  name: string;
  description: string;
}) => {
  const response = await request.post("/workspace/create-workspace", data);
  return response.data;
};
