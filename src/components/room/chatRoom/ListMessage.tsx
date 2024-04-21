import styles from './ListMessage.module.css';
import { useMessage } from '@/store/messageStore';
import { Message } from './Message';

export const ListMessage = () => {
  const messages = useMessage((state) => state.messages);

  return (
    <section className={styles.container}>
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </section>
  );
};
