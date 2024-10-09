import { getServerSession, Session } from "next-auth";
import { prisma } from "./db";
import { authOptions } from "./auth";

export async function authenticateAndGetUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    return { user, session };
  } catch (error) {
    console.error("Error in authenticateAndGetUser:", error);
    return { error: "Internal Server Error", status: 500 };
  }
}
