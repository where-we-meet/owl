import { create } from 'zustand';

type userProfileData = {
  currentProfileURL: string | null;
  uploadedProfileURL: string;
  setCurrentProfileURL: (profileURL: string) => void;
  setUploadedProfileURL: (profileURL: string) => void;
};

export const useRoomUserDataStore = create((set) => ({
  currentProfileURL: '',
  uploadedProfileURL: '',
  setCurrentProfileURL: (profileURL: string) => set({ currentProfileURL: profileURL }),
  setUploadedProfileURL: (profileURL: string) => set({ uploadedProfileURL: profileURL })
}));
