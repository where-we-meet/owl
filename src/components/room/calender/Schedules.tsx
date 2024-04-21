import type { UserSchedule } from './EntireOfMonth';
import SchedulesOfMe from './SchedulesOfMe';
import SchedulesOfUsers from './SchedulesOfUsers';

type Props = {
  userSchedules: UserSchedule[];
  selectedDate: Date[];
  day: Date;
};

export const Schedules: React.FC<Props> = ({ userSchedules, selectedDate, day }) => {
  return (
    <>
      <SchedulesOfMe selectedDate={selectedDate} day={day} />
      <SchedulesOfUsers userSchedules={userSchedules} day={day} />
    </>
  );
};
