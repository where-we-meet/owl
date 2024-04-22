'use client';

import SettingMap from '@/components/room/place/SettingMap';
import Sidebar from '@/components/room/sidebar/Sidebar';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRoomIsConfirmed } from '@/api/room';
import styles from './page.module.css';
import { ChatRoom } from '@/components/room/chatRoom/ChatRoom';

const SettingPage = () => {
  const router = useRouter();
  const { id: userId } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const { data: room } = useQuery({
    queryKey: ['room', 'confirmed', 'createdBy'],
    queryFn: () => getRoomIsConfirmed(roomId),
    select: (data) => data[0]
  });

  useEffect(() => {
    if (room && room.verified && room.created_by !== userId) {
      router.push(`/room/${roomId}/confirm`);
    }
  }, [room?.verified]);

  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <section className={styles.map}>
        <SettingMap />
      </section>
      <ChatRoom roomId={roomId} />
    </div>
  );
};

export default SettingPage;
