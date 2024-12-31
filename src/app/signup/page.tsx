'use client'
import React from 'react'
import { SignUpWithGoogle } from '../components/sign-up'
import { useSearchParams } from 'next/navigation'
import { Container, Divider, Paper, Title } from '@mantine/core'

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const oauthErrorMessage = searchParams.get('message');

  return (
    <>
      <Container size="xs" mt="5rem">
        <Title order={2} mb="md" ta="center">新規登録</Title>
        <Paper>
          {/* <SignUpWithEmail /> */}
          <Divider my="sm" />
          <SignUpWithGoogle errorMessage={oauthErrorMessage}/>  
        </Paper>
      </Container>
    </>
  )
}
export default SignUpPage