'use client';
import styles from './ListMessage.module.css';
import { IMessage, useMessage } from '@/store/messageStore';
import { Message } from './Message';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

export const ListMessage = ({ roomId }: { roomId: string }) => {
  const supabase = createClient();
  const { messages, addMessage } = useMessage((state) => state);

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
