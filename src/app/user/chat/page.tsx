'use client'

import { Container, Paper, Text } from '@mantine/core'
import React from 'react'
import 'react-chat-elements/dist/main.css'

const Page = () => {
  return (
    <Container size='100%' mih='100vh'>
      <Paper withBorder p='1rem' my='5rem' mih='70vh'>
        <Text>チャット一覧</Text>
        
      </Paper>
    </Container>
  )
}

export default Page