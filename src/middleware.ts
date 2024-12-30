import { NextResponse } from 'next/server'
import { auth } from "./app/auth"

export default async function middleware(request: Request) {
  const session = await auth()
  const { pathname } = new URL(request.url)

  // 認証が必要なパスの定義
  const isProtectedRoute = pathname.startsWith('/user')
  // 認証関連ページのパス
  // const isAuthPage = pathname === '/signin' || pathname === '/login'

  // ケース1: 未ログインユーザーが保護されたルートにアクセスした場合
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // ケース2: ログイン済みユーザーが認証ページにアクセスした場合
  // if (isAuthPage && session) {
  //   return NextResponse.redirect(new URL('/user/dashboard', request.url))
  // }

  // その他のケース: アクセスを許可
  return NextResponse.next()
}

export const config = {
  // 監視対象のパスを定義
  matcher: [
    // 認証が必要なルート
    '/user/:path*',
    // 認証ページ
    '/signin',
    '/login',
  ]
}