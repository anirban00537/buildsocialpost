import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Add NextAuth routes to the public paths
const publicPaths = [
  "/api/auth/signin",
  "/api/auth/callback",
  "/api/auth/session",
  "/api/auth/csrf",
  "/api/auth/_log",
  "/api/auth/error",
  "/api/auth/providers",
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(path, "pathsssssssssss");

  // Check if the path is for an API route and not a public path
  if (
    path.startsWith("/api/") &&
    !publicPaths.some((publicPath) => path.startsWith(publicPath))
  ) {
    const session = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: "/api/:path*",
};
