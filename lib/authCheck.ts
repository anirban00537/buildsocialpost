import { getServerSession } from "next-auth";
import { prisma } from "./db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getOrCreateUser(email: string) {
  let user = await prisma.user.findUnique({
    where: { email: email },
  });

  // if (!user) {
  //   user = await prisma.user.create({
  //     data: {
  //       email: email,
  //       // You can add more fields here if needed
  //     },
  //   });
  // }

  return user;
}
export async function authenticateAndGetUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    const user = await getOrCreateUser(session.user.email);
    return { user };
  } catch (error) {
    console.error("Error in authenticateAndGetUser:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}
