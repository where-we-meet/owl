'use client';

import MyRooms from '@/components/room/sidebar/MyRooms';
import UserProfile from '@/components/header/profile/UserProfileButton';
import ToggleSidebar from '@/components/room/sidebar/ToggleSidebar';
import SettingMap from '@/components/room/place/SettingMap';
import Sidebar from '@/components/room/sidebar/Sidebar';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRoomIsConfirmed } from '@/api/room';
import { ChatRoom } from '@/components/room/chatRoom/ChatRoom';
import { ExitRoomButton } from '@/components/room/ExitRoomButton';
import styles from './page.module.css';

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
    if (room && room.verified) {
      router.replace(`/room/${roomId}/confirm`);
    }
  }, [room]);

  const toggleSidebar = () => {
    setIsOpened((prev) => !prev);
  };

  return (
    <div className={`${styles.wrapper} ${isOpened ? styles.opened : ''}`}>
      <nav className={styles.channel}>
        <div className={styles.profile}>
          <ExitRoomButton roomId={roomId} />
          <UserProfile />
        </div>
        <MyRooms />
      </nav>
      <aside className={styles.aside}>
        <Sidebar />
        <ToggleSidebar toggleSidebar={toggleSidebar} />
      </aside>
      <section className={styles.map}>
        <SettingMap isOpened={isOpened} />
        <ChatRoom roomId={roomId} />
      </section>
    </div>
  );
};

export default SettingPage;
