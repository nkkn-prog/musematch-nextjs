'use client'
import { Plan } from '@/app/types';
import { applyPlan, getPlan } from '@/app/utils/plan/api';
import { Box, Button, Container, Paper, Text} from '@mantine/core'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { stripHtml } from '@/app/utils/stripeHtmlHelper'
import { getChatRoomId } from '@/app/utils/chat/api';
import { useSession } from 'next-auth/react';

const PlanDetail = () => {
  const params = useParams();
  const planId = params?.id ? Number(params.id) : 0;
  const [plan, setPlan] = useState<Plan | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [instructorId, setInstructorId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [isContract, setIsContract] = useState<boolean>(false);
  const { data: session, status } = useSession();

  // セッションとユーザーIDの管理
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session, status, router]);

  // プランを取得する
  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) {
        router.push('/plan');
        return;
      }
      try {
        const data = await getPlan(planId);
        if(data.plan){
          setPlan({
            ...data.plan,
            instruments: [],
            time: 0,
            contract: '',
            consultation: '',
            cancellation: false
          });
          setInstructorId(data.plan.userId);
        }
        if(data.contract){
          setIsContract(true);
        }
      } catch (error) {
        console.error('プランの取得に失敗しました:', error);
        router.push('/plan');
      }
    }
    fetchPlan();
  }, [planId, router, userId]);


  // 講師とチャットするを押下した時の処理
  const handleChatClick = async () => {
    if (!session?.user?.id) {
      alert('ログインが必要です');
      router.push('/signin');
      return;
    }

    try {
      const roomSpecifyValue = {
        userId: session.user.id,
        instructorId: instructorId,
        planId: planId,
      }
      const roomData = await getChatRoomId(roomSpecifyValue);
      router.push(`/user/chat/${roomData.id}`);
    } catch (error) {
      console.error('チャットルームの作成に失敗しました:', error);
      alert('チャットルームの作成に失敗しました');
    }
  };

  const handleApply = async () => {
    if (isLoading) return;

    if (!session?.user?.id) {
      alert('ログインが必要です');
      router.push('/signin');
      return;
    }

    setIsLoading(true);

    try {
      if (session.user.id === instructorId) {
        router.push(`/user/plan/edit/${planId}`);
        return;
      }

      const applyValue = {
        planId: planId,
        userId: session.user.id,
        instructorId: instructorId,
      }

      const response = await applyPlan(applyValue);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'プランの申し込みに失敗しました');
      }

      alert('プランの申し込みが完了しました');
      router.push('/plan');
    } catch (error) {
      console.error('申し込み処理でエラーが発生しました:', error);
      alert('申し込みに失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  }

  if (status === 'loading') {
    return <Container><Text>Loading...</Text></Container>;
  }

  return (
    <Container>
      <Paper withBorder p='1rem' my='5rem' >
        <Box ta='center'>
          <Image src={plan?.thumbnailPath ? `${plan.thumbnailPath}` : '/default_bg.jpg'} height={300} width={860} alt="planThumbnail" style={{ objectFit: 'cover'}} />
        </Box>
        <Text w='100%' h='100%' mih='8rem'>{plan?.description ? stripHtml(plan.description) : ''}</Text>
        <Box w='100%' ta='center'>
          {isContract ?
            <>
              <Button color="navy" w='25%' mt="md" radius="md"  mr='2rem' disabled>契約済み</Button>
              <Button 
                color="navy" 
                w='25%' 
                mt="md" 
                radius="md" 
                onClick={handleChatClick}
              >
                講師とチャットする
              </Button>
            </>
            
          :
          <Button 
            color="navy" 
            w='25%' 
            mt="md" 
            radius="md" 
            onClick={handleApply}
            loading={isLoading}
            disabled={isLoading}
          >
            {session?.user?.id === instructorId ? '編集する' : '申し込む'}
          </Button>
          }
        </Box>
      </Paper>
    </Container>
  )
}

export default PlanDetail