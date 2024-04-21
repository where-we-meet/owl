'use client';

import { createClient } from '@/utils/supabase/client';
import styles from './InputBox.module.css';

export const InputBox = () => {
  const supabase = createClient();
  const handleSendMessage = async (text: string) => {
    alert(text);

    const { data, error } = await supabase.from('message').insert({ text });

    if (error) throw error;
    return data;
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
