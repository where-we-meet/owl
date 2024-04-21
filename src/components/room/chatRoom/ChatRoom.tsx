import Image from 'next/image';
import styles from './ChatRoom.module.css';
import defaultImage from '../../../../public/images/about_owl_image.jpg';
import { InputBox } from './InputBox';

export const ChatRoom = () => {
  return (
    <main>
      <section className={styles.container}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
          return (
            <div className={styles.chatbox_body} key={item}>
              <figure className={styles.profiles}>
                <div>
                  <Image src={defaultImage} alt="profile_image" width={30} height={30} />
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
      <div>
        <InputBox />
      </div>
    </main>
  );
};
