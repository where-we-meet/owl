'use client';

import LocationPicker from '@/components/room/meeting/place/LocationPicker';
import SettingMap from '@/components/room/meeting/place/SettingMap';
import SearchBar from '@/components/room/meeting/place/search/SearchBar';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const PickPlace = () => {
  const { id: roomId } = useParams();
  return (
    <>
      <SearchBar />
      <SettingMap />
      <div>
        <Button>
          <Link href={`/room/${roomId}/pick-calendar`}>이전</Link>
        </Button>
        <LocationPicker />
      </div>
    </>
  );
};

export default PickPlace;
