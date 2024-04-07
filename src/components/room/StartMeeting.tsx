'use client';

import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const StartMeeting = ({ user }: { user: User | null }) => {
  const router = useRouter();

  const startNewRoom = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    const supabase = createClient();
    const { data: room, error } = await supabase
      .from('rooms')
      .insert([{ name: '운좋은 올빼미', created_by: user.id }])
      .select();

    if (error) throw error;

    await supabase.from('userdata_room').insert([{ room_id: room[0].id, user_id: user.id, is_admin: true }]);

    router.push(`/room/${room[0].id}`);
  };

  return <button onClick={startNewRoom}>모임 시작하기</button>;
};

export default StartMeeting;
