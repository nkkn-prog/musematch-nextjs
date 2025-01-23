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

    // 各メッセージの送信者と受信者のプロフィール情報を取得
    const messagesWithProfiles = await Promise.all(
      chatMessages.map(async (message) => {
        const [senderProfile, receiverProfile] = await Promise.all([
          prisma.profile.findUnique({
            where: { userId: message.senderId },
            select: { 
              name: true,
              imageUrl: true,
              userId: true  // 送信者のID
            }
          }),
          prisma.profile.findUnique({
            where: { userId: message.receiverId },
            select: { 
              name: true,
              imageUrl: true,
              userId: true  // 受信者のID
            }
          })
        ]);

        return {
          ...message,
          sender: {
            ...senderProfile,
            id: message.senderId  // 送信者のIDを明示的に含める
          },
          receiver: {
            ...receiverProfile,
            id: message.receiverId  // 受信者のIDを明示的に含める
          }
        };
      })
    );

    return NextResponse.json({ 
      success: true,
      data: messagesWithProfiles 
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