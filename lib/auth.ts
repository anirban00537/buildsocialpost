import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    email: string;
    name?: string;
    image?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }: { session: any; user: any }) => {
      if (session?.user) {
        session.user.id = user.id;
        session.user.email = user.email;

        // Check if email exists
        if (!user.email) {
          // If email doesn't exist, fetch user info from the database
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { email: true, name: true, image: true },
          });

          if (dbUser) {
            session.user.email = dbUser.email;
            session.user.name = dbUser.name;
            session.user.image = dbUser.image;
          }
        } else {
          session.user.email = user.email;
        }
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      const nextAuthUrl = process.env.NEXTAUTH_URL;
      if (!nextAuthUrl) {
        console.warn("NEXTAUTH_URL is not set");
        return baseUrl;
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${nextAuthUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === nextAuthUrl) return url;
      return nextAuthUrl;
    },
  },
};
