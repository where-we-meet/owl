'use client';

import { createClient } from '@/utils/supabase/client';
import styles from './InputBox.module.css';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useMessageStore } from '@/store/messageStore';
import { useQueryUsersData } from '@/hooks/useQueryUsersData';

export const InputBox = ({ roomId }: { roomId: string }) => {
  const supabase = createClient();
  const user = useQueryUser();
  const addMessage = useMessageStore((state) => state.addMessage);

  const { data: userData } = useQueryUsersData(user.id);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() && !userData) {
      return;
    }
    const newMessage = {
      id: crypto.randomUUID(),
      text,
      send_by: user.id,
      is_edit: false,
      created_at: new Date().toISOString(),
      room_id: roomId,
      user_profile: userData[0].profile_url,
      users: {
        id: userData[0].id,
        profile_url: userData[0].profile_url,
        name: userData[0].name,
        created_at: userData[0].created_at
      }
    };
    addMessage(newMessage);

    const { data, error } = await supabase
      .from('message')
      .insert({ text, room_id: roomId, user_profile: newMessage.user_profile });

    if (error) throw error;
    return data;
  };

  return (
    <>
      <textarea
        placeholder="send message"
        autoFocus={true}
        className={styles.input_box}
        maxLength={120}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
    </>
  );
};
