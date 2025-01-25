export type Mode = 'create' | 'edit' | 'view' | 'myplan' |'general' | 'contract'
export type UploadMode = 'profile' | 'plan'

export type ProfileValues = {
  userId: string;
  name: string;
  bio: string;
  imageUrl: string;
  instruments: string[];
}

export type PlanValuesForCreate = {
  userId: string;
  title: string;
  instruments: string[];
  description: string;
  thumbnailPath?: string;
  contract: string;
  price: number;
  time: number;
  consultation: string;
  cancellation: boolean;
}

export type PlanValuesForUpdate = {
  id: number | undefined;
  title: string;
  instruments: string[];
  description: string;
  thumbnailPath?: string;
  contract: string;
  price: number;
  time: number;
  consultation: string;
  cancellation: boolean;
}

export interface Plan {
  id: number;
  userId: string;
  title: string;
  description: string;
  instruments: string[];
  thumbnailPath?: string;
  price: number;
  time: number;
  contract: string;
  consultation: string;
  cancellation: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Message {
  id: number;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
}

export type ChatMessage = {
  id: number;
  chatRoomId: number;
  message: string;
  sender: {
    id: string;
    name: string;
    imageUrl: string;
    userid: string;
  };
  receiver: {
    id: string;
    name: string;
    imageUrl: string;
    userid: string;
  };
  createdAt: Date;
  updatedAt: Date;
}