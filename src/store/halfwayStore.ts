import { create } from 'zustand';

type HalfwayData = {
  lat: number | null;
  lng: number | null;
  location: string | null;
  verified: false;

  updateHalfwayData: (payload: { [key: string]: string | number | null }) => void;
};

export const useHalfwayDataStore = create<HalfwayData>((set) => ({
  lat: null,
  lng: null,
  location: null,
  verified: false,

  updateHalfwayData: (payload) => set((state) => ({ ...state, ...payload }))
}));
