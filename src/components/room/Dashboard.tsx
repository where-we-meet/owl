'use client';

import { useQueryRoomUsers } from '@/hooks/useQueryRoomUsers';
import { useQueryUser } from '@/hooks/useQueryUser';
import ResultSchedule from './calender/ResultSchedule';
import ResultPlace from './place/ResultPlace';
import ConfirmedButton from './ConfirmedButton';
import { Button, Link } from '@nextui-org/react';
import styles from './Dashboard.module.css';

const Dashboard = ({ roomId }: { roomId: string }) => {
  const { id: userId } = useQueryUser();
  const { roomUsers, isPending } = useQueryRoomUsers(roomId, userId);

  const isExistUser = roomUsers.some((user) => user.user_id === userId);

  if (isPending) return <>로딩중</>;

  if (!isExistUser)
    return (
      <Button as={Link} href={`/room/${roomId}/pick-calendar`}>
        모임에 참가하기
      </Button>
    );
  else {
    return (
      <>
        <ResultSchedule />
        <ResultPlace />
        <div className={styles.footer}>
          <ConfirmedButton />
        </div>
      </>
    );
  }
};

export default Dashboard;
