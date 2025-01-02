import React from 'react'
import CategorySideBar from '../components/CategorySideBar'
import PlanList from '../components/PlanList'
import { Container, Flex } from '@mantine/core'

const page = () => {
  return (
    <>
      <Container size='100%' mih='100vh'>
        <Flex>
          <CategorySideBar/>
          <PlanList/>
        </Flex>
      </Container>
    </>
  )
}

export default page