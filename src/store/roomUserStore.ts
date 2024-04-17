import { RoomUser } from '@/types/roomUser';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type RoomUserData = {
  roomUser: RoomUser | null;
  setRoomUser: (roomUser: RoomUser) => void;
};

export const useRoomUserDataStore = create(
  persist<RoomUserData>(
    (set) => ({
      roomUser: null,
      setRoomUser: (roomUser) => set({ roomUser })
    }),
    {
      name: 'room-userdata-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
