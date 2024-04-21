import Image from 'next/image';
import defaultImage from '../../../../public/images/about_owl_image.jpg';
import styles from './ListMessage.module.css';
import { useMessage } from '@/store/messageStore';

export const ListMessage = () => {
  const messages = useMessage((state) => state.messages);

  return (
    <section className={styles.container}>
      {messages.map((item) => {
        return (
          <div className={styles.chatbox_body} key={item.id}>
            <figure className={styles.profiles}>
              <div>
                <Image
                  src={defaultImage}
                  alt="profile_image"
                  width={30}
                  height={30}
                  style={{ width: 30, height: 30 }}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.user_info}>
                  <h3 className={styles.name}>이름</h3>
                  <h3 className={styles.date_time}>{new Date().toDateString()}</h3>
                </div>
                <p className={styles.chat_log}>asdasdasdasdasdasdasdasdasd</p>
              </div>
            </figure>
          </div>
        );
      })}
    </section>
  );
};
