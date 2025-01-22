'use client'
import { Box, Container, Paper, Text} from '@mantine/core'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { getChatlist } from '@/app/utils/chat/api';
import { ChatMessage } from '@/app/types';

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
      setChatList(response.data);
    };
    fetchChatList();
  }, [id, userId]);

  console.log("チャットリスト")
  console.log(chatList)


  return (
    <Container>
      <Paper withBorder p='1rem' my='5rem' bg='navy'>
        <Box>
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
                  <Text>{chat.message}</Text>
                  <Text size='sm' c='dimmed'>
                    {new Date(chat.createdAt).toLocaleString()}
                  </Text>
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