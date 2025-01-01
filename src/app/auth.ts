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
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    // }),
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
    async signIn({user, account}) {
      console.log('アカウント', account);
      if(account?.provider === "google") {
      // emailが存在するかどうかを確認
        if (!user.email) {
          return false;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });

        // ユーザーが存在しない場合は新規作成
        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
            }
          });
          await prisma.account.create({
            data: {
              userId: newUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
            },
          });
          await prisma.session.create({
            data: {
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30日
              sessionToken: crypto.randomUUID(),
              userId: newUser.id,
            }
          });
        } else {
          // ユーザーが存在する場合はトークン更新
          await prisma.account.update({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId
              }
            },
            data: {
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            }
          });
        }
        return true;
      }
      return false;
    }
  }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);