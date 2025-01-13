import CardList from '@/app/components/CardList'
import { Container, Paper } from '@mantine/core'
import React from 'react'

const page = () => {
  return (
    <Container size='100%' mih='100vh'>
      <Paper withBorder p='2rem' m='2rem'>
        <CardList mode='myplan' />
      </Paper>
    </Container>
  )
}

export default page