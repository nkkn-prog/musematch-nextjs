export type Mode = 'create' | 'edit' | 'view';

export type ProfileValues = {
  userId: string;
  name: string;
  bio: string;
  imageUrl: string;
  instruments: string[];
}