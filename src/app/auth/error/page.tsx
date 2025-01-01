import { Box, Text, Button } from '@mantine/core';
import Link from 'next/link';

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams.error;

  return (
    <Box ta="center" mt="xl">
      {error === 'EmailAlreadyInUse' ? (
        <Text>
          このメールアドレスは既に別の方法で登録されています。
          別のメールアドレスを使用するか、登録済みの方法でログインしてください。
        </Text>
      ) : (
        <Text>認証エラーが発生しました。</Text>
      )}
      <Button component={Link} href="/signin" mt="md">
        ログインページに戻る
      </Button>
    </Box>
  );
}