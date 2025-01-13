import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
// import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  // セッション情報を管理するにはadapterを使用する
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        // ユーザーに選択肢を表示する
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    // セッション情報を管理する
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },

    // 未対応：　ユーザーがいない場合は新規登録されるようにしているが、本来はサインインとサインアップを分けるべき。
    // 認証に時間をかけられないので、一旦Googleのみを実装数している
    async signIn({account}) {
      if(account?.provider === "google") {
        return true;
      }
      return false;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);