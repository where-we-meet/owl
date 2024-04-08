'use client';

import { insertNewRoom, insertRoomUser } from '@/api/room';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const StartMeeting = ({ user }: { user: User | null }) => {
  const router = useRouter();

  const startNewRoom = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    const room = await insertNewRoom('운좋은 올빼미', user.id);
    await insertRoomUser(room[0].id, user.id, true);

    router.push(`/room/${room[0].id}`);
  };

  return <button onClick={startNewRoom}>모임 시작하기</button>;
};

export default StartMeeting;
