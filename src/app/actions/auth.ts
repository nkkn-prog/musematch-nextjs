"use server"
import { signIn } from "../auth"
// import { prisma } from "@/lib/prisma"

export const signInWithGoogleOath = async () => {
  await signIn("google")
} 

export const signUpWithGoogleOath = async () => {
  await signIn("google")
}

// export const signInWithCredentials = async () => {
//   await signIn('credential')
// }