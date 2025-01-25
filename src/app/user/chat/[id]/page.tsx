'use client'
import { sendMessage } from '@/app/utils/chat/api';
import { Box, Button, Container, Flex, Paper, Text, TextInput } from '@mantine/core'
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { Message } from '@/app/types';
import { useSession } from 'next-auth/react';

const ChatRoom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState<string>('');
  const [receiverId, setReceiverId] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const { data: session } = useSession();

  // ユーザーIDの取得
  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
    }
  }, [session]);

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

  const handleSendMessage = async () => {
    const data = {
      chatRoomId: Number(id),
      senderId: userId || '',
      receiverId: receiverId || '', 
      message: inputMessage
    };
    await sendMessage(data);
    setInputMessage('');
    
    // 同期処理のためリロードする。負荷的に差分更新のみ行いたかった。
    // 本当ならwebsocketを使った通信をしたかったが時間的に厳しいので今回はリロードすることにした。
    window.location.reload();
  };

  return (
    <Container size='70%' mih='100vh'>
      <Paper withBorder p='1rem' my='5rem' mih='70vh'>
        <Box h='60vh' style={{overflow: 'auto'}}>
          <Flex direction='column' gap='0.5rem'>
          {
            messages.length > 0 ? (
              messages.map((message: Message) => (
                <Flex key={message.id} justify={message.senderId === userId ? 'flex-end' : 'flex-start'} w='100%'>
                  <Box 
                    p='1rem' 
                    style={{
                      maxWidth: '40%',
                      backgroundColor: message.senderId === userId ? '#E3F2FD' : '#F5F5F5',
                      borderRadius: '8px'
                    }}
                  >
                    <Text>{message.message}</Text>
                  </Box>
                </Flex>
              ))
            ) : (
              <Text>メッセージがありません</Text>
            )
          }
          </Flex>
        </Box>
        <Box>
          <Flex justify='center' mt='1rem'>
            <TextInput placeholder='メッセージを入力' w='50%' onBlur={(e) => setInputMessage(e.target.value)}/>
            <Button onClick={() => handleSendMessage()} bg='navy' c='white' ml='2rem'>送信</Button>
          </Flex>
        </Box>
      </Paper>
    </Container>
  )
}

export default ChatRoom