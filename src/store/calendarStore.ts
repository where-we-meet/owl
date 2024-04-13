import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CalendarState {
  selectedDate: Date[];
  setSelectedDate: (selectedDate: Date[]) => void;
}
export const useCalendarStore = create(
  persist<CalendarState>(
    (set) => ({
      selectedDate: [],
      setSelectedDate: (selectedDate) => set({ selectedDate })
    }),
    {
      name: 'setting-calendar-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
