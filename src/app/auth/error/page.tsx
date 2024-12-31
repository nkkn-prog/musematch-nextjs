'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInErrorHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      const errorMessage = getErrorMessage(error);
      router.push(`/signin?message=${encodeURIComponent(errorMessage)}`);
    }
  }, [error, router]);

  return null;
}

function getErrorMessage(error: string): string {
  if (error === 'NOT_REGISTERED') {
    return 'このアカウントは登録されていません。先にアカウント登録をしてください。';
  } else if (error === 'DATABASE_ERROR') {
    return 'データベースエラーが発生しました。';
  } else {
    return '';
  }
}