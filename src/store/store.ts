import { create } from 'zustand';

type State = {
  center: {
    name: string;
    addressName: string;
    lat: number;
    lng: number;
  } | null;
};

type Action = {
  setCenter: (point: State['center']) => void;
};

export const useSearchDataStore = create<State & Action>((set) => ({
  center: null,
  setCenter: (point) => set(() => ({ center: point }))
}));
