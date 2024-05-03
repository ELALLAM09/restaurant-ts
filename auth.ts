import NextAuth from "next-auth";
import authConfig from "@/auth.Config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/",
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
