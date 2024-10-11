import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile, mkdir, readFile } from "fs/promises";
const getUploadsDir = () => join(process.cwd(), "uploads");

// New route to serve images
export async function GET(req: Request) {
  const url = new URL(req.url);
  const filename = url.searchParams.get("file");

  if (!filename) {
    return new NextResponse("File not specified", { status: 400 });
  }

  const filePath = join(getUploadsDir(), filename);

  try {
    const fileBuffer = await readFile(filePath);
    const response = new NextResponse(fileBuffer);
    response.headers.set("Content-Type", "image/jpeg"); // Adjust based on your file types
    return response;
  } catch (error) {
    console.error("Error reading file:", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
