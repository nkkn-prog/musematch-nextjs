export const getChatRoomId = async (roomSpecifyValue: {
  userId: string;
  instructorId: string;
  planId: number;
}) => {
  const res = await fetch(`/api/user/chat`, {
    method: 'POST',
    body: JSON.stringify(roomSpecifyValue),
  });
  return res.json()
};

export const sendMessage = async (data: {
  chatRoomId: number;
  senderId: string;
  receiverId: string;
  message: string;
}) => {
  const res = await fetch(`/api/user/chat/${data.chatRoomId}/messages`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.json()
};

export const getChatlist = async (id: string) => {
  const response = await fetch(`/api/user/chat/list/${id}`);
  const data = await response.json();
  return data;
}; 