import type { UserSchedule } from '../EntireOfMonth';
import SchedulesOfMe from './SchedulesOfMe/SchedulesOfMe';
import SchedulesOfUsers from './SchedulesOfUsers/SchedulesOfUsers';

type Props = {
  userSchedules: UserSchedule[];
  selectedDate: Date[];
  day: Date;
  participantNumber: number;
};

export const Schedules: React.FC<Props> = ({ userSchedules, selectedDate, day, participantNumber }) => {
  return (
    <span style={{ zIndex: '0' }}>
      <SchedulesOfMe selectedDate={selectedDate} day={day} />
      <SchedulesOfUsers userSchedules={userSchedules} day={day} participantNumber={participantNumber} />
    </span>
  );
};
