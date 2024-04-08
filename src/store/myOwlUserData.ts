import { create } from 'zustand';

interface Store {
  userData: { userId: string; name: string; profile_url: string; authSNS: Array<string> | null };
  setUserData: (data: { userId: string; name: string; profile_url: string; authSNS: Array<string> | null }) => void;
  setUserName: (newName: string) => void;
  setUserProfileUrl: (newProfile: string) => void;
}

export const useMyOwlUserStore = create<Store>()((set) => ({
  userData: { userId: '', name: '', profile_url: '', authSNS: [''] },
  setUserData: (data) => {
    set({ userData: { userId: data.userId, name: data.name, profile_url: data.profile_url, authSNS: data.authSNS } });
  },
  setUserName: (newName) => set((state) => ({ userData: { ...state.userData, name: newName } })),
  setUserProfileUrl: (newProfile) => set((state) => ({ userData: { ...state.userData, name: newProfile } }))
}));
