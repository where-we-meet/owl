'use client';

import { useQueryRoomUsers } from '@/hooks/useQueryRoomUsers';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useRouter } from 'next/navigation';
import ResultSchedule from './meeting/calender/ResultSchedule';
import ResultPlace from './meeting/ResultPlace';
import ConfirmedButton from './ConfirmedButton';
import styles from './Dashboard.module.css';
import { Button, Link } from '@nextui-org/react';

const Dashboard = ({ roomId }: { roomId: string }) => {
  const router = useRouter();
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
