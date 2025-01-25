"use client";
import React, { useState } from "react";
import { useSession, signIn} from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationRegistSchema } from "../../validationSchema";
import { Button, Container, Paper, Text, TextInput, Stack, Title, Box, Divider } from "@mantine/core";
import * as z from "zod";
import { IconMusic, IconMail, IconLock, IconUser } from '@tabler/icons-react';

interface Error {
  email?: string[];
  password?: string[];
  passwordConfirm?: string[];
  name?: string[];
}

const SignUpPage = () => {
  const { data: session} = useSession();
  const [resError, setResError] = useState<Error>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationRegistSchema>>({
    mode: "onChange",
    resolver: zodResolver(validationRegistSchema),
  });

  //セッション判定
  if (session) redirect("/");

  //登録処理
  const handleRegist = async (data: z.infer<typeof validationRegistSchema>) => {
    try {
      //フォーム取得
      const email = data.email;
      const password = data.password;
      const res = await fetch("/api/signup", {
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      });

      if (!res.ok) {
        const resError = await res.json();
        setResError(resError.errors);
        return;
      }

      // サインイン処理
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/user/profile/create"
      });

      if (result?.error) {
        console.error("Sign in failed:", result.error);
        return;
      }

      // リダイレクト
      window.location.href = "/user/profile/create";
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Box 
      style={{
        background: '#f8f9fa',
        minHeight: '100vh',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Container size="sm">
        <Paper 
          radius="lg" 
          p="xl" 
          withBorder 
          style={{
            backgroundColor: 'white',
            boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          }}
        >
          <Stack align="center" mb="xl">
            <IconMusic size={48} color="#1a237e" />
            <Title order={1} size="2rem" c="navy">
              新規アカウント登録
            </Title>
            <Text c="gray.6" size="sm">
              音楽の新しい世界への第一歩を踏み出しましょう
            </Text>
          </Stack>

          <form onSubmit={handleSubmit(handleRegist)}>
            <Stack gap="md">
              <TextInput
                label="お名前"
                placeholder="山田 太郎"
                leftSection={<IconUser size={16} />}
                {...register("name")}
                error={errors.name?.message || (resError?.name && resError.name[0])}
              />

              <TextInput
                label="メールアドレス"
                placeholder="your@email.com"
                leftSection={<IconMail size={16} />}
                {...register("email")}
                error={errors.email?.message || (resError?.email && resError.email[0])}
              />

              <TextInput
                type="password"
                label="パスワード"
                placeholder="8文字以上の英数字"
                leftSection={<IconLock size={16} />}
                {...register("password")}
                error={errors.password?.message || (resError?.password && resError.password[0])}
              />

              <TextInput
                type="password"
                label="パスワード（確認）"
                placeholder="パスワードを再入力"
                leftSection={<IconLock size={16} />}
                {...register("passwordConfirm")}
                error={errors.passwordConfirm?.message || (resError?.passwordConfirm && resError.passwordConfirm[0])}
              />

              <Button 
                type="submit" 
                size="md" 
                radius="md"
                fullWidth
                bg="navy"
                mt="md"
                style={{
                  transition: 'all 0.3s ease',
                }}
                className="hover:transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                アカウントを作成
              </Button>
            </Stack>
          </form>

          <Divider label="または" labelPosition="center" my="lg" c="gray.5" />

          <Text ta="center" mt="md">
            すでにアカウントをお持ちの方は
            <Link href="/signin" style={{ color: '#1a237e', marginLeft: '0.5rem' }}>
              ログイン
            </Link>
            へ
          </Text>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUpPage;
