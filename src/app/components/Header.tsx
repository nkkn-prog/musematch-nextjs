"use client";

import { Box,Flex,Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { useSession } from 'next-auth/react'
import NavBarProfile from './NavBarProfile';
import NavBarPlan from './NavBarPlan';
import NavBarChat from './NavBarChat';
import NavBarLogined from './NavBarLogined';
import NavBarNotLogined from './NavBarNotLogined';

export const Header = () => {
  const { data: session} = useSession();

  return (
    <Flex w="100%" h="4rem" bg="navy" display='flex' justify='space-between' align='center'>
      <Box ml='1rem'>
        <Text c="white" fz="1.5rem" fw="bold">
          <Link href='/plan'>MuseMatch</Link>
        </Text>
      </Box>
      {session?.user? (
        <Flex>
          <NavBarChat />
          <NavBarPlan />
          <NavBarProfile />
          <NavBarLogined />
        </Flex>
      ) : (
        <NavBarNotLogined />
      )}
    </Flex>
  )
}

export default Header