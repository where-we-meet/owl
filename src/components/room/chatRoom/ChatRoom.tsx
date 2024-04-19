import Image from 'next/image';
import styles from './ChatRoom.module.css';
import defaultImage from '../../../../public/images/about_owl_image.jpg';

export const ChatRoom = () => {
  return (
    <main>
      <section className={styles.container}>
        <div className={styles.chatbox_body}>
          <figure className={styles.profiles}>
            <Image src={defaultImage} alt="profileimage" width={30} height={30} />
            <h3 className={styles.name}>이름</h3>
            <h3 className={styles.date_time}>{new Date().toDateString()}</h3>
            <p>asdasdasdasdasdasdasdasdasd</p>
          </figure>
        </div>
      </section>
      <div>
        <textarea className={styles.input_box} />
      </div>
    </main>
  );
};
