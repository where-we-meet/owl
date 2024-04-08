import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';

type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
};

export const useCurrentUser = create<UserStore>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser })
}));
