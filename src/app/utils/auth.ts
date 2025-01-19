import { auth } from "../auth"

export async function getCurrentUser() {
  const session = await auth()
  
  if (!session?.user) {
    return null
  }
  
  return session.user
}

export async function getCurrentUserId() {
  const session = await auth()
  return session?.user?.id
}

export async function getSession() {
  const session = await auth()
  return session
}