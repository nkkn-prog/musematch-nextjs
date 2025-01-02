'use client'
import { Box, Button, Container, Flex, Group, MultiSelect, Paper, Text, TextInput, rem } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import { Mode } from '../types'
import Image from 'next/image';
import RichTextEditorComponent from './tools/RichTextEditor';
import { useForm } from 'react-hook-form';

const Profile = (props: { mode: Mode }) => {

  // 共通部分
  const { mode } = props;

  // TODO: 画像をアップロードした時にアップロードされた画像URLを取得し、格納する
  const [imagePath, setImagePath] = useState<File | null>(null);
  const IMAGE_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

  // タイトル
  const title = mode === 'create' ? 'プロフィール作成' : 'プロフィール編集';
  const buttonTitle = mode === 'create' ? '作成' : '更新';

  //フォーム
  const form = useForm();

  // TODO: フォームの内容を送信する
  const handleSubmit = () => {
    console.log('submit')
  }

  // 編集画面の処理


  return (
    <Container size='sm'>
      <Text fz="1.5rem" fw="bold" ta='center' my='2rem'>{title}</Text>
        <Paper withBorder radius='md' p='md'>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <Box mb='2rem'>
              <Text>プロフィール画像</Text>
              <Flex direction='column' gap='1rem' justify='center' align='center'>
                <Image
                // TODO: アップロードされた画像のパスを格納する
                  src={imagePath ? `${imagePath}` : '/logo/google-logo.png'}
                  alt='プロフィール画像'
                  width={100}
                  height={100}
                  style={{ borderRadius: '50%', border: '1px solid #ccc', objectFit: 'cover', marginBottom: '2rem'}}
                />
              </Flex>
              <Dropzone
                maxSize={1024 * 5 * 2} 
                accept={IMAGE_MIME_TYPE} 
                onDrop={(files) => console.log('accepted files', files)}
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
              <TextInput label='名前' placeholder='名前' />
              <TextInput label='メールアドレス' placeholder='メールアドレス' />
              <MultiSelect
                label="出来る/やりたい楽器"
                placeholder="楽器を選択"
                data={['トランペット','トロンボーン','ホルン']}
              />
              <RichTextEditorComponent label='自己紹介'/>
              <Button type='submit' mt='1rem' bg='navy' color='white'>{buttonTitle}</Button>
            </Flex>
          </form>
        </Paper>
    </Container>
  )
}

export default Profile