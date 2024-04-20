import { create } from 'zustand';

type UserProfileData = {
  currentProfileURL: string | null;
  uploadedProfileURL: string;
  setCurrentProfileURL: (profileURL: string | null) => void;
  setUploadedProfileURL: (profileURL: string) => void;
};

export const useRoomUserDataStore = create<UserProfileData>((set) => ({
  currentProfileURL: '',
  uploadedProfileURL: '',
  setCurrentProfileURL: (profileURL: string | null) => set({ currentProfileURL: profileURL }),
  setUploadedProfileURL: (profileURL: string) => set({ uploadedProfileURL: profileURL })
}));
