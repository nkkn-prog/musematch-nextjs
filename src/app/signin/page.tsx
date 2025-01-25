"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationLoginSchema } from "../../validationSchema";
import { Button, Container, Paper, Text, TextInput, Stack, Title, Box, Divider } from "@mantine/core";
import * as z from "zod";
import { IconMusic, IconMail, IconLock } from '@tabler/icons-react';

interface Error {
  email?: string[];
  password?: string[];
}

const SignInPage = () => {
  const { data: session } = useSession();
  const [resError, setResError] = useState<Error>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof validationLoginSchema>>({
    mode: "onChange",
    resolver: zodResolver(validationLoginSchema),
  });

  //セッション判定
  if (session) redirect("/");

  //ログイン処理
  const handleLogin = async (data: z.infer<typeof validationLoginSchema>) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setResError({
          email: ["メールアドレスまたはパスワードが間違っています"],
        });
        return;
      }

      window.location.href = "/plan";
    } catch (error) {
      console.error("Login error:", error);
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
              ログイン
            </Title>
            <Text c="gray.6" size="sm">
              アカウントにログインして、音楽の世界を探索しましょう
            </Text>
          </Stack>

          <form onSubmit={handleSubmit(handleLogin)}>
            <Stack gap="md">
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
                placeholder="パスワードを入力"
                leftSection={<IconLock size={16} />}
                {...register("password")}
                error={errors.password?.message || (resError?.password && resError.password[0])}
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
                ログイン
              </Button>
            </Stack>
          </form>

          <Divider label="または" labelPosition="center" my="lg" c="gray.5" />

          <Text ta="center" mt="md">
            アカウントをお持ちでない方は
            <Link href="/signup" style={{ color: '#1a237e', marginLeft: '0.5rem' }}>
              新規登録
            </Link>
            へ
          </Text>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignInPage;
