import { Flex, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const NavBarNotLogined = () => {
  return (
    <Flex gap='1rem' align='center' mr='1rem'>
      <Text c="white" fz="1rem" fw="bold">
        <Link href='/signup'>新規登録</Link>
      </Text>
      <Text c="white" fz="1rem" fw="bold">
        <Link href='/signin'>ログイン</Link>
      </Text>
    </Flex>
  )
}

export default NavBarNotLogined