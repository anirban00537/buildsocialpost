import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: Request) {
  const auth = await authenticateAndGetUser();
  if ("error" in auth) {
    return new NextResponse(JSON.stringify({ error: auth.error }), {
      status: auth.status,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: auth.user?.email as string },
  });
  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const images = await prisma.image.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(images);
}

export async function POST(req: Request) {
  try {
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

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return new NextResponse(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${uuidv4()}-${file.name}`;
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadsDir, fileName);

    // Ensure the uploads directory exists
    await mkdir(uploadsDir, { recursive: true });

    // Save the file
    await writeFile(filePath, buffer);

    const newImage = await prisma.image.create({
      data: {
        userId: user.id,
        url: `/uploads/${fileName}`,
        name: file.name,
        size: file.size,
      },
    });

    return NextResponse.json(newImage);
  } catch (error) {
    console.error('Error in POST /api/images:', error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
