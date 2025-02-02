"use client"
import { Box, Menu, MenuDropdown, MenuItem, MenuTarget, Text } from '@mantine/core'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { getProfile } from '../utils/profile/api'

const NavBarProfile = () => {
  const { data: session} = useSession();
  const [profile, setProfile] = useState(null);
  // profileを取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.id) {
        const profile = await getProfile(session.user.id)
        setProfile(profile)
      }
    }
    fetchProfile()
  }, [session?.user?.id])

  return (
    <Box>
    <Menu trigger="hover" openDelay={50} closeDelay={100} position='bottom'>
      <MenuTarget>
        <Text c="white" fz="1rem" fw="bold" mr='1rem'>プロフィール設定</Text>
      </MenuTarget>
      <MenuDropdown>
        {profile ? (
          <MenuItem><Link href={`/user/profile/edit/${session?.user?.id}`}>プロフィール編集</Link></MenuItem>
        ) : (
          <MenuItem><Link href='/user/profile/create'>プロフィール作成</Link></MenuItem>
        )}
      </MenuDropdown>
    </Menu>
  </Box>
  )
}

export default NavBarProfile