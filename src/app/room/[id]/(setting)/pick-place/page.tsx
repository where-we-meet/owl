'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import SettingMap from '@/components/room/meeting/place/SettingMap';
import SearchBar from '@/components/room/meeting/place/search/SearchBar';

import { Button } from '@nextui-org/react';

const PickPlacePage = () => {
  const { id: roomId } = useParams();
  return (
    <>
      <SearchBar />
      <SettingMap />
      <div>
        <Button>
          <Link href={`/room/${roomId}/pick-calendar`}>이전</Link>
        </Button>
        <Button>
          <Link href={`/room/${roomId}/confirm`}>다음</Link>
        </Button>
      </div>
    </>
  );
};

export default PickPlacePage;
