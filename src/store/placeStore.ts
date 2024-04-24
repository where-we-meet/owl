import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { SearchOptionData } from '@/types/place.types';

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
  updateSearchRange: (payload: number) => void;
};

type Range = {
  range: number;
  setRange: (payload: number) => void;
};

type GpsStatus = {
  isGpsLoading: boolean;
  errorMessage: string | null;
  setIsGpsLoading: (payload: boolean) => void;
  setErrorMessage: (payload: string) => void;
};

export const useSearchDataStore = create(
  persist<SearchData>(
    (set, get) => ({
      location: {
        lat: 37.50232593365278,
        lng: 127.04444559870342
      },
      address: '',
      addressName: '',
      searchOption: null,
      setLocation: (location) => set({ location }),
      setAddress: (address) => set({ address }),
      setSearchOption: (payload) => set({ searchOption: payload }),
      updateSearchRange: (payload) => set(() => ({ searchOption: { ...get().searchOption, radius: payload } }))
    }),
    {
      name: 'setting-location-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

export const useRangeStore = create<Range>((set) => ({
  range: 200,
  setRange: (payload) => set({ range: payload })
}));

export const useGpsStatusStore = create<GpsStatus>((set) => ({
  isGpsLoading: false,
  errorMessage: null,
  setIsGpsLoading: (payload) => set({ isGpsLoading: payload }),
  setErrorMessage: (payload) => set({ errorMessage: payload })
}));
