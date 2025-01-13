import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// プランを取得する
export const GET = async () => {
  try{
    const plans = await prisma.plan.findMany();
    return NextResponse.json({
      success: true,
      message: 'プランを取得しました',
      data: plans
    })
  } catch (error) {
    console.error('Plan retrieval error:', error);
    return NextResponse.json({
      success: false,
      message: 'プランの取得に失敗しました',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// プランを作成する
export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        
        if (!data) {
            return NextResponse.json({ 
                success: false, 
                message: 'データが見つかりません' 
            }, { status: 400 });
        }

        const plan = await prisma.plan.create({
            data: {
                userId: data.userId,
                title: data.title,
                description: data.description,
                instruments: data.instruments,
                thumbnailPath: data.thumbnailPath,
                price: data.price,
                time: data.time,
                contract: data.contract,
                consultation: data.consultation,
                cancellation: data.cancellation,
            }
        });

        return NextResponse.json({ 
            success: true, 
            message: 'プランの作成に成功しました',
            data: plan 
        });

    } catch (error) {
        console.error('Plan creation error:', error);
        return NextResponse.json({ 
            success: false, 
            message: 'プランの作成に失敗しました',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}