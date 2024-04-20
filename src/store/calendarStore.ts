import { create } from 'zustand';

interface CalendarState {
  selectedDates: Date[];
  setSelectedDates: (selectedDates: Date[]) => void;
}

export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDates: [],
  setSelectedDates: (selectedDates) => set({ selectedDates })
}));
