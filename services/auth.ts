import request from "@/lib/request";

export const googleSignIn = async (idToken: string) => {
  const response = await request.post("/auth/google-login", { idToken });
  return response.data;
};
