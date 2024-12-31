import { auth } from "@/app/auth"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/auth/error?error=NO_USER')
  }

  // ここでユーザー登録処理を実行
  // ...

  redirect('/dashboard')
} 