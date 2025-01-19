'use client'
import { sendMessage } from '@/app/utils/chat/api';
import { Box, Button, Container, Flex, Paper, Text, TextInput } from '@mantine/core'
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { Message } from '@/app/types';
const ChatRoom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  // ユーザーIDの取得
  useEffect(() => {
    const fetchUserId = async () => {
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      const currentUserId = session?.user?.id;
      setUserId(currentUserId);
    };
    fetchUserId();
  }, []);

  // ルームデータとメッセージの取得
  useEffect(() => {
    const fetchRoomData = async () => {
      if (!userId) return;

      try {
        // ルームデータの取得
        const resRoomData = await fetch(`/api/user/chat/${id}`);
        const roomData = await resRoomData.json();

        // receiverIdを設定（自分以外のID）
        const receiver = userId === roomData.data.instructorId 
          ? roomData.data.studentId 
          : roomData.data.instructorId;
        setReceiverId(receiver);

        // メッセージの取得
        const resMessage = await fetch(`/api/user/chat/${id}/messages`);
        const messageData = await resMessage.json();
        setMessages(messageData.data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };
    fetchRoomData();
  }, [id, userId]);

  const handleSendMessage = () => {

    const data = {
      chatRoomId: Number(id),
      senderId: userId || '',
      receiverId: receiverId || '', 
      message: 'テストメッセージ'
    };
    sendMessage(data);
  };

  return (
    <Container size='100%' mih='100vh'>
      <Paper withBorder p='1rem' my='5rem' mih='70vh'>
        <Box h='60vh' style={{overflow: 'auto'}}>
          {
            messages.length > 0 ? (
              messages.map((message: Message) => (
                // メッセージの表示
                <Box key={message.id}>
                  {message.senderId === userId ? (
                    <Text ta='right'>{message.message}</Text>
                  ) : (
                    <Text ta='left'>{message.message}</Text>
                  )}
                </Box>
              ))
            ) : (
              <Text>メッセージがありません</Text>
            )
          }
        </Box>
        <Box>
          <Flex justify='center' mt='1rem'>
            <TextInput placeholder='メッセージを入力' w='50%'/>
            <Button onClick={() => handleSendMessage()} bg='navy' c='white' ml='2rem'>送信</Button>
          </Flex>
        </Box>
      </Paper>
    </Container>
  )
}

export default ChatRoom