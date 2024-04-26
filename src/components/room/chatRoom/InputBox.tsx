'use client';

import { createClient } from '@/utils/supabase/client';
import { useQueryUser } from '@/hooks/useQueryUser';
import { useMessageStore } from '@/store/messageStore';
import { useQueryUsersData } from '@/hooks/useQueryUsersData';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import styles from './InputBox.module.css';

export const InputBox = ({ roomId }: { roomId: string }) => {
  const supabase = createClient();
  const user = useQueryUser();
  const addMessage = useMessageStore((state) => state.addMessage);

  const [inputText, setInputText] = useState('');
  const [canSend, setCanSend] = useState(true);

  const { data: userData } = useQueryUsersData(user.id);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !userData || !canSend) {
      return;
    }

    setCanSend(false);
    setTimeout(() => setCanSend(true), 500);

    const newMessage = {
      id: crypto.randomUUID(),
      text,
      send_by: user.id,
      is_edit: false,
      created_at: new Date().toISOString(),
      room_id: roomId,
      user_profile: userData[0].profile_url,
      name: userData[0].name,
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
      .insert({ name: newMessage.name, text, room_id: roomId, user_profile: newMessage.user_profile });

    if (error) throw error;
    return data;
  };

  const handleChangeInputBoxState = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handlePrintMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing && canSend) {
      handleSendMessage(e.currentTarget.value);
      setInputText('');
    }
  };

  const handleTouchIcon = () => {
    if (inputText && canSend) {
      handleSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className={styles.chatbox}>
      <FiSend
        className={inputText ? styles.iconActive : styles.icon}
        size="1.6rem"
        onClick={handleTouchIcon}
        onTouchEnd={handleTouchIcon}
      />
      <input
        type="text"
        className={styles.input_box}
        value={inputText}
        placeholder="대화는 한 번에 40자까지 적을 수 있어요."
        autoFocus={true}
        maxLength={40}
        onChange={handleChangeInputBoxState}
        onKeyDown={handlePrintMessage}
      />
    </div>
  );
};
