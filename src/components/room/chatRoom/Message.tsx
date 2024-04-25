'use client';
import { IMessage } from '@/store/messageStore';
import { Avatar } from '@nextui-org/react';
import styles from './Message.module.css';

export const Message = ({ message }: { message: IMessage }) => {
  return (
    <div className={styles.chatbox_body} key={message.id}>
      <figure className={styles.profiles}>
        <div className={styles.avatar_container}>
          <Avatar isBordered src={`${message.user_profile}`} showFallback name={message.name!} />
        </div>
        <div className={styles.content}>
          <div className={styles.chat_info}>
            <div className={styles.user_info}>
              <h3 className={styles.name}>{message.name}</h3>
              <h3 className={styles.date_time}>{new Date(message.created_at).toLocaleString('ko-KR')}</h3>
            </div>
          </div>
          <p className={styles.chat_log}>{message.text}</p>
        </div>
      </figure>
    </div>
  );
};
