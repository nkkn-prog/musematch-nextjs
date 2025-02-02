import { Box, Text } from '@mantine/core'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react';

const NavBarChat = () => {
  const { data: session} = useSession();
    return (
    <Box>
      <Text c="white" fz="1rem" fw="bold" mr='1rem'>
        <Link href={`/user/chat/list/${session?.user?.id}`}>チャット一覧</Link>
      </Text>
    </Box>
  )
}

export default NavBarChat