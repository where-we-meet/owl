'use client';

import { createClient } from '@/utils/supabase/client';
import styles from './InputBox.module.css';

export const InputBox = () => {
  const supabase = createClient();
  const handleSendMessage = (text: string) => {
    alert(text);

    supabase.from('message').insert({});
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
