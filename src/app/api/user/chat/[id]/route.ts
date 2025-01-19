import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const chatRoomId = Number(params.id);

    const chatRoom = await prisma.chatRoom.findUnique({
      where: { id: chatRoomId },
    });

    if (!chatRoom) {
      return NextResponse.json({ 
        success: false, 
        message: 'チャットルームが見つかりません' 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      data: chatRoom 
    });

  } catch (error) {
    console.error('Chat room fetch error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'チャットルームの取得に失敗しました',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 