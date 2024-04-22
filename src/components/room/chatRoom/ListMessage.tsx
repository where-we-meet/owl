'use client';
import styles from './ListMessage.module.css';
import { IMessage, useMessageStore } from '@/store/messageStore';
import { Message } from './Message';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMessageData } from '@/api/supabaseCSR/supabase';

export const ListMessage = ({ roomId }: { roomId: string }) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  // const { messages } = useMessageStore((state) => state);

  const { data: messages = [], isPending } = useQuery({
    queryKey: ['message', roomId],
    queryFn: () => getMessageData(roomId)
  });

  useEffect(() => {
    const channel = supabase
      .channel('chatMessage')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
        (payload) => {
          const newMessage = payload.new as IMessage;
          queryClient.invalidateQueries({ queryKey: ['message', roomId] });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  if (isPending) {
    return <>Loading</>;
  }

  return (
    <section className={styles.container}>
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </section>
  );
};
