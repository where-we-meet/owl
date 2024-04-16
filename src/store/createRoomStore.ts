import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type CreateRoom = {
  startDate: string | null;
  endDate: string | null;

  setDateRange: (payload: { [key: string]: string | null }) => void;
};

export const useCreateRoomStore = create(
  persist<CreateRoom>(
    (set) => ({
      startDate: null,
      endDate: null,
      setDateRange: (payload) => set((state) => ({ ...state, ...payload }))
    }),
    {
      name: 'schedule-range',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
