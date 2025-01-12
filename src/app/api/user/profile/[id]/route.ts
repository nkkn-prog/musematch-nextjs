import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const GET = async (
    request: Request,
    { params }: { params: { id: string } }
) => {
    const { id } = await params;
    const userId = id;
    let profile;
    try{
        profile = await prisma.profile.findUnique({
            where: {
                userId: userId
            }
        });
        if(!profile){
            return redirect('/user/profile/create')
        }
    } catch (error) {
        return NextResponse.json({ error: 'エラーが発生しました' }, { status: 500 });
    }
    return NextResponse.json({data: profile}, { status: 200 });
}

export const PUT = async (request: Request, { params }: { params: { id: string } }) => {

    const { id } = await params;
    const userId = id;
    const data = await request.json();

    try {
        await prisma.profile.update({
            where: { userId: userId },
            data: {
                name: data.name,
                bio: data.bio,
                instruments: data.instruments,
                imageUrl: data.imageUrl,
            }
        });
        return NextResponse.json({ message: 'プロフィールを更新しました' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'エラーが発生しました' }, { status: 500 });
    }
}
