import { auth } from "@/app/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 特定のプランを取得する
export const GET = async (request: Request, { params }: { params: { id: string } }) => {
  const id = params.id

  const session = await auth()
  const userId = session?.user?.id

  try{
    if(!id){
      return NextResponse.json({ error: 'IDが存在しません' }, { status: 500 });
    }
  
    const plan = await prisma.plan.findUnique({
      where: { id: Number(id) }
    });

    const contract = await prisma.contract.findFirst({
      where: {
        planId: Number(id),
        studentId: userId,
      }
    })

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

  console.log(applyValue);

  try{

    const contract = await prisma.contract.findFirst({
      where: {
        planId: applyValue.planId,
        studentId: applyValue.userId,
        instructorId: applyValue.instructorId,
      }
    })

    if(contract){
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