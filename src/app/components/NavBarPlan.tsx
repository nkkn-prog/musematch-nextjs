import { Box, Menu, MenuDropdown, MenuItem, MenuTarget, Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const NavBarPlan = () => {
  return (
    <Box>
      <Menu trigger="hover" openDelay={50} closeDelay={100} position='bottom'>
        <MenuTarget>
          <Text c="white" fz="1rem" fw="bold" mr='1rem'>プラン設定</Text>
        </MenuTarget>
        <MenuDropdown>
          <MenuItem><Link href='/user/plan/create'>プラン作成</Link></MenuItem>
          <MenuItem><Link href='/user/plan'>マイプラン一覧</Link></MenuItem>
        </MenuDropdown>
      </Menu>
    </Box>
  )
}

export default NavBarPlan