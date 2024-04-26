import { create } from 'zustand';

type HalfwayData = {
  halfwayPoint: {
    lat: number | null;
    lng: number | null;
  };
  address: string | null;
  verified: false;

  setHalfwayPoint: (payload: HalfwayData['halfwayPoint']) => void;
  setHalfwayAddress: (payload: string | null) => void;
};

export const useHalfwayDataStore = create<HalfwayData>((set) => ({
  halfwayPoint: {
    lat: null,
    lng: null
  },
  address: null,
  verified: false,

  setHalfwayPoint: (payload) => set({ halfwayPoint: payload }),
  setHalfwayAddress: (payload) => set({ address: payload })
}));
