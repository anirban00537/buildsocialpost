import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

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

  return NextResponse.json(
    user.UserBranding || { name: "", handle: "", headshot: null }
  );
}

export async function POST(req: Request) {
  try {
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

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const handle = formData.get("handle") as string;
    const headshot = formData.get("headshot") as File | null;

    let headshotUrl = null;
    if (headshot && headshot instanceof File) {
      const bytes = await headshot.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate a unique filename
      const filename = `${uuidv4()}-${headshot.name}`;
      const uploadsDir = join(process.cwd(), "public", "uploads");
      const filePath = join(uploadsDir, filename);

      // Ensure the uploads directory exists
      await mkdir(uploadsDir, { recursive: true });

      // Save the file - convert Buffer to Uint8Array
      await writeFile(filePath, new Uint8Array(buffer));
      headshotUrl = `/uploads/${filename}`;
    } else if (typeof headshot === "string") {
      headshotUrl = headshot;
    }

    const updatedBranding = await prisma.userBranding.upsert({
      where: { userId: user.id },
      update: { name, handle, headshot: headshotUrl },
      create: { name, handle, headshot: headshotUrl, userId: user.id },
    });

    return NextResponse.json(updatedBranding);
  } catch (error) {
    console.error("Error in POST /api/branding:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
      }
    );
  }
}
