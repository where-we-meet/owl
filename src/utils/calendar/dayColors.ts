import { format, isSunday, isSaturday, isSameDay } from 'date-fns';

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
    case isSameDay(nowDate, day):
      style = 'today';
      break;
    default:
      style = 'weekday';
  }

  return style;
};

export default dayColors;
