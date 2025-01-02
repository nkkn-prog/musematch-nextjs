'use client'
import { Box, Button, Checkbox, Container, Divider, Flex, Group, MultiSelect, NumberInput, Paper, Radio, Text, TextInput, rem } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import Image from 'next/image';
import RichTextEditorComponent from './tools/RichTextEditor';
import { useForm } from 'react-hook-form';
import { Mode } from '../types';
import Link from 'next/link';

const Plan = (props: { mode: Mode }) => {

  // 共通部分
  const { mode } = props;

  // TODO: 画像をアップロードした時にアップロードされた画像URLを取得し、格納する
  const [imagePath, setImagePath] = useState<File | null>(null);
  const IMAGE_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

  // タイトル
  const planTitle = mode === 'create' ? 'プラン作成' : 'プラン編集';
  const courseTitle = mode === 'create' ? 'コース作成' : 'コース編集';  
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
        <Paper withBorder radius='md' p='md' mt='2rem'>
        <Text fz="1.5rem" fw="bold" ta='center' mt='1rem' mb='2rem'>{planTitle}</Text>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* ここからプラン */}
            <Box mb='2rem'>
              <Text>サムネイル画像</Text>
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
              <TextInput label='タイトル' placeholder='タイトル' />
              <MultiSelect
                label="カテゴリ"
                placeholder="カテゴリを選択"
                data={['トランペット','トロンボーン','ホルン']}
                multiple
              />
              <RichTextEditorComponent label='内容'/>
            </Flex>
            {/* ここまでプラン */}
            <Divider my='2rem'/>
            {/* ここからコース */}
            <Box mt='2rem'>
                <Text fz="1.5rem" fw="bold" ta='center' my='2rem'>{courseTitle}</Text>
                <Flex direction='column' gap='1rem'>
                  <Box mb='1rem'>
                    <Text mb='0.5rem'>コース方式</Text>
                    <Radio.Group
                      name="course"
                      description="どちらかを選択してください"
                      withAsterisk
                      defaultValue='once'
                    >
                      <Flex direction='row' gap='1rem'>
                        <Radio label='単発' value='once' my='1rem'/>
                        <Radio label='継続' value='continue' my='1rem'/>
                      </Flex>
                    </Radio.Group>
                  </Box>
                  <Box mb='1rem'>
                    <Text mb='0.5rem'>料金</Text>
                    <Flex direction='row' gap='1rem' mb='1rem'>
                      <NumberInput placeholder='料金' />
                    </Flex>
                    <Text mb='0.5rem'>時間</Text>
                    <Flex direction='row' gap='1rem'>
                      <NumberInput placeholder='最短30〜最大180分' min={30} max={180}/>
                    </Flex>
                  </Box>
                  <Box mb='1rem'>
                    <Text mb='0.5rem'>相談方式</Text>
                    <Radio.Group
                      name="consultation"
                      description="どちらかを選択してください"
                      withAsterisk
                      defaultValue='online'
                    >
                      <Flex direction='row' gap='1rem'>
                        <Radio label='オンライン' value='online' my='1rem'/>
                        <Radio label='対面' value='offline' my='1rem'/>
                      </Flex>
                    </Radio.Group>
                  </Box>
                  <TextInput label='タイトル' placeholder='タイトル'/>
                  <RichTextEditorComponent label='内容'/>
                  <Box my='1rem'>
                    <Checkbox label='コースを中止する'/>
                  </Box>
                </Flex>
                <Flex justify='center' mt='1rem'>
                  <Button mt='1rem' bg='navy' color='white' w='100%' mr='5rem'><Link href='/user/dashboard'>一覧へ戻る</Link></Button>
                  <Button type='submit' mt='1rem' bg='navy' color='white' w='100%'>{buttonTitle}</Button>
                </Flex>
            </Box>
          </form>
        </Paper>
    </Container>
  )
}

export default Plan