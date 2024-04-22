import { isSameDay } from 'date-fns';

export const checkIsSelectedDate = ({ selectedDate, day }: { selectedDate: Date[]; day: Date }) => {
  return selectedDate.some((date) => isSameDay(date, day));
};
