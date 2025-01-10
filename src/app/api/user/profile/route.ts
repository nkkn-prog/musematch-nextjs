import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
    return NextResponse.json({ message: 'Hello, World!' });
}

export const POST = async (request: Request) => {
    try {
        const data = await request.json();
        console.log('Received data:', data);

        if(!data.userId) {
            return NextResponse.json({ message: 'ユーザーIDが必要です。' }, { status: 400 });
        }

        const isProfileExists = await prisma.profile.findFirst({
            where: { userId: data.userId }
        });

        if(isProfileExists) {
            return NextResponse.json({ message: 'プロフィールは既に存在します。' }, { status: 400 });
        }

        const profile = await prisma.profile.create({
            data: {
                userId: data.userId,
                name: data.name || '',
                bio: data.bio || null,
                imageUrl: data.imageUrl || null,
                instruments: data.instruments || [],
            },
        });

        return NextResponse.json({
            success: true,
            message: 'プロフィールの作成に成功しました。',
            data: profile
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'プロフィールの作成に失敗しました。',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}