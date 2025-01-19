import { Box,Flex, Menu, MenuDropdown, MenuItem, MenuTarget, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { getSession } from '../utils/auth'

export const Header = async () => {
  const session = await getSession();

  return (
    <Flex w="100%" h="4rem" bg="navy" display='flex' justify='space-between' align='center'>
      <Box ml='1rem'>
        <Text c="white" fz="1.5rem" fw="bold">
          <Link href='/plan'>MuseMatch</Link>
        </Text>
      </Box>
      {session?.user? (
        <Flex>
          <Box>
            <Menu trigger="hover" openDelay={50} closeDelay={100} position='bottom'>
              <MenuTarget>
                <Text c="white" fz="1rem" fw="bold" mr='1rem'>プラン設定</Text>
              </MenuTarget>
              <MenuDropdown>
                {/*  */}
                <MenuItem><Link href='/user/plan/create'>プラン作成</Link></MenuItem>
                <MenuItem><Link href='/user/plan'>マイプラン一覧</Link></MenuItem>
              </MenuDropdown>
            </Menu>
          </Box>
          <Box>
            <Menu trigger="hover" openDelay={50} closeDelay={100} position='bottom'>
              <MenuTarget>
                <Text c="white" fz="1rem" fw="bold" mr='1rem'>プロフィール設定</Text>
              </MenuTarget>
              <MenuDropdown>
                {/*  */}
                <MenuItem><Link href='/user/profile/create'>プロフィール作成</Link></MenuItem>
                <MenuItem><Link href={`/user/profile/edit/${session.user.id}`}>プロフィール編集</Link></MenuItem>
              </MenuDropdown>
            </Menu>
          </Box>
          <Text c="white" fz="1rem" fw="bold" mr='1rem'>
            <Link href='/signout'>ログアウト</Link>
          </Text>
        </Flex>
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