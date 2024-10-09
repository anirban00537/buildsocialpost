import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
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

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const carouselData = await req.json();

  const updatedCarousel = await prisma.carousel.update({
    where: { id: params.id },
    data: carouselData,
  });

  return NextResponse.json(updatedCarousel);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await prisma.carousel.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
}
