'use client';
import styles from './ListMessage.module.css';
import { IMessage, useMessageStore } from '@/store/messageStore';
import { Message } from './Message';
import { useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMessageData } from '@/api/supabaseCSR/supabase';

export const ListMessage = ({ roomId }: { roomId: string }) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const { data: messages = [], isPending } = useQuery({
    queryKey: ['message', roomId],
    queryFn: () => getMessageData(roomId)
  });

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const channel = supabase
      .channel('chatMessage')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
        (payload) => {
          queryClient.setQueryData<IMessage[]>(['message', roomId], (oldMessages = []) => {
            return [...oldMessages, payload.new as IMessage];
          });
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
      <div ref={messageEndRef}></div>
    </section>
  );
};
