import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // ユーザーデータの処理
      if (account?.provider === "google") {
        user.name = profile?.name
        user.email = profile?.email
        // 必要に応じて他のプロファイル情報も追加
      }
      return true
    },
    async session({ session, user }) {
      // セッションにユーザー情報を追加
      session.user.id = user.id
      return session
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);