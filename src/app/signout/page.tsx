'use client'

import { Box, Text, Button, Container, Paper } from '@mantine/core'
import React from 'react'
import { signOut } from '../auth';
import { useRouter } from 'next/navigation';

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  }

  return (
    <Container size='100%' mih='20vh'>
      <Paper withBorder p='1rem' my='5rem' mih='20vh'>
        <Box ta='center'>
          <Text fz='1.5rem' fw='bold'>サインアウトしますか？</Text>
          <Box mt='2rem'>
            <Button mr='3rem' onClick={() => router.push('/plan')} bg='navy'>キャンセル</Button>
            <Button onClick={() => handleSignOut()} bg='navy'>サインアウト</Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default SignOut
