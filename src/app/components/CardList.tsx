'use client'
import { Button, Card, CardSection, Flex, Text, Box} from '@mantine/core'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getAllPlans } from '../utils/plan/api'
import { Mode, Plan } from '../types'
import { useRouter } from 'next/navigation'
import { stripHtml } from '../utils/page'
const CardList = (props: { mode: Mode }) => {
  
  const { mode } = props;
  const [userId, setUserId] = useState<string>('');
  const [myPlans, setMyPlans] = useState<Plan[]>([]);
  const [othersPlans, setOthersPlans] = useState<Plan[]>([]);
  const router = useRouter();

  useEffect(() => {
    // クライアントサイドでユーザーIDを取得
    const fetchUserId = async () => {
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      setUserId(session?.user?.id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      // プランを取得する
      const plans = await getAllPlans();

      // 取得したプランのうち、ユーザーIDが一致するプランを取得する
      if (mode === 'myplan') {
        // plansのデータをコピーする
        const plansDuplicate = [...plans.data];
        const myPlans = plansDuplicate.filter((plan: Plan) => plan.userId === userId);
        setMyPlans(myPlans);
      } else if (mode === 'general') {
        const plansDuplicate = [...plans.data];
        const othersPlans = plansDuplicate.filter((plan: Plan) => plan.userId !== userId && plan.cancellation === false);
        setOthersPlans(othersPlans);
      }

    }
    fetchPlans()
  }, [mode, userId]);

  const handleMoveToPlan = (id: number, userUuid: string) => {
    // ユーザーIDが一致する場合は編集ページへ移動する
    if(userId === userUuid || mode === 'myplan'){
      router.push(`/user/plan/edit/${id}`);
    }else{
    // ユーザーIDが一致しない場合はプランページへ移動する
    router.push(`/plan/${id}`); 
    }
  }

  return (
    <Flex gap='md' wrap='wrap'>
      {mode !== 'myplan' ? (
        othersPlans.map((plan) => (
            <Card shadow="sm" padding="lg" radius="md" withBorder w='15rem' key={plan.id} h='22rem'>
              <CardSection>
                {/* Cardのサイズに合わせて画像のサイズを調整する 240px = 15rem * 16px */}
                <Image
                  src={plan.thumbnailPath ? `${plan.thumbnailPath}` : '/default_bg.jpg'}
                  height={120}
                  width={240}
                  alt="planThumbnail"
                  style={{ objectFit: 'cover' }}
                />
              </CardSection>

              <Box mt="xs" mb="xs" h='5rem'>
                <Text fw={500} h='3rem' lineClamp={2}>{plan.title}</Text>
              </Box>

              <Text size="sm" c="dimmed" h='3rem' lineClamp={2}>
                {stripHtml(plan.description)}
              </Text>
              {plan.userId !== userId ?(
              <Button
                color="navy"
                fullWidth
                mt="md"
                radius="md"
                h='3rem'
                onClick={() => {handleMoveToPlan(Number(plan.id), plan.userId)}}
              >
                プランを見る</Button>
              ) : (
                <Button
                  color="navy"
                  fullWidth
                  mt="md"
                  radius="md"
                  h='3rem'
                  onClick={() => {handleMoveToPlan(Number(plan.id), plan.userId)}}
                >
                  プランを編集する</Button>
              )}
            </Card>
        ))
      ) : (
        myPlans.map((plan) => (
          <Card shadow="sm" padding="lg" radius="md" withBorder w='15rem' key={plan.id} h='22rem'>
            <CardSection>
              {/* Cardのサイズに合わせて画像のサイズを調整する 240px = 15rem * 16px */}
              <Image
                src={plan.thumbnailPath ? `${plan.thumbnailPath}` : '/default_bg.jpg'}
                height={120}
                width={240}
                alt="planThumbnail"
                style={{ objectFit: 'cover' }}
              />
            </CardSection>

            <Box mt="xs" mb="xs" h='5rem'>
              <Text fw={500} h='3rem' lineClamp={2}>{plan.title}</Text>
            </Box>

            <Text size="sm" c="dimmed" h='3rem' lineClamp={2}>
              {stripHtml(plan.description)}
            </Text>
            <Button
              color="navy"
              fullWidth
              mt="md"
              radius="md"
              h='3rem'
              onClick={() => {handleMoveToPlan(Number(plan.id), plan.userId)}}
            >
              プランを編集する</Button>
          </Card>
        ))
      )}
    </Flex>
  )
}

export default CardList