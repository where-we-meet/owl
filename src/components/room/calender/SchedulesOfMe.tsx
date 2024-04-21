import React from 'react';
import { isSameDay } from 'date-fns';
import styles from './SchedulesOfMe.module.css';

type Props = {
  selectedDate: Date[];
  day: Date;
};
const SchedulesOfMe: React.FC<Props> = ({ selectedDate, day }) => {
  let isSelectedDay = selectedDate.some((date) => isSameDay(date, day));
  return isSelectedDay ? <span className={styles.selected_date_circle} /> : <></>;
};

export default SchedulesOfMe;
