'use client'
import { Box, Container, Flex, Paper, Text} from '@mantine/core'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getChatlist } from '@/app/utils/chat/api';
import { ChatMessage } from '@/app/types';
import Image from 'next/image';

const ChatList = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<ChatMessage[]>([]);

  const router = useRouter();

  // ユーザーIDの取得
  useEffect(() => {
    const fetchUserId = async () => {
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      setUserId(session?.user?.id);
    };
    fetchUserId();
  }, []);

  // チャットリストの取得
  useEffect(() => {
    const fetchChatList = async () => {
      if (!userId) return;
      const response = await getChatlist(id as string);
      console.log(response)
      setChatList(response.data);
    };
    fetchChatList();
  }, [id, userId]);

  console.log("チャットリスト")
  console.log(chatList)


  return (
    <Container>
      <Paper withBorder p='1rem' my='5rem' bg='navy' mih='50vh'>
        <Box>
          <Text fw='bold' ta='center' fz='1.5rem' c='white' mb='2rem'>チャットリスト</Text>
          {chatList.length > 0 ? (
            chatList.map((chat) => (
                <Paper
                  onClick={() => router.push(`/user/chat/${chat.chatRoomId}`)}
                  bd='solid 0.5px' key={chat.chatRoomId} 
                  p='1rem' 
                  style={{
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <Flex justify='space-between' align='center'>
                    <Image
                      src={chat.receiver.imageUrl}
                      height={50}
                      width={50}
                      alt='receiver image'
                      style={{
                        border:'solid 0.25px #000',
                        borderRadius: '20%',
                      }}
                    />
                    <Text fw='bold'>{chat.receiver.name}  さん</Text>
                    <Flex>
                      <Text mr='lg' size='md' c='dimmed'>{chat.message}</Text>
                      <Text size='sm' c='dimmed'>
                        {new Date(chat.createdAt).toLocaleString()}
                      </Text>
                    </Flex>
                    
                  </Flex>
                </Paper>
            ))
          ) : (
            <Text ta='center'>メッセージはありません</Text>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default ChatList 