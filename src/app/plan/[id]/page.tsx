import { Button, Container, Paper, Text, Title } from '@mantine/core'
import Image from 'next/image'
import React from 'react'

const PlanDetail = () => {
  return (
    <Container>
      <Paper>
        <Title order={2}>プラン詳細</Title>
        <Image src="/saxophone.jpg" height={240} width={240} alt="Saxophone" style={{ objectFit: 'cover' }} />
        {/* TODO:プラン作成で入力した内容を表示する。HTMLを変換する必要があるかも */}
        <Text>テストテストテストテストテストテストテストテストテスト</Text>
      </Paper>
      {/* このユーザーのコースメニューを表示 */}
      <Title order={3}>コースメニュー</Title>

      <Paper>
        <Title order={4}>コースのタイトル</Title>
        <Text>コースの内容</Text>
      </Paper>

      <Paper>
        <Button color="navy" w='25%' mt="md" radius="md">申し込む</Button>
      </Paper>

    </Container>
  )
}

export default PlanDetail