import React from 'react';
import { isSameDay } from 'date-fns';
import styles from './SchedulesOfUsers.module.css';
import type { UserSchedule } from '../../EntireOfMonth';

type Props = {
  userSchedules: UserSchedule[];
  day: Date;
  participantNumber: number;
};

const SchedulesOfUsers: React.FC<Props> = ({ userSchedules, day, participantNumber }) => {
  const opacity = 100 / participantNumber;
  return (
    <>
      {userSchedules.map((schedule, index) => {
        return (
          isSameDay(new Date(String(schedule.start_date)), day) && (
            <span
              key={index}
              className={styles.selected_date_circle_of_users}
              style={{ backgroundColor: `rgba(53, 1, 118, ${opacity / 100})` }}
            ></span>
          )
        );
      })}
    </>
  );
};

export default SchedulesOfUsers;
