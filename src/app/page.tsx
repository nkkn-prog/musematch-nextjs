'use client'
import { Box, Button, Container, Flex, Text, Title } from '@mantine/core';
import { IconMusic, IconUsers, IconStar, IconHeart } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  return (
    <Box>
      {/* ヒーローセクション */}
      <Box 
        pos="relative" 
        h="90vh"
      >
        {/* 背景動画 */}
        <Box
          pos="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{ overflow: 'hidden', zIndex: -1 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <Box
            pos="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1
            }}
          />
        </Box>

        <Container size="lg">
          <Flex 
            direction="column" 
            justify="center" 
            align="center" 
            h="90vh"
            style={{ 
              color: 'white',
              position: 'relative',
              zIndex: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}
          >
            <Title order={1} size="3.5rem" ta="center" mb="xl">
              あなたの音楽の夢を叶える
              <br />
              最高の先生と出会おう
            </Title>
            <Text size="xl" mb="xl" ta="center">
              MuseMatchは、音楽を学びたい人と教えたい人をつなぐ
              <br />
              マッチングプラットフォームです
            </Text>
            <Link href="/signin">
              <Button 
                size="xl" 
                radius="xl"
                bg="navy"
                c="white"
                px="xl"
                style={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: '#1a237e'
                  }
                }}
              >
                はじめる
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      {/* 特徴セクション */}
      <Box py="6rem" bg="white">
        <Container size="lg">
          <Title order={2} ta="center" mb="4rem" c="navy">
            MuseMatchの特徴
          </Title>
          <Flex gap="xl" justify="center" wrap="wrap">
            <Box w={270}>
              <Flex direction="column" align="center" gap="md">
                <IconMusic size={48} color="navy" />
                <Text fz="xl" fw={700} c="navy">豊富な楽器</Text>
                <Text ta="center" c="gray.7">
                  ピアノからDJまで、様々な楽器やジャンルの先生が見つかります
                </Text>
              </Flex>
            </Box>
            <Box w={270}>
              <Flex direction="column" align="center" gap="md">
                <IconUsers size={48} color="navy" />
                <Text fz="xl" fw={700} c="navy">優秀な講師陣</Text>
                <Text ta="center" c="gray.7">
                  経験豊富なプロの講師があなたの上達をサポートします
                </Text>
              </Flex>
            </Box>
            <Box w={270}>
              <Flex direction="column" align="center" gap="md">
                <IconStar size={48} color="navy" />
                <Text fz="xl" fw={700} c="navy">柔軟なレッスン</Text>
                <Text ta="center" c="gray.7">
                  オンライン・対面など、ニーズに合わせた形式で学べます
                </Text>
              </Flex>
            </Box>
            <Box w={270}>
              <Flex direction="column" align="center" gap="md">
                <IconHeart size={48} color="navy" />
                <Text fz="xl" fw={700} c="navy">安心の体制</Text>
                <Text ta="center" c="gray.7">
                  メッセージ機能で事前に講師と相談できます
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* CTAセクション */}
      <Box py="6rem" bg="gray.1">
        <Container size="lg">
          <Flex direction="column" align="center" gap="xl">
            <Title order={2} ta="center" c="navy">
              さあ、音楽の旅を始めましょう
            </Title>
            <Text size="lg" ta="center" c="gray.7" mb="xl">
              あなたにぴったりの先生が待っています
            </Text>
            <Link href="/signin">
              <Button 
                size="xl" 
                radius="xl"
                bg="navy"
                c="white"
                px="xl"
              >
                無料で始める
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}