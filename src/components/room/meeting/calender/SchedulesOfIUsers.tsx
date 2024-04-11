import React from 'react';
import { isSameDay } from 'date-fns';
import styles from './Calender.module.css';
import { UserSchedule } from './EntireOfMonth';

type Props = {
  userSchedules: UserSchedule[];
  day: Date;
};

const SchedulesOfUsers: React.FC<Props> = ({ userSchedules, day }) => {
  return (
    <>
      {userSchedules.map((schedule, index) => {
        const styleOfCircles: React.CSSProperties = {
          position: 'absolute',
          backgroundColor: `hsl(140, 50, ${0.5 + index * 0.08}%)`
        };

        return (
          isSameDay(new Date(String(schedule.start_date)), day) && (
            <span key={index} className={styles.selected_date_circle} style={{ ...styleOfCircles }}></span>
          )
        );
      })}
    </>
  );
};

export default SchedulesOfUsers;
