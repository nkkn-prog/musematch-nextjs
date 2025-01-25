"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { Container, Paper, Text, Button, Stack } from "@mantine/core";

const SignOutPage = () => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          signOut({ callbackUrl: "/signin" });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container size="md" mt="5rem">
      <Paper bg="white" p="md">
        <Stack align="center" gap="md">
          <Text fz="1.5rem" fw="bold">ログアウト中...</Text>
          <Text>{count}秒後に自動的にログアウトします</Text>
          <Button
            onClick={() => signOut({ callbackUrl: "/signin" })}
            color="gray"
          >
            今すぐログアウト
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default SignOutPage;
