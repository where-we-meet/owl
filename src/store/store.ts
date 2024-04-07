import type { RoomUser } from '@/types/roomUser';
import { create } from 'zustand';

type Location = {
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  addressName?: string;
  setLocation: (location: Location['location']) => void;
  setAddress: (address: Location['address']) => void;
};

type RoomUserData = {
  roomUsers: RoomUser[];
  setRoomUsers: (roomUsers: RoomUser[]) => void;
  addRoomUserData: (payload: RoomUser) => void;
  updateRoomUserData: (payload: RoomUser) => void;
};

export const useSearchDataStore = create<Location>((set) => ({
  location: {
    lat: 33.450701,
    lng: 126.570667
  },
  address: '',
  addressName: '',
  setLocation: (location) => set({ location }),
  setAddress: (address) => set({ address })
}));

export const useRoomUserDataStore = create<RoomUserData>((set) => ({
  roomUsers: [],
  setRoomUsers: (roomUsers) => set({ roomUsers }),
  addRoomUserData: (payload) =>
    set((state) => ({
      roomUsers: [...state.roomUsers, payload]
    })),
  updateRoomUserData: (payload) =>
    set((state) => ({
      roomUsers: state.roomUsers.map((user) =>
        user.id === payload.id
          ? { ...user, start_location: payload.start_location, lat: payload.lat, lng: payload.lng }
          : user
      )
    }))
}));
