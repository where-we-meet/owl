import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

export const useCurrentUser = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser })
}));
