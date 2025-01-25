import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  // 各パラメータの値を確認する
  const studentId: string = body.userId;
  const instructorId: string = body.instructorId;
  const planId: number = body.planId;

  if(!studentId || !instructorId || !planId) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // findFirstだと型の確認エラーがでず、findUniqueだと型の確認エラーが出るのはなぜ？
  const chatRoomId = await prisma.chatRoom.findFirst({
    where: {
      studentId: studentId,
      instructorId: instructorId,
      planId: planId,
    },
  });

  if (!chatRoomId) {
    // チャットルームが存在しない場合は新規作成
    const newChatRoom = await prisma.chatRoom.create({
      data: {
        studentId,
        instructorId,
        planId,
      },
    });
    return NextResponse.json(newChatRoom);
  }

  return NextResponse.json(chatRoomId);
};