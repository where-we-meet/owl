import { create } from 'zustand';

type State = {
  location: {
    lat: number;
    lng: number;
  };
  address?: string;
  addressName?: string;
};

type Action = {
  setLocation: (location: State['location']) => void;
  setAddress: (address: State['address']) => void;
};

export const useSearchDataStore = create<State & Action>((set) => ({
  location: {
    lat: 33.450701,
    lng: 126.570667
  },
  address: '',
  addressName: '',
  setLocation: (location) => set({ location }),
  setAddress: (address) => set({ address })
}));
