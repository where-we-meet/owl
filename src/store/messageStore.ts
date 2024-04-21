import { create } from 'zustand';

export type IMessage = {
  created_at: string;
  id: string;
  is_edit: boolean | null;
  send_by: string;
  text: string | null;
  users: {
    created_at: string;
    id: string;
    name: string;
    profile_url: string | null;
  } | null;
};

type Message = {
  messages: IMessage[];
};

export const useMessage = create<Message>()((set) => ({
  messages: []
}));
