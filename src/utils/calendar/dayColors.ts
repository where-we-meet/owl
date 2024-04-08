import { format, isSunday, isSaturday, isToday } from 'date-fns';

const dayColors = (nowDate: Date, day: Date) => {
  let color: string;

  switch (true) {
    case format(nowDate, 'M') !== format(day, 'M'):
      color = '#ddd';
      break;
    case isSunday(day):
      color = 'red';
      break;
    case isSaturday(day):
      color = 'blue';
      break;
    case isToday(day):
      color = 'pink';
      break;
    default:
      color = '#000';
  }

  return color;
};

export default dayColors;
