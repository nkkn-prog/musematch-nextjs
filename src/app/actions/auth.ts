"use server"
import { signIn } from "../auth"
// import { prisma } from "@/lib/prisma"

export const signInWithGoogleOath = async () => {
  await signIn("google")
} 

export const signUpWithGoogleOath = async () => {
  await signIn("google")
} 

// export const signInWithEmail = async (values: {email: string, password: string}) => {
//   const existingUser = await prisma.user.findUnique({
//     where: { email: values.email! }
//   });
//   if (!existingUser) {
//     return '/auth/error?error=NOT_REGISTERED';
//   }
// } 