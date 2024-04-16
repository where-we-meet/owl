import { RoomUser } from '@/types/roomUser';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type RoomUserData = {
  roomUsers: RoomUser[];
  setRoomUsers: (roomUsers: RoomUser[]) => void;
  addRoomUserData: (payload: RoomUser) => void;
  updateRoomUserData: (payload: RoomUser) => void;
};

export const useRoomUserDataStore = create(
  persist<RoomUserData>(
    (set, get) => ({
      roomUsers: [],
      setRoomUsers: (roomUsers) => set({ roomUsers }),
      addRoomUserData: (payload) =>
        set(() => ({
          roomUsers: [...get().roomUsers, payload]
        })),
      updateRoomUserData: (payload) =>
        set(() => ({
          roomUsers: get().roomUsers.map((user) =>
            user.id === payload.id
              ? { ...user, start_location: payload.start_location, lat: payload.lat, lng: payload.lng }
              : user
          )
        }))
    }),
    {
      name: 'room-userdata-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
