import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays } from 'date-fns';

export const calculateOfMonth = (nowDate: Date) => {
  const monthStart = startOfMonth(nowDate);
  const monthEnd = endOfMonth(monthStart);
  const startDay = startOfWeek(monthStart);
  const endDay = endOfWeek(monthEnd);
  const entireOfMonth = [];

  let startWeek = startDay;
  let entireOfWeek = [];

  while (startWeek <= endDay) {
    for (let i = 0; i < 7; i++) {
      entireOfWeek.push(startWeek);
      startWeek = addDays(startWeek, 1);
    }
    entireOfMonth.push(entireOfWeek);
    entireOfWeek = [];
  }
  return entireOfMonth;
};

export default calculateOfMonth;
