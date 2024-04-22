'use client';
import styles from './ListMessage.module.css';
import { IMessage, useMessageStore } from '@/store/messageStore';
import { Message } from './Message';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export const ListMessage = ({ roomId }: { roomId: string }) => {
  const supabase = createClient();
  const queryClient = useQueryClient();
  const { messages, addMessage } = useMessageStore((state) => state);

  useEffect(() => {
    const channel = supabase
      .channel('chatMessage')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'message', filter: `room_id=eq.${roomId}` },
        (payload) => {
          const newMessage = payload.new as IMessage;
          addMessage(newMessage);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  return (
    <section className={styles.container}>
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </section>
  );
};
