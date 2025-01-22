import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    const chatMessages = await prisma.chatMessage.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      distinct: ['chatRoomId']
    });

    // recieverIdとInstructorIdからユーザーのprofileのthumbnailUrlを取得して、chatMessageに含ませたい。

    return NextResponse.json({ 
      success: true,
      data: chatMessages 
    });

  } catch (error) {
    console.error('Chat list fetch error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'チャットリストの取得に失敗しました',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 