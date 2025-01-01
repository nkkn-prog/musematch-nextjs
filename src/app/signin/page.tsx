'use client'
import React from 'react'
import { SignInWithGoogle } from '../components/sign-in'
import { useSearchParams } from 'next/navigation'
import { Container, Divider, Paper, Title } from '@mantine/core'

const SignInPage = () => {
  const searchParams = useSearchParams();
  const oauthErrorMessage = searchParams.get('message');

  return (
    <>
      <Container size="xs" mt="5rem">
        <Title order={2} mb="md" ta="center">ログイン</Title>
          <Paper>
            <Divider my="sm" />
            <SignInWithGoogle errorMessage={oauthErrorMessage}/>  
        </Paper>
      </Container>
    </>
  )
}
export default SignInPage
