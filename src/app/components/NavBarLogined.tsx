import { Box, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const NavBarLogined = () => {
  return (
    <Box>
      <Text c="white" fz="1rem" fw="bold" mr='1rem'>
        <Link href='/signout'>ログアウト</Link>
      </Text>
    </Box>
  )
}

export default NavBarLogined