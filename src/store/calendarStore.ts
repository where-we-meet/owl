import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CalendarState {
  selectedDates: Date[];
  setSelectedDates: (selectedDates: Date[]) => void;
}

export const useCalendarStore = create(
  persist<CalendarState>(
    (set) => ({
      selectedDates: [],
      setSelectedDates: (selectedDates) => set({ selectedDates })
    }),
    {
      name: 'setting-calendar-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
