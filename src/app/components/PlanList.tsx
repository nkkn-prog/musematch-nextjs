import { Container, Paper, Text } from '@mantine/core'
import React from 'react'
import CardList from './CardList'

const PlanList = () => {

  const planTitle = 'プラン一覧'

  return (
    <Container size='100%' miw='70%'>
      <Paper withBorder p='1rem' my='5rem' mih='70vh'>
        <Text fz='1.2rem' fw='bold' mb='1rem'>{planTitle}</Text>
        <CardList mode='general'/>
      </Paper>
    </Container>
  )
}

export default PlanList