import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// 特定のプランを取得する
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const id = (await params).id;
  const planId = Number(id);
  const session = await getServerSession(authOptions) as { user?: { id: string } } | null;
  const userId = session?.user?.id;

  try {
    const plan = await prisma.plan.findUnique({
      where: { id: planId }
    });

    const contract = await prisma.contract.findFirst({
      where: {
        planId,
        studentId: userId,
      }
    });

    const responseData = {
      plan,
      contract,
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'プランの取得に失敗しました' }, { status: 500 }); 
  }
}

// プランを申し込む
export const POST = async (request: Request) => {
  const applyValue = await request.json();

  // 必要なデータが存在するかチェック
  if (!applyValue.planId || !applyValue.userId || !applyValue.instructorId) {
    return NextResponse.json({ error: '必要なデータが不足しています' }, { status: 400 });
  }

  try{

    const contract = await prisma.contract.findFirst({
      where: {
        planId: applyValue.planId,
        studentId: applyValue.userId,
        instructorId: applyValue.instructorId,
      }
    })

    const chatRoom = await prisma.chatRoom.findFirst({
      where: {
        planId: applyValue.planId,
        studentId: applyValue.userId,
        instructorId: applyValue.instructorId,
      }
    })

    if(contract || chatRoom){
      return NextResponse.json({ error: 'すでに契約済みです' }, { status: 400 });
    }

    await prisma.contract.create({
      data: {
        planId: applyValue.planId,
        studentId: applyValue.userId,
        instructorId: applyValue.instructorId,
      }
    });
    

    return NextResponse.json({ message: 'プランを申し込みました' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'プランの申し込みに失敗しました' }, { status: 500 });
  }
}