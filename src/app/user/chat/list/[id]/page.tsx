'use client'
import { Box, Container, Paper, Text, Flex } from '@mantine/core'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getChatlist } from '@/app/utils/chat/api';
import { ChatMessage } from '@/app/types';

const ChatList = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<ChatMessage[]>([]);

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
      const data = await getChatlist(id as string);
      setChatList(data);
    };
    fetchChatList();
  }, [id, userId]);

  

  return (
    <Container>
      <Paper withBorder p='1rem' my='5rem'>
        <Box>
          {chatList.length > 0 ? (
            chatList.map((chat) => (
              <Flex 
                key={chat.chatRoomId} 
                p='1rem' 
                justify='space-between' 
                align='center'
                style={{ borderBottom: '1px solid #eee' }}
              >
                <Text>{chat.message}</Text>
                <Text size='sm' c='dimmed'>
                  {new Date(chat.createdAt).toLocaleString()}
                </Text>
              </Flex>
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