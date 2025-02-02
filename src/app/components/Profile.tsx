'use client'
import { Box, Button, Container, Flex, Group, MultiSelect, Paper, Text, TextInput, rem } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import React, { useState, useEffect } from 'react'
import { Mode, ProfileValues } from '../types'
import RichTextEditorComponent from './tools/RichTextEditor'
import { createProfile, getProfile, updateProfile } from '../utils/profile/api'
import { handleUpload } from '../utils/upload/api'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { validationProfileSchema } from '@/validationSchema'
import * as z from 'zod'

type ProfileFormValues = z.infer<typeof validationProfileSchema>;

const Profile = (props: { mode: Mode}) => {
  const { mode } = props;
  const defaultImageUrl = '/profile/user.png'
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string>(defaultImageUrl);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(validationProfileSchema),
    defaultValues: {
      name: '',
      bio: '',
      instruments: [],
      imageUrl: defaultImageUrl,
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      setUserId(session?.user?.id);

      if (mode === 'edit' && userId) {
        const profile = await getProfile(userId)
        if (profile === null) {
          router.push('/user/profile/create')
        } else {
          setValue('name', profile.data.name)
          setValue('instruments', profile.data.instruments)
          setValue('bio', profile.data.bio || '')
          setProfileImageUrl(profile.data.imageUrl || defaultImageUrl)
        }
      }
    };
    fetchProfile();
  }, [mode, userId, router, setValue]);

  const IMAGE_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  const title = mode === 'create' ? 'プロフィール作成' : 'プロフィール編集';
  const buttonTitle = mode === 'create' ? '作成' : '更新';

  const onSubmit = async (data: ProfileFormValues) => {
    if (!userId) return;
    
    const formData: ProfileValues = {
      userId: userId,
      ...data,
      imageUrl: profileImageUrl,
    }

    try {
      if (mode === 'create') {
        await createProfile(formData);
      } else {
        await updateProfile(userId, formData);
      }
      router.push('/plan');
    } catch (error) {
      console.error('プロフィールの保存に失敗しました:', error);
    }
  };

  return (
    <Container size='sm'>
      <Text fz="1.5rem" fw="bold" ta='center' my='2rem'>{title}</Text>
      <Paper withBorder radius='md' p='md'>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                try {
                  const uploadedUrl = await handleUpload(files[0], 'profile');
                  if (uploadedUrl) {
                    setProfileImageUrl(uploadedUrl as string);
                  }
                } catch(error) {
                  console.error(error);
                }
              }}
              onReject={(files) => console.log('rejected files', files)}
            >
              <Group justify="center" gap="xl" p='1rem' miw={50} mih={50} style={{ pointerEvents: 'none', borderRadius: '5px',borderStyle: 'dashed', borderWidth: '0.5px'}}>
                <Dropzone.Accept>
                  <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
                </Dropzone.Idle>
                <div>
                  <Text size="md" inline>画像をここにドラッグするか、クリックしてファイルを選択してください</Text>
                  <Text size="sm" c="dimmed" inline mt={7}>画像は5MBまでアップロードできます</Text>
                </div>
              </Group>
            </Dropzone>
          </Box>
          <Flex direction='column' gap='1rem'>
            <TextInput 
              label='名前' 
              placeholder='名前'  
              {...register('name')}
              error={errors.name?.message}
              required
            />
            <MultiSelect
              label="出来る/やりたい楽器"
              placeholder="楽器を選択"
              data={['トランペット','トロンボーン','ホルン']}
              onChange={(value) => setValue('instruments', value)}
            />
            <RichTextEditorComponent 
              label='自己紹介' 
              value={register('bio', { required: false }).name || ''}
              onChange={(value) => setValue('bio', value)}
            />
            <Button type='submit' mt='1rem' bg='navy' color='white'>{buttonTitle}</Button>
          </Flex>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;