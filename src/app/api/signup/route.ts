import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { validationRegistSchema } from "../../../validationSchema";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { email, password, name } = data;

  // メールアドレス重複確認とバリデーションを同時に行う
  const [user, validationResult] = await Promise.all([
    prisma.user.findFirst({ where: { email } }),
    validationRegistSchema.safeParseAsync(data)
  ]);

  const errors = validationResult.success ? {} : validationResult.error.flatten().fieldErrors;
  //スプレッド構文で広げてから代入
  if (user) {
    errors.email = [...(errors.email || []), "このメールアドレスは既に使用されています"];
  }

  if (Object.keys(errors).length > 0) {
    return new NextResponse(JSON.stringify({ errors }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    }
  });

  return new NextResponse(JSON.stringify({ message: "Success" }), { status: 201 });
}