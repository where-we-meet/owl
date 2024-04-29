'use client';

import MyRooms from '@/components/room/sidebar/MyRooms';
import UserProfile from '@/components/profile/UserProfileButton';
import ToggleSidebar from '@/components/room/sidebar/ToggleSidebar';
import SettingMap from '@/components/room/place/SettingMap';
import Sidebar from '@/components/room/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getRoomIsConfirmed } from '@/api/room';
import { ChatRoom } from '@/components/room/chatRoom/ChatRoom';
import styles from './page.module.css';

const SettingPage = () => {
  const router = useRouter();
  const { id: roomId }: { id: string } = useParams();
  const [isOpened, setIsOpened] = useState(true);

  const { data: room, isError } = useQuery({
    queryKey: ['is-confirmed-room', roomId],
    queryFn: () => getRoomIsConfirmed(roomId)
  });

  useEffect(() => {
    if (room && room.verified) {
      router.replace(`/room/${roomId}/confirm`);
    }
  }, [room]);

  const toggleSidebar = () => {
    setIsOpened((prev) => !prev);
  };

  if (isError) notFound();

  return (
    <div className={`${styles.wrapper} ${isOpened ? styles.opened : ''}`}>
      <nav className={styles.channel}>
        <div className={styles.profile}>
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
