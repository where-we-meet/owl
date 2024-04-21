'use client';

import { createClient } from '@/utils/supabase/client';
import styles from './InputBox.module.css';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useMessage } from '@/store/messageStore';
import { useQueryUsersData } from '@/hooks/useQueryUsersData';

export const InputBox = () => {
  const supabase = createClient();
  const user = useQueryUser();
  const addMessage = useMessage((state) => state.addMessage);
  const { userData } = useQueryUsersData(user.id);

  console.log('받아오는ㄷ ㅔ이터', userData);
  const handleSendMessage = async (text: string) => {
    if (text.trim()) {
      const newMessage = {
        id: crypto.randomUUID(),
        text,
        send_by: user.id,
        is_edit: false,
        created_at: new Date().toISOString(),
        users: {
          id: userData[0].id,
          profile_url: userData[0].profile_url,
          name: userData[0].name,
          created_at: userData[0].created_at
        }
      };

      addMessage(newMessage);

      const { data, error } = await supabase.from('message').insert({ text });

      if (error) throw error;
      return data;
    } else {
      console.error('빈칸 금지관련 에러를 출력합시다');
    }
  };

  return (
    <>
      <textarea
        placeholder="send message"
        autoFocus={true}
        className={styles.input_box}
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
