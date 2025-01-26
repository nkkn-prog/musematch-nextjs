import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 特定のプランを取得
export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  try{
    if(!id){
      return NextResponse.json({ error: 'IDが存在しません' }, { status: 500 });
    }
  
    const plan = await prisma.plan.findUnique({
      where: { id: Number(id) }
    });

    return NextResponse.json(plan);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'プランの取得に失敗しました' }, { status: 500 }); 
  }
}

// プランを更新
export const PUT = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  try{
    const id = (await params).id;
    const data = await request.json();

    if(!id){
      return NextResponse.json({ error: 'IDが存在しません' }, { status: 500 });
    }
    if(!data){
      return NextResponse.json({ error: 'データが存在しません' }, { status: 500 });
    }

    await prisma.plan.update({
      where: {
        id: Number(id)
      },
      data: {
        title: data.title,
        instruments: data.instruments,
        description: data.description,
        thumbnailPath: data.thumbnailPath,
        contract: data.contract,
        price: data.price,
        time: data.time,
        consultation: data.consultation,
        cancellation: data.cancellation,
      }
    });
    return NextResponse.json({ message: 'プランを更新しました' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'プランの更新に失敗しました' }, { status: 500 });
  } 
}
