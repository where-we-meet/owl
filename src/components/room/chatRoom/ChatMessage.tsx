import { Suspense, useEffect, useState } from 'react';
import { ListMessage } from './ListMessage';
import { InitMessages } from './InitMessages';
import { getMessageData } from '@/api/supabaseCSR/supabase';
import { useQueryUser } from '@/hooks/useQueryUser';
import { IMessage } from '@/store/messageStore';

export const ChatMessage = ({ roomId }: { roomId: string }) => {
  const user = useQueryUser();
  const [userData, setUserData] = useState<IMessage[]>([]);

  useEffect(() => {
    const messages = async () => {
      const messageData = await getMessageData(user.id);
      setUserData(messageData);
    };
    messages();
  }, []);

  return (
    <Suspense fallback={'loading..'}>
      <ListMessage roomId={roomId} />
      <InitMessages messages={userData || []} />
    </Suspense>
  );
};
