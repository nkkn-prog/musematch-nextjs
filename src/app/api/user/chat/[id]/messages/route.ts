import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const chatRoomId = await Number(params.id);

    const messages = await prisma.chatMessage.findMany({
      where: { 
        chatRoomId: chatRoomId 
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return NextResponse.json({ 
      success: true,
      data: messages 
    });

  } catch (error) {
    console.error('Messages fetch error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'メッセージの取得に失敗しました',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  console.log(body);

  const chatRoomId = Number(body.chatRoomId);
  const senderId = body.senderId;
  const receiverId = body.receiverId;
  const message = body.message;
  
  if(!chatRoomId || !senderId || !receiverId || !message) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    // メッセージを保存
    await prisma.chatMessage.create({
      data: {
        chatRoomId: chatRoomId,
        senderId: senderId,
        receiverId: receiverId,
        message: message
      }
    });

    return NextResponse.json({ 
      success: true,
      data: message 
    });

  } catch (error) {
    console.error('Message creation error:', error);
    return NextResponse.json({ 
      success: false,
      message: 'メッセージの送信に失敗しました',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}