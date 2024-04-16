import Link from 'next/link';
import SettingMap from '@/components/room/meeting/place/SettingMap';
import SearchBar from '@/components/room/meeting/place/search/SearchBar';
import { Button } from '@nextui-org/react';
import styles from './page.module.css';

const PickPlacePage = () => {
  return (
    <>
      <SearchBar />
      <SettingMap />
      <div className={styles.footer}>
        <Button as={Link} href={`/start/pick-calendar`}>
          이전
        </Button>
        <Button as={Link} href={`/start/confirm`}>
          다음
        </Button>
      </div>
    </>
  );
};

export default PickPlacePage;
