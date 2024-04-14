'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import SettingMap from '@/components/room/meeting/place/SettingMap';
import SearchBar from '@/components/room/meeting/place/search/SearchBar';
import { Button } from '@nextui-org/react';
import styles from './page.module.css';

const PickPlacePage = () => {
  const { id: roomId } = useParams();
  return (
    <>
      <SearchBar />
      <SettingMap />
      <div className={styles.footer}>
        <Button as={Link} href={`/room/${roomId}/pick-calendar`}>
          이전
        </Button>
        <Button as={Link} href={`/room/${roomId}/confirm`}>
          다음
        </Button>
      </div>
    </>
  );
};

export default PickPlacePage;
