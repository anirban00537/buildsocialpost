import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await authenticateAndGetUser();
  if ("error" in auth) {
    return new NextResponse(JSON.stringify({ error: auth.error }), {
      status: auth.status,
    });
  }

  const carouselData = await req.json();

  const updatedCarousel = await prisma.carousel.update({
    where: { id: params.id },
    data: carouselData,
  });

  return NextResponse.json(updatedCarousel);
}
