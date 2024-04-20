import { format, isSunday, isSaturday, isToday } from 'date-fns';

const dayColors = (nowDate: Date, day: Date) => {
  let style: string;

  switch (true) {
    case format(nowDate, 'M') !== format(day, 'M'):
      style = 'none';
      break;
    case isSunday(day):
      style = 'sunday';
      break;
    case isSaturday(day):
      style = 'saturday';
      break;
    case isToday(day):
      style = 'today';
      break;
    default:
      style = 'weekday';
  }

  return style;
};

export default dayColors;
