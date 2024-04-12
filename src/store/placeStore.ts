import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { SearchOptionData } from '@/types/place.types';
import type { RoomUser } from '@/types/roomUser';

type SearchData = {
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  addressName?: string;
  searchOption: SearchOptionData;
  setLocation: (location: SearchData['location']) => void;
  setAddress: (address: SearchData['address']) => void;
  setSearchOption: (payload: SearchOptionData) => void;
};

type HalfwayData = {
  halfwayData: {
    lat: number | null;
    lng: number | null;
    location: string | null;
    range: number | null;
    verified: false;
  };
  updateHalfwayData: (payload: { [key: string]: string | number | null }) => void;
};

type RoomUserData = {
  roomUsers: RoomUser[];
  setRoomUsers: (roomUsers: RoomUser[]) => void;
  addRoomUserData: (payload: RoomUser) => void;
  updateRoomUserData: (payload: RoomUser) => void;
};

type GpsStatus = {
  isGpsLoading: boolean;
  errorMessage: string | null;
  setIsGpsLoading: (payload: boolean) => void;
  setErrorMessage: (payload: string) => void;
};

export const useSearchDataStore = create(
  persist<SearchData>(
    (set) => ({
      location: {
        lat: 33.450701,
        lng: 126.570667
      },
      address: '',
      addressName: '',
      searchOption: null,
      setLocation: (location) => set({ location }),
      setAddress: (address) => set({ address }),
      setSearchOption: (payload: SearchOptionData) => set({ searchOption: payload })
    }),
    {
      name: 'setting-location-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

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

export const useHalfwayDataStore = create<HalfwayData>((set) => ({
  halfwayData: {
    lat: null,
    lng: null,
    location: null,
    range: null,
    verified: false
  },
  updateHalfwayData: (payload) => set((state) => ({ halfwayData: { ...state.halfwayData, ...payload } }))
}));

export const useGpsStatusStore = create<GpsStatus>((set) => ({
  isGpsLoading: true,
  errorMessage: null,
  setIsGpsLoading: (payload) => set({ isGpsLoading: payload }),
  setErrorMessage: (payload) => set({ errorMessage: payload })
}));
