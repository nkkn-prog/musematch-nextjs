'use client'
import { Box, Button, Checkbox, Container, Flex, Group, MultiSelect, NumberInput, Paper, Radio, Text, TextInput, rem } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import RichTextEditorComponent from './tools/RichTextEditor';
import { useForm } from 'react-hook-form';
import { Mode, PlanValuesForCreate, PlanValuesForUpdate } from '../types';
import Link from 'next/link';
import { createPlan, getMyPlan, updatePlan } from '../utils/plan/api';
import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  // planを取得
  useEffect(() => {
    const fetchPlan= async () => {
      if(props.id){
        setPlanId(props.id);
        const data = await getMyPlan(props.id);
        console.log(data);
        setPlanTitle(data.title);
        setPlanInstruments(data.instruments);
        setPlanDescription(data.description);
        setPlanStop(data.cancellation);
        setPlanContract(data.contract);
        setPlanPrice(data.price);
        setPlanTime(data.time);
      } else {
        return alert('プランIDが取得できませんでした');
      }
    };
    fetchPlan();
  }, [props.id]);


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
  const [imagePath, setImagePath] = useState<File | null>(null);
  const IMAGE_MIME_TYPE = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

  // タイトル
  const planHeaderTitle = mode === 'create' ? 'プラン作成' : 'プラン編集';
  const buttonTitle = mode === 'create' ? '作成' : '更新';

  //フォーム
  const form = useForm();

  // TODO: フォームの内容を送信する
  const handleSubmit = async () => {
    
    if (!userId) {
      return alert('ユーザーIDが取得できませんでした');
    }
    
    if(mode === 'create'){
      const planValues: PlanValuesForCreate = {
        userId: userId,
        title: planTitle,
        instruments: planInstruments,
        description: planDescription,
        thumbnailPath: 'test.png',
        contract: planContract,
        price: planPrice,
        time: planTime,
        consultation: planConsultation,
        cancellation: planStop,
      }
      const res = await createPlan(planValues);
      if(res.ok){
        router.push('/plan');
      } else {
        alert('プランの作成に失敗しました');
      }

    } else {
        const planValues: PlanValuesForUpdate = {
          id: planId,
          title: planTitle,
          instruments: planInstruments,
          description: planDescription,
          thumbnailPath: 'test.png',
          contract: planContract,
          price: planPrice,
          time: planTime,
          consultation: planConsultation,
          cancellation: planStop,
        }
        const res = await updatePlan(planValues);
        if(res.ok){
          router.push('/user/plan');
        } else {
          alert('プランの更新に失敗しました');
        }
    }
  }

  // 編集画面の処理

  return (
    <Container size='sm'>
        <Paper withBorder radius='md' p='md' mt='2rem'>
        <Text fz="1.5rem" fw="bold" ta='center' mt='1rem' mb='2rem'>{planHeaderTitle}</Text>
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
              <TextInput label='タイトル' placeholder='タイトル' value={planTitle} onChange={(e) => setPlanTitle(e.target.value)}/>
              {/* TODO: データベースから取得したデータを表示する */}
              <MultiSelect
                label="対象楽器"
                placeholder="楽器を選択"
                data={['トランペット','トロンボーン','ホルン']}
                multiple
                value={planInstruments}
                onChange={(value) => setPlanInstruments(value)}
              />
              <RichTextEditorComponent label='内容' value={planDescription} onChange={setPlanDescription}/>
            </Flex>
            <Box mt='2rem'>
                <Flex direction='column' gap='1rem'>
                  <Box mb='1rem'>
                    <Text mb='0.5rem'>契約方式</Text>
                    <Radio.Group
                      name="contract"
                      description="どちらかを選択してください"
                      withAsterisk
                      defaultValue='once'
                      value={planContract}
                      onChange={(value) => setPlanContract(value)}
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