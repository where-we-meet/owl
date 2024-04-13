import RoomHeader from '@/components/room/header/RoomHeader';
import { ReactNode } from 'react';

const RoomLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <RoomHeader />
      <div>{children}</div>
    </main>
  );
};

export default RoomLayout;
