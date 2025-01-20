'use client'
import { Plan } from '@/app/types';
import { applyPlan, getPlan } from '@/app/utils/plan/api';
import { Box, Button, Container, Paper, Text} from '@mantine/core'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { stripHtml } from '@/app/utils/page'
import { getChatRoomId } from '@/app/utils/chat/api';

const PlanDetail = () => {
  const { id } = useParams();
  const planId = Number(id);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [instructorId, setInstructorId] = useState<string>('');
  const router = useRouter();
  const [isContract, setIsContract] = useState<boolean>(false);

  useEffect(() => {
    // クライアントサイドでユーザーIDを取得
    const fetchUserId = async () => {
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      setUserId(session?.user?.id);
    };
    fetchUserId();
  }, []);

  // プランを取得する
  useEffect(() => {
    const fetchPlan = async () => {
      const data = await getPlan(planId);
      if(data.plan){
        setPlan(data.plan);
        setInstructorId(data.plan.userId);
      }
      if(data.contract){
        setIsContract(true);
      }
    }
    fetchPlan();
  }, [planId]);


  // 講師とチャットするを謳歌した時の処理
  const handleChatClick = async () => {
    const roomSpecifyValue = {
      userId: userId,
      instructorId: instructorId,
      planId: planId,
    }
    const roomData = await getChatRoomId(roomSpecifyValue);
    router.push(`/user/chat/${roomData.id}`);
  };

  const handleApply = () => {
    if(userId === instructorId){
      router.push(`/user/plan/edit/${planId}`);
    } else {

      const applyValue = {
        planId: planId,
        userId: userId,
        instructorId: instructorId,
      }

      applyPlan(applyValue);
      router.push(`/plan`);
    }
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
                onClick={() => handleChatClick()}
              >
                講師とチャットする
              </Button>
            </>
            
          :
          <Button color="navy" w='25%' mt="md" radius="md" onClick={() => handleApply()}>
            {userId === instructorId ? '編集する' : '申し込む'}
          </Button>
          }
        </Box>
      </Paper>

    </Container>
  )
}

export default PlanDetail