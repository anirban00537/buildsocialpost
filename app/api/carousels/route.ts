import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const carousels = await prisma.carousel.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const carouselsWithId = carousels.map(carousel => ({
    id: carousel.id,
    data: carousel
  }));

  return NextResponse.json(carouselsWithId);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const carouselData = await req.json();

  const newCarousel = await prisma.carousel.create({
    data: {
      ...carouselData,
      userId: user.id,
    },
  });

  return NextResponse.json(newCarousel);
}
