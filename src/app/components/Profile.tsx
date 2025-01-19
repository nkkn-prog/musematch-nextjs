'use client'
import { Box, Button, Container, Flex, Group, MultiSelect, Paper, Text, TextInput, rem } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react'
import { Mode, ProfileValues, UploadMode} from '../types'
import RichTextEditorComponent from './tools/RichTextEditor';
import { createProfile, getProfile, updateProfile } from '../utils/profile/api';
import { handleUpload } from '../utils/upload/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Profile = (props: { mode: Mode}) => {
  // 共通部分
  const { mode } = props;
  const defaultImageUrl = '/profile/user.png'

  const [userId, setUserId] = useState<string | null>(null);
  const [profileName, setProfileName] = useState<string>('');
  const [profileInstruments, setProfileInstruments] = useState<string[]>([]);
  const [profileBio, setProfileBio] = useState<string>('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>(defaultImageUrl);

  const router = useRouter()

  const uploadMode: UploadMode = 'profile'
  useEffect(() => {
    
    const fetchProfile = async () => {
      // ユーザーIDを取得
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      setUserId(session?.user?.id);

      // プロフィールを取得
      if (mode === 'edit' && userId) {
        const profile = await getProfile(userId)
        if (profile === null) {
          router.push('/user/profile/create')
        } else {
          setProfileName(profile.data.name)
          setProfileInstruments(profile.data.instruments)
          setProfileBio(profile.data.bio || '')
          setProfileImageUrl(profile.data.imageUrl || defaultImageUrl)
        }
      }
    };
    fetchProfile();
  }, [mode, userId, router]);

  const IMAGE_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

  // タイトル
  const title = mode === 'create' ? 'プロフィール作成' : 'プロフィール編集';
  const buttonTitle = mode === 'create' ? '作成' : '更新';

  // フォームの内容を送信する
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;
    const formData: ProfileValues = {
      userId: userId,
      name: profileName,
      bio: profileBio,
      imageUrl: profileImageUrl,
      instruments: profileInstruments,
    }
    if(mode === 'create'){
      createProfile(formData)
    } else {
      updateProfile(userId, formData)
    }
  }

  // フォーム内必須処理の追加
  return (
    <Container size='sm'>
      <Text fz="1.5rem" fw="bold" ta='center' my='2rem'>{title}</Text>
        <Paper withBorder radius='md' p='md'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box mb='2rem'>
              <Text>プロフィール画像</Text>
              <Box ta='center' my='1rem'>
                <Image
                  src={profileImageUrl}
                  alt='プロフィール画像'
                  width={100}
                  height={100}
                  style={{ borderRadius: '2rem', borderStyle: 'solid', borderWidth: '0.5px', borderColor: 'var(--mantine-color-dimmed)', objectFit: 'cover'}}
                />
              </Box>
              <Dropzone
                maxSize={5* 1024 * 1024} 
                accept={IMAGE_MIME_TYPE} 
                onDrop={async (files) => {
                  try{
                    const uploadedUrl = await handleUpload(files[0], uploadMode);
                    if (uploadedUrl) {
                      setProfileImageUrl(uploadedUrl as string);
                      console.log(uploadedUrl)
                    }
                  } catch(error){
                    console.error(error);
                  }
                }}
                onReject={(files) => console.log('rejected files', files)}
              >
                <Group justify="center" gap="xl" p='1rem' miw={50} mih={50} style={{ pointerEvents: 'none', borderRadius: '5px',borderStyle: 'dashed', borderWidth: '0.5px'}}>
                  <Dropzone.Accept>
                    <IconUpload
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                    stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                    stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                    stroke={1.5}
                    />
                  </Dropzone.Idle>

                  <div>
                    <Text size="md" inline>
                      画像をここにドラッグするか、クリックしてファイルを選択してください
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      画像は5MBまでアップロードできます
                    </Text>
                  </div>
                </Group>
              </Dropzone>
            </Box>
            <Flex direction='column' gap='1rem'>
              <TextInput label='名前' placeholder='名前'  value={profileName} onChange={(e) => setProfileName(e.target.value)}/>
              <MultiSelect
                label="出来る/やりたい楽器"
                placeholder="楽器を選択"
                data={['トランペット','トロンボーン','ホルン']}
                value={profileInstruments}
                onChange={(value) => setProfileInstruments(value)}
              />
              <RichTextEditorComponent 
                label='自己紹介' 
                value={profileBio} 
                onChange={(value) => setProfileBio(value)}
              />
              <Button type='submit' mt='1rem' bg='navy' color='white'>{buttonTitle}</Button>
            </Flex>
          </form>
        </Paper>
    </Container>
  )
}

export default Profile