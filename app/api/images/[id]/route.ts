import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { authenticateAndGetUser } from "@/lib/authCheck";
import { unlink } from 'fs/promises';
import path from 'path';
import { getUploadsDir } from "@/lib/functions";

// Helper function to get uploads directory

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await authenticateAndGetUser();
    if ("error" in auth) {
      return new NextResponse(JSON.stringify({ error: auth.error }), {
        status: auth.status,
      });
    }

    // Find the image
    const image = await prisma.image.findUnique({
      where: { id: params.id },
    });

    if (!image) {
      return new NextResponse(JSON.stringify({ error: "Image not found" }), {
        status: 404,
      });
    }

    // Check if the image belongs to the authenticated user
    if (image.userId !== auth.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
      });
    }

    // Delete the image file from storage
    const filePath = path.join(getUploadsDir(), image.url);
    try {
      await unlink(filePath);
    } catch (error) {
      console.error('Error deleting image file:', error);
      // Continue with database deletion even if file deletion fails
    }

    // Delete the image from the database
    await prisma.image.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error in DELETE /api/images/[id]:', error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
