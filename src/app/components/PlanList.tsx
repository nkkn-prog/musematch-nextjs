import { Container, Paper, Text } from '@mantine/core'
import React from 'react'
import CardList from './CardList'

const PlanList = () => {

  const planTitle = 'ああああ'

  return (
    <Container size='100%' miw='70%'>
      <Paper withBorder p='1rem' my='5rem' mih='70vh'>
        {/* TODO:パスに合わせて表示する文字列を変える */}
        <Text fz='1.2rem' fw='bold' mb='1rem'>{planTitle}</Text>
        <CardList/>
      </Paper>
    </Container>
  )
}

export default PlanList