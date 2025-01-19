import { NextRequest, NextResponse } from 'next/server';

import cloudinary from '@/app/utils/cloudnary';

export async function POST(req: NextRequest) {
try {
  // profileとplanでフォルダを分ける
  const { image, mode } = await req.json();

  const uploadResult = await cloudinary.v2.uploader.upload(image, {
    folder:
    mode === 'profile' ? 'profile_pictures'
    : mode === 'plan' ? 'plan_pictures'
    : 'others',
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  });
  return NextResponse.json({ imagePath: uploadResult.secure_url });

  } catch(error) {
    console.error(error);
    return NextResponse.json({ error: '画像のアップロードに失敗しました。' }, { status: 500 });
}

}