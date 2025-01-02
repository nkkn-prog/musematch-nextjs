import { Box,Flex, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { auth } from '../auth'

export const Header = async () => {
  const session = await auth();
  console.log('Headerのセッション')
  console.log(session)

  return (
    <Flex w="100%" h="4rem" bg="navy" display='flex' justify='space-between' align='center'>
      <Box ml='1rem'>
        <Text c="white" fz="1.5rem" fw="bold">
          <Link href='/user/dashboard'>MuseMatch</Link>
        </Text>
      </Box>
      {session?.user? (
        <Text c="white" fz="1rem" fw="bold" mr='1rem'>
          <Link href='/signout'>ログアウト</Link>
         </Text>
      ) : (
        <Flex gap='1rem' align='center' mr='1rem'>
          <Text c="white" fz="1rem" fw="bold">
            <Link href='/signup'>新規登録</Link>
          </Text>
          <Text c="white" fz="1rem" fw="bold">
            <Link href='/signin'>ログイン</Link>
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

export default Header