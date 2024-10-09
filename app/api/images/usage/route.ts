import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";

export async function GET(req: Request) {
 const auth = await authenticateAndGetUser();
 if ("error" in auth) {
   return new NextResponse(JSON.stringify({ error: auth.error }), {
     status: auth.status,
   });
 }

  const user = await prisma.user.findUnique({
    where: { email: auth.user?.email || "" },
  });
  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const totalUsage = await prisma.image.aggregate({
    where: { userId: user.id },
    _sum: {
      size: true,
    },
  });

  return NextResponse.json({ totalUsage: totalUsage._sum.size || 0 });
}
