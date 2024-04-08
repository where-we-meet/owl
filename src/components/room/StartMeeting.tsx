'use client';

import { insertNewRoom, insertRoomUser } from '@/api/room';
import { useSession } from '@/hooks/useSession';
import { useRouter } from 'next/navigation';

const StartMeeting = () => {
  const router = useRouter();
  const { isLoadingUser, currentUser: user } = useSession();

  const startNewRoom = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    const [room] = await insertNewRoom('운좋은 올빼미', user.id);
    await insertRoomUser(room.id, user.id, true);

    router.push(`/room/${room.id}`);
  };

  return (
    <button onClick={startNewRoom} disabled={isLoadingUser}>
      모임 시작하기
    </button>
  );
};

export default StartMeeting;
