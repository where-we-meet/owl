import { Suspense, useEffect, useState } from 'react';
import { ListMessage } from './ListMessage';
import { InitMessages } from './InitMessages';
import { getMessageData } from '@/api/supabaseCSR/supabase';
import { IMessage } from '@/store/messageStore';

export const ChatMessage = ({ roomId }: { roomId: string }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const messages = async () => {
      const messageData = await getMessageData(roomId);
      setMessages(messageData);
    };
    messages();
  }, []);

  return (
    <Suspense fallback={'loading..'}>
      <ListMessage roomId={roomId} />
      <InitMessages messages={messages || []} />
    </Suspense>
  );
};
