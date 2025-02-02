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
    return NextResponse.next()
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
export default async function middleware(req: NextRequest) {
  // publicなルートはスキップ
  if (req.nextUrl.pathname.startsWith('/_next') || 
      req.nextUrl.pathname.startsWith('/api') ||
      req.nextUrl.pathname.startsWith('/signin') ||
      req.nextUrl.pathname.startsWith('/signup')) {
    return NextResponse.next()
  }

  // プロフィール作成ページのチェック
  if (req.nextUrl.pathname === '/user/profile/create') {
    const token = await getToken({ req })
    if (token) {
      const res = await fetch(`${req.nextUrl.origin}/api/user/profile/${token.sub}`)
      const profile = await res.json()
      if (profile) {
        return NextResponse.redirect(new URL('/plan', req.url))
      }
    }
  }

  // ルートパスの場合
  if (req.nextUrl.pathname === "/") {
    return rootMiddleware(req)
  }

  // その他の保護されたルート
  return (authMiddleware as unknown as (req: NextRequest) => Promise<Response>)(req)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}