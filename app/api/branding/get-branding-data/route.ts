import { authenticateAndGetUser } from "@/lib/authCheck";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const auth = await authenticateAndGetUser();
  if ("error" in auth) {
    return new NextResponse(JSON.stringify({ error: auth.error }), {
      status: auth.status,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: auth.user?.email || "" },
    include: { UserBranding: true },
  });

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const userBranding = user.UserBranding
    ? {
        ...user.UserBranding,
        headshot: user.UserBranding.headshot
          ? user.UserBranding.headshot // Just return the filename
          : null,
      }
    : { name: "", handle: "", headshot: null };

  return NextResponse.json(userBranding);
}