import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";

export async function DELETE({ params }: { params: { id: string } }) {
  const auth = await authenticateAndGetUser();
  if ("error" in auth) {
    return new NextResponse(JSON.stringify({ error: auth.error }), {
      status: auth.status,
    });
  }
  await prisma.carousel.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 204 });
}
