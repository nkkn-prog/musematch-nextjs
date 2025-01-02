import { Badge, Button, Card, CardSection, Group, Text } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

const CardList = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w='15rem'>
      <CardSection>
        {/* Cardのサイズに合わせて画像のサイズを調整する 240px = 15rem * 16px */}
        <Image
          src="/saxophone.jpg"
          height={120}
          width={240}
          alt="Saxophone"
          style={{ objectFit: 'cover' }}
        />
      </CardSection>

      <Group justify="space-between" mt="xs" mb="xs">
        <Text fw={500}>Saxophone</Text>
        <Badge color="pink">申込可</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        テストテストテストテストテストテストテストテストテスト
      </Text>
      <Button color="navy" fullWidth mt="md" radius="md">プランを見る</Button>
    </Card>
  )
}

export default CardList