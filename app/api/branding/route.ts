import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";
import { writeFile, mkdir, readFile, unlink } from "fs/promises";
import { join, extname } from "path";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

const getUploadsDir = () => join(process.cwd(), "uploads");

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
      include: { UserBranding: true },
    });
    if (!user) {
      return new NextResponse(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const handle = formData.get("handle") as string;
    const file = formData.get("headshot") as File | null;

    let headshotFilename = null;

    if (file) {
      // Delete existing headshot if it exists
      if (user.UserBranding?.headshot) {
        const existingFilePath = join(getUploadsDir(), user.UserBranding.headshot);
        try {
          await unlink(existingFilePath);
        } catch (error) {
          console.error("Error deleting existing headshot:", error);
          // Continue with the upload even if deletion fails
        }
      }

      const bytes = await file.arrayBuffer();
      const buffer = new Uint8Array(bytes);

      const uploadsDir = getUploadsDir();

      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (error) {
        // Ignore the error if the directory already exists
        if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
          throw error;
        }
      }

      // Extract file extension
      const fileExtension = extname(file.name);

      // Generate a unique filename using UUID and include the file extension
      headshotFilename = `${uuidv4()}${fileExtension}`;
      const filePath = join(uploadsDir, headshotFilename);

      await writeFile(filePath, buffer);
    }

    const updatedBranding = await prisma.userBranding.upsert({
      where: { userId: user.id },
      update: {
        name,
        handle,
        ...(headshotFilename ? { headshot: headshotFilename } : {}),
      },
      create: {
        name,
        handle,
        ...(headshotFilename ? { headshot: headshotFilename } : {}),
        user: { connect: { id: user.id } },
      },
    });

    return NextResponse.json(updatedBranding);
  } catch (error) {
    console.error("Error in POST /api/branding:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
