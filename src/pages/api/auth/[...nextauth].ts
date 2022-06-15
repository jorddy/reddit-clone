import NextAuth from "next-auth";
import RedditProvider from "next-auth/providers/reddit";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/backend/data/client";
import { User } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & { id: string };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_ID,
      clientSecret: process.env.REDDIT_SECRET
    })
    // ...add more providers here
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    }
  },
  adapter: PrismaAdapter(prisma)
});
