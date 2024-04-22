'use client';

import SettingMap from '@/components/room/place/SettingMap';
import Sidebar from '@/components/room/sidebar/Sidebar';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRoomIsConfirmed } from '@/api/room';
import styles from './page.module.css';
import ToggleSidebar from '@/components/room/sidebar/ToggleSidebar';

const SettingPage = () => {
  const router = useRouter();
  const { id: userId } = useQueryUser();
  const { id: roomId }: { id: string } = useParams();
  const [isOpened, setIsOpened] = useState(true);

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

  const toggleSidebar = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <div className={`${styles.wrapper} ${isOpened ? styles.opened : ''}`}>
      <aside className={styles.aside}>
        <Sidebar />
        <ToggleSidebar toggleSidebar={toggleSidebar} />
      </aside>

      <section className={styles.map}>
        <SettingMap isOpened={isOpened} />
      </section>
    </div>
  );
};

export default SettingPage;
