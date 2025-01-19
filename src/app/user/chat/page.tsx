'use client'

import { Container, Paper } from '@mantine/core'
import React from 'react'
import 'react-chat-elements/dist/main.css'

const Page = () => {
  return (
    <Container size='100%' mih='100vh'>
      <Paper withBorder p='1rem' my='5rem' mih='70vh'>チャット一覧</Paper>
    </Container>
  )
}

export default Page