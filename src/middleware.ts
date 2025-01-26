import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"

// ルートパス用のミドルウェア
async function rootMiddleware(req: NextRequest) {
  const token = await getToken({ req })
  
  // ログインユーザーのみリダイレクト
  if (token) {
    return NextResponse.redirect(new URL("/plan", req.url))
  }
  return NextResponse.next()
}

// 保護されたルート用のミドルウェア
const authMiddleware = withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/signin',
    }
  }
);

// パスに応じて適切なミドルウェアを選択
export default function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    return rootMiddleware(req)
  }
  return (authMiddleware as unknown as (req: NextRequest) => Promise<Response>)(req)
}

export const config = {
  matcher: [
    "/",
    "/user/:path*",
    "/plan/:path*",
  ],
}