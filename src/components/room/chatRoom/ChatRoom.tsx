import Image from 'next/image';
import styles from './ChatRoom.module.css';
import defaultImage from '../../../../public/images/about_owl_image.jpg';

export const ChatRoom = () => {
  return (
    <main>
      <section className={styles.container}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
          return (
            <div className={styles.chatbox_body} key={item.index}>
              <figure className={styles.profiles}>
                <div>
                  <Image src={defaultImage} alt="profileimage" width={30} height={30} />
                </div>
                <div className={styles.content}>
                  <div className={styles.user_info}>
                    <h3 className={styles.name}>이름</h3>
                    <h3 className={styles.date_time}>{new Date().toDateString()}</h3>
                  </div>
                  <p>asdasdasdasdasdasdasdasdasd</p>
                </div>
              </figure>
            </div>
          );
        })}
      </section>
      <div>
        <textarea className={styles.input_box} />
      </div>
    </main>
  );
};
