import { create } from 'zustand';

interface CalendarState {
  selectedDate: Date[];
  setSelectedDate: (selectedDate: Date[]) => void;
}
export const useCalendarStore = create<CalendarState>((set) => ({
  selectedDate: [],
  setSelectedDate: (selectedDate) => set({ selectedDate })
}));
