'use client'
import { Box, Button, Checkbox, Container, Flex, Group, MultiSelect, NumberInput, Paper, Radio, Text, TextInput, rem, Switch } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import RichTextEditorComponent from './tools/RichTextEditor';
import { useForm } from 'react-hook-form';
import { Mode, PlanValuesForCreate, PlanValuesForUpdate, UploadMode } from '../types';
import Link from 'next/link';
import { createPlan, getMyPlan, updatePlan } from '../utils/plan/api';
import { useRouter } from 'next/navigation';
import { handleUpload } from '../utils/upload/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationPlanSchema } from '@/validationSchema';
import * as z from 'zod';

type PlanFormValues = z.infer<typeof validationPlanSchema>;

const Plan = (props: { id: number | undefined, mode: Mode }) => {

  // 共通部分
  const { mode } = props;
  const [planId, setPlanId] = useState<number|undefined>();
  const [planTitle, setPlanTitle] = useState<string>('');
  const [planInstruments, setPlanInstruments] = useState<string[]>([]);
  const [planDescription, setPlanDescription] = useState<string>('');
  const [planStop, setPlanStop] = useState<boolean>(false);
  const [planContract, setPlanContract] = useState<string>('once');
  const [planPrice, setPlanPrice] = useState<number>(0);
  const [planTime, setPlanTime] = useState<number>(0);
  const [planConsultation, setPlanConsultation] = useState<string>('online');
  const [userId, setUserId] = useState<string | null>(null);
  const [thumbnailPath, setThumbnailPath] = useState<string>('/default_bg.jpg');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(validationPlanSchema),
    defaultValues: {
      title: '',
      description: '',
      instruments: [],
      thumbnailPath: '/default_bg.jpg',
      contract: '',
      price: 0,
      time: 0,
      consultation: '',
      cancellation: false,
    }
  });

  // planを取得
  useEffect(() => {
    const fetchPlan = async () => {
      if (mode === 'edit' && props.id !== undefined) {
        setPlanId(props.id);
        const data = await getMyPlan(props.id);
        if (data) {
          setValue('title', data.title);
          setValue('description', data.description);
          setValue('instruments', data.instruments);
          setValue('contract', data.contract);
          setValue('price', data.price);
          setValue('time', data.time);
          setValue('consultation', data.consultation);
          setValue('cancellation', data.cancellation);
          setThumbnailPath(data.thumbnailPath || '/default_bg.jpg');
        } else {
          router.push('/user/plan/create');
        }
      } else if (mode === 'create') {
        setValue('title', '');
        setValue('description', '');
        setValue('instruments', []);
        setValue('contract', 'once');
        setValue('price', 0);
        setValue('time', 0);
        setValue('consultation', 'online');
        setValue('cancellation', false);
        setThumbnailPath('/default_bg.jpg');
      } else {
        return alert('プランIDが取得できませんでした');
      }
    };
    fetchPlan();
  }, [mode, props.id, router, setValue]);

  // ユーザーIDを取得
  useEffect(() => {
    // クライアントサイドでユーザーIDを取得
    const fetchUserId = async () => {
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      setUserId(session?.user?.id);
    };
    fetchUserId();
  }, []);

  // TODO: 画像をアップロードした時にアップロードされた画像URLを取得し、格納する
  const uploadMode: UploadMode = 'plan'
  const IMAGE_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

  // タイトル
  const planHeaderTitle = mode === 'create' ? 'プラン作成' : 'プラン編集';
  const buttonTitle = mode === 'create' ? '作成' : '更新';

  // TODO: フォームの内容を送信する
  const onSubmit = async (data: PlanFormValues) => {
    if (!userId) return;

    try {
      if (mode === 'create') {
        const createData: PlanValuesForCreate = {
          userId,
          ...data,
          thumbnailPath,
        };
        await createPlan(createData);
      } else {
        const updateData: PlanValuesForUpdate = {
          id: planId,
          ...data,
          thumbnailPath,
        };
        await updatePlan(updateData);
      }
      router.push('/plan');
    } catch (error) {
      console.error('プランの保存に失敗しました:', error);
    }
  };

  // 編集画面の処理

  return (
    <Container size='sm'>
        <Paper withBorder radius='md' p='md' mt='2rem'>
        <Text fz="1.5rem" fw="bold" ta='center' mt='1rem' mb='2rem'>{planHeaderTitle}</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* ここからプラン */}
            <Box mb='2rem'>
              <Text>サムネイル画像</Text>
              <Flex direction='column' gap='1rem' justify='center' align='center'>
                <Image
                // TODO: アップロードされた画像のパスを格納する
                  src={thumbnailPath}
                  alt='プロフィール画像'
                  width={600}
                  height={200}
                  style={{ border: '1px solid #ccc', objectFit: 'cover', marginBottom: '2rem'}}
                />
              </Flex>
              <Dropzone
                maxSize={5 * 1024 * 1024 } 
                accept={IMAGE_MIME_TYPE} 
                onDrop={async (files) => {
                  try{
                    const uploadedUrl = await handleUpload(files[0], uploadMode);
                    if (uploadedUrl) {
                      setThumbnailPath(uploadedUrl as string);
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
              <TextInput 
                label='タイトル' 
                placeholder='タイトル'  
                {...register('title')}
                error={errors.title?.message}
                required
              />
              <MultiSelect
                label="対象楽器"
                placeholder="楽器を選択"
                data={['トランペット','トロンボーン','ホルン']}
                multiple
                value={planInstruments}
                onChange={(value) => setPlanInstruments(value)}
              />
              <RichTextEditorComponent label='内容' value={planDescription} onChange={setPlanDescription}/>
              <RichTextEditorComponent label='契約内容' value={planContract} onChange={(value) => setPlanContract(value)}/>
            </Flex>
            <Box mt='2rem'>
                <Flex direction='column' gap='1rem'>
                  <Box mb='1rem'>
                    <Text mb='0.5rem'>料金</Text>
                    <Flex direction='row' gap='1rem' mb='1rem'>
                      <NumberInput placeholder='料金' value={planPrice} onChange={(value) => setPlanPrice(Number(value))}/>
                    </Flex>
                    <Text mb='0.5rem'>時間</Text>
                    <Flex direction='row' gap='1rem'>
                      <NumberInput placeholder='最短30〜最大180分' min={30} max={180} value={planTime} onChange={(value) => setPlanTime(Number(value))}/>
                    </Flex>
                  </Box>
                  <Box mb='1rem'>
                    <Text mb='0.5rem'>相談方式</Text>
                    <Radio.Group
                      name="consultation"
                      description="どちらかを選択してください"
                      withAsterisk
                      defaultValue='online'
                      value={planConsultation}
                      onChange={(value) => setPlanConsultation(value)}
                    >
                      <Flex direction='row' gap='1rem'>
                        <Radio label='オンライン' value='online' my='1rem'/>
                        <Radio label='対面' value='offline' my='1rem'/>
                      </Flex>
                    </Radio.Group>
                  </Box>
                  <Box my='1rem'>
                    <Checkbox
                      label='プランを中止する'
                      checked={planStop}
                      onChange={(e) => setPlanStop(e.target.checked)}
                    />
                  </Box>
                </Flex>
                <Flex justify='center' mt='1rem'>
                  <Button mt='1rem' bg='navy' color='white' w='100%' mr='5rem'><Link href='/plan'>一覧へ戻る</Link></Button>
                  <Button type='submit' mt='1rem' bg='navy' color='white' w='100%'>{buttonTitle}</Button>
                </Flex>
            </Box>
          </form>
        </Paper>
    </Container>
  )
}

export default Plan