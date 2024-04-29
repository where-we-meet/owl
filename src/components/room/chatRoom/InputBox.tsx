'use client';

import { useQueryUser } from '@/hooks/useQueryUser';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { insertMessage } from '@/api/message';
import { FiSend } from 'react-icons/fi';
import { useQueryProfile } from '@/hooks/useQueryProfile';
import styles from './InputBox.module.css';

export const InputBox = ({ roomId }: { roomId: string }) => {
  const { id: userId } = useQueryUser();

  const [inputText, setInputText] = useState('');
  const [canSend, setCanSend] = useState(true);

  const { data: userData } = useQueryProfile(userId);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !userData || !canSend) {
      return;
    }

    setCanSend(false);
    setTimeout(() => setCanSend(true), 500);

    const newMessage = {
      id: crypto.randomUUID(),
      text,
      send_by: userId,
      is_edit: false,
      created_at: new Date().toISOString(),
      room_id: roomId,
      user_profile: userData.profile_url,
      name: userData.name
    };

    await insertMessage(newMessage);
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
