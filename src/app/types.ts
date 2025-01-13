export type Mode = 'create' | 'edit' | 'view' | 'myplan' |'general'

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

export type Plan = {
  id: string;
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