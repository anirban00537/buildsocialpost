import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";

export async function GET(req: Request) {
  const auth = await authenticateAndGetUser();
  if ("error" in auth) {
    return new NextResponse(JSON.stringify({ error: auth.error }), {
      status: auth.status,
    });
  }

  try {
    const carousels = await prisma.carousel.findMany({
      where: { userId: auth.user.id },
      orderBy: { createdAt: "desc" },
    });

    const carouselsWithId = carousels.map((carousel) => ({
      id: carousel.id,
      data: carousel,
    }));

    return NextResponse.json(carouselsWithId);
  } catch (error) {
    console.error("Error in GET /api/carousels:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  const auth = await authenticateAndGetUser();
  if ("error" in auth) {
    return new NextResponse(JSON.stringify({ error: auth.error }), {
      status: auth.status,
    });
  }

  try {
    const carouselData = await req.json();

    const newCarousel = await prisma.carousel.create({
      data: {
        ...carouselData,
        userId: auth.user.id,
      },
    });

    return NextResponse.json(newCarousel);
  } catch (error) {
    console.error("Error in POST /api/carousels:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}