import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await authenticateAndGetUser();
  if ("error" in auth) {
    return new NextResponse(JSON.stringify({ error: auth.error }), {
      status: auth.status,
    });
  }

  const carousel = await prisma.carousel.findUnique({
    where: { id: params.id },
  });

  if (!carousel) {
    return new NextResponse(JSON.stringify({ error: "Carousel not found" }), {
      status: 404,
    });
  }

  return NextResponse.json(carousel);
}
