import { getServerSession } from "next-auth";
import { handler as authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

interface CustomSession extends Session {
  user?: {
    id: string;
    email?: string;
    name?: string;
  };
}

export async function getSession() {
  return (await getServerSession(authOptions)) as CustomSession;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function getCurrentUserId() {
  const session = await getSession();
  return session?.user?.id;
} 