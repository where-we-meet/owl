import React from 'react';
import { isSameDay } from 'date-fns';
import styles from './Calender.module.css';
import { UserSchedule } from './Calender';

interface Props {
  userSchedules: UserSchedule[];
  day: Date;
}

const SchedulesOfUsers: React.FC<Props> = ({ userSchedules, day }) => {
  return (
    <>
      {userSchedules.map(
        (schedule) =>
          isSameDay(new Date(String(schedule.start_date)), day) && (
            <span key={schedule.id} className={styles.selected_date_circle}></span>
          )
      )}
    </>
  );
};

export default SchedulesOfUsers;
